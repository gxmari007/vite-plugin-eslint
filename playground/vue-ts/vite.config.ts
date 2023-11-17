import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      // Compatible with the old and new eslint configuration-- Try removing these two properties!
      useFlatConfig: true,
      overrideConfigFile: './eslint.config.mjs',
    }),
  ],
})
