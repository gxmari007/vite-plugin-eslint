import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: options.entry || ['./src/index.ts'],
  dts: options.dts || true,
  format: options.format || ['esm', 'cjs'],
  watch: options.watch || false,
  clean: true,
  minify: true,
}))
