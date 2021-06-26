# vite-plugin-eslint

[![npm](https://img.shields.io/npm/v/vite-plugin-eslint)](https://www.npmjs.com/package/vite-plugin-eslint)
[![GitHub license](https://img.shields.io/github/license/gxmari007/vite-plugin-eslint)](https://github.com/gxmari007/vite-plugin-eslint/blob/master/LICENSE)

ESLint plugin for vite.

## Install

```
npm install vite-plugin-eslint --save-dev
# or
yarn add vite-plugin-eslint --dev
```

## Usage

```js
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslintPlugin()],
});
```

## Options

### `cache`

- Type: `boolean`
- Default: `true`

Decrease execution time.

### `fix`

- Type: `boolean`
- Default: `false`

Auto fix source code.

### `include`

- Type: `string | string[]`
- Default: `['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue']`

A single file, or array of files, to include when linting.

### `exclude`

- Type: `string | string[]`
- Default: `'node_modules'`

A single file, or array of files, to exclude when linting.

### `formatter`

- Type: `string | ESLint.Formatter`
- Default: `stylish`

Custom error formatter or the name of a built-in formatter.

### `throwOnWarning`

- Type: `boolean`
- Default: `true`

The warings found will be emitted, default to true.

### `throwOnError`

- Type: `boolean`
- Default: `true`

The errors found will be emitted, default to true.

## License

MIT
