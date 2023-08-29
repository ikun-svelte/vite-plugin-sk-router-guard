import type { MagicStringBase } from 'magic-string-ast'
import {ParsePageScriptRes} from "../parse/parse-page-script";

const getPageImportContent = () => {
  return `
import {
  beforeNavigate as __skrg_page_beforeNavigate,
  afterNavigate as __skrg_page_afterNavigate
} from '$app/navigation'\n
import { getContext as __skrg_getContext } from 'svelte'\n`
}

const getPageContent = () => {
  return `
const __skrg_beforeNavigate = __skrg_getContext('__skrg_beforeNavigate');
const __skrg_afterNavigate = __skrg_getContext('__skrg_afterNavigate');  
if(__skrg_beforeNavigate){
  __skrg_page_beforeNavigate(__skrg_beforeNavigate);
}
if(__skrg_afterNavigate){
  __skrg_page_afterNavigate(__skrg_afterNavigate);
}\n`
}

export const transformPage = (mgcStr: MagicStringBase, scriptTag: ParsePageScriptRes) => {
  if(!scriptTag || scriptTag.length === 0){
    mgcStr.prependLeft(0, `<script>${getPageImportContent()}${getPageContent()}</script>\n`)
  } else{
    mgcStr.prependRight(scriptTag[0].start, `\n${getPageImportContent()}${getPageContent()}\n`)
  }
}
