import * as path from 'path';
import type { Plugin } from 'vite';
import { ESLint } from 'eslint';
import { createFilter } from '@rollup/pluginutils';

import { checkVueFile, normalizePath, Options } from './utils';

export default function eslintPlugin(options: Options = {}): Plugin {
  const defaultOptions: Options = {
    cache: true,
    fix: false,
    include: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
      'src/**/*.vue',
    ],
    throwOnWarning: true,
    throwOnError: true,
  };
  const opts = { ...defaultOptions, ...options };
  const eslint = new ESLint({
    cacheLocation: path.resolve(
      process.cwd(),
      // maybe vite config cacheDir is better ?
      './node_modules/.vite/vite-plugin-eslint',
    ),
    cache: opts.cache,
    fix: opts.fix,
  });
  const filter = createFilter(opts.include, opts.exclude || /node_modules/);
  let formatter: ESLint.Formatter;

  return {
    name: 'vite:eslint',
    async transform(_, id) {
      const file = normalizePath(id);

      if (
        !filter(id) ||
        (await eslint.isPathIgnored(file)) ||
        checkVueFile(id)
      ) {
        return null;
      }

      switch (typeof opts.formatter) {
        case 'string':
          formatter = await eslint.loadFormatter(opts.formatter);
          break;
        case 'function':
          ({ formatter } = opts);
          break;
        default:
          formatter = await eslint.loadFormatter('stylish');
      }

      const report = await eslint.lintFiles(file);
      const hasWarnings =
        opts.throwOnWarning && report.some((item) => item.warningCount !== 0);
      const hasErrors =
        opts.throwOnError && report.some((item) => item.errorCount !== 0);
      const result = formatter.format(report);

      if (opts.fix && report) {
        ESLint.outputFixes(report);
      }

      if (hasWarnings) {
        this.warn(result);
      }

      if (hasErrors) {
        this.error(result);
      }

      return null;
    },
  };
}
