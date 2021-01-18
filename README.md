# @gxmari007/vite-plugin-eslint

A vite ESLint plugin.

## Install

```
npm install @gxmari007/vite-plugin-eslint --save-dev
# or
yarn add @gxmari007/vite-plugin-eslint --dev
```

## Usage

```js
import { defineConfig } from 'vite';
import eslintPlugin from '@gxmari007/vite-plugin-eslint';

export default defineConfig({
  plugins: [
    eslintPlugin(),
  ],
});
```

## Options

| Prop | Description |
| ------  | ------ |
| include | A single file, or array of files, to include when linting |
| exclude | A single file, or array of files, to exclude when linting |
| formatter | Custom error formatter or the name of a built-in formatter |

## License

MIT
