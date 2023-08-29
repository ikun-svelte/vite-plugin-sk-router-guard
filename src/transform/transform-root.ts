import type { MagicStringBase } from 'magic-string-ast'

const getRootImportContent = (finalHookPath: string) => {
  return `
import { navigate as __skrg_navigate,} from '${finalHookPath}'\n
import { setContext as __skrg_setContext } from 'svelte'\n`
}

const getRootContent = () => {
  return `
if(__skrg_navigate.beforeNavigate){
  __skrg_setContext('__skrg_beforeNavigate', __skrg_navigate.beforeNavigate);
}
if(__skrg_navigate.afterNavigate){
  __skrg_setContext('__skrg_afterNavigate', __skrg_navigate.afterNavigate);
}\n`
}


export const transformRoot = (mgcStr: MagicStringBase, finalHookPath: string) => {
  mgcStr.replaceAll('<script>', `<script>${getRootImportContent(finalHookPath)}${getRootContent()}`)
}
