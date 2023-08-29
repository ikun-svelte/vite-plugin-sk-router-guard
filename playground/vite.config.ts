import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import skRouterGuard from 'vite-plugin-sk-router-guard'
import Inspect from 'vite-plugin-inspect'
export default defineConfig({
  plugins: [
    skRouterGuard(),
    sveltekit(),
    Inspect(),
  ],
})

// encodeURI('http://127.0.0.1:5173/__open-in-editor?file=src%2Froutes%2F%2Bpage.svelte%3A17%3A5')
