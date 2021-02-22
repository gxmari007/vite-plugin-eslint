# vite-plugin-eslint

[![npm](https://img.shields.io/npm/v/vite-plugin-eslint)](https://www.npmjs.com/package/vite-plugin-eslint)
[![GitHub license](https://img.shields.io/github/license/gxmari007/vite-plugin-eslint)](https://github.com/gxmari007/vite-plugin-eslint/blob/master/LICENSE)

A vite ESLint plugin.

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

### `include`

- Type: `string | string[]`
- Default: `[]`

A single file, or array of files, to include when linting.

### `exclude`

- Type: `string | string[]`
- Default: `['node_modules']`

A single file, or array of files, to exclude when linting.

### `formatter`

- Type: `string | ESLint.Formatter`
- Default: `stylish`

Custom error formatter or the name of a built-in formatter.

## License

MIT
