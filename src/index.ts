import {
  PLUGIN_NAME,
  DEFAULT_CONFIG,
  READ_HOOK_FAIL,
  type SKRouterGuardOptions,
} from './utils'

import type { PluginOption, ServerOptions } from "vite";
import { extend, log, setGlobalPrefix } from "baiwusanyu-utils";
import * as fs from 'fs'
import { normalizePath } from "vite";
import * as path from "path";
import MagicString from "magic-string";
// TODO unit test
export function getHookContent(projectPath: string, hookpath: string |undefined) {
  let finalHookPath = `${projectPath}/${path}`
  const rgTsPath = 'src/utils/router-guard.skrg.ts'
  const rgJsPath = 'src/utils/router-guard.skrg.js'
  if(!hookpath || hookpath === 'utils'){
    finalHookPath = `${projectPath}/${rgTsPath}`
  }

  let content = ''
  // get content （router-guard.ts、 custom path）
  if (fs.existsSync(finalHookPath)) {
    content =  fs.readFileSync(finalHookPath, { encoding: 'utf8'})
  } else  if (fs.existsSync(`${projectPath}/${rgJsPath}`)) {
    // get content （router-guard.js）
    content =  fs.readFileSync(finalHookPath, { encoding: 'utf8'})
  } else {
    log('error', READ_HOOK_FAIL)
  }
  return content
}

function skRouterGuard(options: SKRouterGuardOptions = DEFAULT_CONFIG): PluginOption {
  setGlobalPrefix(`[${PLUGIN_NAME}]: `)
  const projectPath = normalizePath(path.resolve())
  let serverOptions: ServerOptions | undefined
  const finalOptions = extend(DEFAULT_CONFIG, options)
  const { hookPath,  hookContent: hContent} = finalOptions
  const hookContent =  hContent ? hContent : getHookContent(projectPath, hookPath)
  if(!hookContent){
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

      /*const { filename } = parseSvelteRequest(id)
      const isViteEnv = filename.endsWith('vite/dist/client/client.mjs')

      if (isViteEnv) {
        const mgcStr = new MagicString(code)
        // inject load-kit.js into vite client
        mgcStr.append(`\n import('${V_INSPECTOR_PATH}load-kit.js') \n`)

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
      }*/
    },
  }
}

export default skRouterGuard
