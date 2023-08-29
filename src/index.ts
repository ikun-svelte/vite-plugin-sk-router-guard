import {
  PLUGIN_NAME,
  DEFAULT_CONFIG,
  READ_HOOK_FAIL,
  type SKRouterGuardOptions,
  parseSvelteRequest,
} from './utils'

import type { PluginOption } from "vite";
import { extend, log, setGlobalPrefix } from "baiwusanyu-utils";
import * as fs from 'fs'
import { normalizePath } from "vite";
import * as path from "path";
import MagicString from "magic-string";
import { transformRoot } from "./transform/transform-root";
import { transformPage } from "./transform/transform-page";
import { parsePageScript } from "./parse/parse-page-script";

export function getHookPath(projectPath: string, hookPath: string |undefined) {
  let finalHookPath = normalizePath(path.resolve(projectPath, hookPath || ''))
  const rgTsPath = 'src/utils/router-guard.skrg.ts'
  const rgJsPath = 'src/utils/router-guard.skrg.js'
  if(!hookPath || hookPath === 'utils'){
    finalHookPath = `${projectPath}/${rgTsPath}`
  }

  let res = ''
  // get content （router-guard.ts、 custom path）
  if (fs.existsSync(finalHookPath)) {
    res =  finalHookPath
  } else  if (fs.existsSync(`${projectPath}/${rgJsPath}`)) {
    // get content （router-guard.js）
    res =  finalHookPath
  } else {
    log('error', READ_HOOK_FAIL)
  }
  return res
}

function skRouterGuard(options: SKRouterGuardOptions = DEFAULT_CONFIG): PluginOption {
  setGlobalPrefix(`[${PLUGIN_NAME}]: `)
  const projectPath = normalizePath(path.resolve())
  const finalOptions = extend(DEFAULT_CONFIG, options)
  const { hookPath,  } = finalOptions
  const finalHookPath =  getHookPath(projectPath, hookPath)
  if(!finalHookPath){
    log('error', READ_HOOK_FAIL)
    return
  }
  return {
    name: PLUGIN_NAME,
    enforce: 'pre',
    async transform(code: string, id: string, options) {
      if (options?.ssr) {
        return;
      }

      const { filePath, query } = parseSvelteRequest(id)
      if(filePath.includes('root.svelte') && query.type !== 'style'){
        const mgcStr = new MagicString(code)
        transformRoot(mgcStr, finalHookPath)
        return {
          code: mgcStr.toString(),
          get map() {
            return mgcStr.generateMap({
              source: id,
              includeContent: true,
              hires: true,
            })
          },
        }
      }
      if(filePath.includes('+page.svelte') && query.type !== 'style'){
        const mgcStr = new MagicString(code)
        const scriptTag = parsePageScript(code)
        transformPage(mgcStr, scriptTag)
        return {
          code: mgcStr.toString(),
          get map() {
            return mgcStr.generateMap({
              source: id,
              includeContent: true,
              hires: true,
            })
          },
        }
      }
    },
  }
}

export default skRouterGuard
