import { Plugin } from 'vite';
import { ESLint } from 'eslint';
import { createFilter } from '@rollup/pluginutils';
import * as path from 'path';

interface Options {
  /** A single file, or array of files, to include when linting. */
  include?: string | string[];
  /** A single file, or array of files, to exclude when linting. */
  exclude?: string | string[];
  /** Custom error formatter or the name of a built-in formatter. */
  formatter?: string | ESLint.Formatter;
}

function normalizePath(id: string) {
  return path.relative(process.cwd(), id).split(path.sep).join('/');
}

export default function eslintPlugin(options: Options = {}): Plugin {
  const eslint = new ESLint({});
  const filter = createFilter(options.include, options.exclude || /node_modules/);
  let formatter: ESLint.Formatter;

  return {
    name: 'vite:eslint',
    async transform(_, id) {
      const file = normalizePath(id);

      if (!filter(id) || (await eslint.isPathIgnored(file)) || file.includes('?')) {
        return null;
      }

      switch (typeof options.formatter) {
        case 'string':
          formatter = await eslint.loadFormatter(options.formatter);
          break;
        case 'function':
          ({ formatter } = options);
          break;
        default:
          formatter = await eslint.loadFormatter('stylish');
      }

      const report = await eslint.lintFiles(file);
      const hasWarnings = report.some((item) => item.warningCount !== 0);
      const hasErrors = report.some((item) => item.errorCount !== 0);
      const result = formatter.format(report);

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
