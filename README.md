# vite-plugin-sk-router-guard
🪐 A global client routing guard plugin based on svelte-kit

English | [中文](./README.ZH-CN.md)

## Core Strategy
`vite-plugin-sk-router-guard` will be introduced in `root.svelte` according to the specified hook script path, 
and register the context.  
Then get the context in every `+page.svelte` 
and register as [afterNavigate](https://kit.svelte.dev/docs/modules#$app-navigation-afternavigate) or
[beforeNavigate](https://kit.svelte.dev/docs/modules#$app-navigation-beforenavigate).  
In this way, a similar "global route guard hook function" is realized.  

## Install

```bash
npm i vite-plugin-sk-router-guard -D
```
or
```bash
yarn add vite-plugin-sk-router-guard -D
```
or
```bash
pnpm add vite-plugin-sk-router-guard -D
```

## Usage
1. Use the plugin and configure

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import skRouterGuard from 'vite-plugin-sk-router-guard'
export default defineConfig({
   plugins: [
      skRouterGuard(),
      sveltekit(),
   ],
})
```

2. Write a hook script  
   Suppose your project has the following path:    
   ![img.png](public/img.png)  
   Then `vite-plugin-sk-router-guard` will load the script under 
    this path by default as the global routing navigation function

```typescript
// router-guard.skrg.ts
export const navigate = {
  afterNavigate(
    navigation: import('@sveltejs/kit').AfterNavigate
  ){
    navigation.from && console.log('afterNavigate -> from\n',navigation.from.url.href)
    navigation.to && console.log('afterNavigate -> to\n',navigation.to.url.href)
  },
  beforeNavigate(
    navigation: import('@sveltejs/kit').BeforeNavigate
  ) {
    navigation.from && console.log('beforeNavigate -> from \n',navigation.from.url.href)
    navigation.to && console.log('beforeNavigate -> to \n',navigation.to.url.href)
  }
}

```

## Option

```typescript
export interface Options {
  /**
   * The path where the hook script is located
   * @default src/utils/router-guard.skrg.(ts/js)
   */
  hookPath?: string

}
```

## Tips
* `vite-plugin-sk-router-guard` will only inject code into `+page.svelte` and `root.svelte`
* `router-guard.skrg` must export an object named `navigate`
