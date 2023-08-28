import { defineConfig } from 'tsup'
import type { Options } from 'tsup'
import * as fs from 'fs'
const config = {
  entry: ['src/index.ts'],
  external: [
      'vite',
  ],
  noExternal: [
      'baiwusanyu-utils',
      'ansi-colors',
      'magic-string'
  ],
  format: ['esm', 'cjs'],
  clean: true,
  minify: false,
  dts: true,
  shims: true,
  onSuccess: () => {
    fs.rename('dist/index.js', 'dist/index.mjs', (err) => {
        if (err) {
            console.error('Error renaming file:', err);
        } else {
            console.log('File renamed successfully.');
        }
    })
  }
}

export default defineConfig(config as Options)
