import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from '@gxmari007/vite-plugin-eslint';

export default defineConfig({
  plugins: [vue(), eslint()],
});
