import { Plugin } from 'vite'
import { resolve } from 'path'
import { ESLint } from 'eslint'
import { createFilter } from '@rollup/pluginutils'

import { name } from '../package.json'
import { Options } from './types'
import { parseRequest, pickESLintOptions } from './utils'

export { Options }

export default function eslintPlugin(rawOptions: Options = {}): Plugin {
  let eslint: ESLint
  let filter: ReturnType<typeof createFilter>
  let formatter: ESLint.Formatter['format']
  let options: Options
  // If cache is true, it will save all path.
  const pathCache = new Set<string>()

  return {
    name,
    async configResolved(config) {
      options = Object.assign<Options, Options>(
        {
          include: /\.(jsx?|tsx?|vue|svelte)$/,
          exclude: [/virtual:/, /node_modules/],
          // Use vite cacheDir as default
          cacheLocation: resolve(config.cacheDir, '.eslintcache'),
          formatter: 'stylish',
          emitWarning: true,
          emitError: true,
          failOnWarning: false,
          failOnError: true,
          throwOnWarning: false,
          throwOnError: false,
        },
        rawOptions
      )
      const eslintOptions = pickESLintOptions(options)

      filter = createFilter(options.include, options.exclude)
      eslint = new ESLint(eslintOptions)

      switch (typeof options.formatter) {
        case 'string':
          formatter = (await eslint.loadFormatter(options.formatter)).format
          break
        case 'function':
          formatter = options.formatter
        default:
          break
      }
    },
    async transform(_, id) {
      const filePath = parseRequest(id)

      if (!filter(filePath) || (await eslint.isPathIgnored(filePath))) {
        return null
      }

      if (options.cache) {
        pathCache.add(filePath)
      }

      const report = await eslint.lintFiles(options.cache ? Array.from(pathCache) : filePath)
      const hasWarning = report.some((item) => item.warningCount > 0)
      const hasError = report.some((item) => item.errorCount > 0)
      const result = formatter(report)

      if (options.fix && report) {
        ESLint.outputFixes(report)
      }

      if (hasWarning && (options.emitWarning || options.throwOnWarning)) {
        const warning = typeof result === 'string' ? result : await result

        if (options.failOnWarning) {
          this.error(warning)
        } else {
          this.warn(warning)
        }
      }

      if (hasError && (options.emitError || options.throwOnError)) {
        const error = typeof result === 'string' ? result : await result

        if (options.failOnError) {
          this.error(error)
        } else {
          console.log(error)
        }
      }

      return null
    },
  }
}
