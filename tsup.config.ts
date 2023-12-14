import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: options.entry || ['./src/index.ts'],
  dts: options.dts || true,
  format: options.format || ['esm', 'cjs'],
  target: 'es2015',
  platform: 'node',
  clean: true,
  minify: true,
}))
