import { Plugin } from 'vite'
import { resolve } from 'path'
import { ESLint } from 'eslint'
import { createFilter } from '@rollup/pluginutils'

import { name } from '../package.json'
import { Options } from './types'
import { parseRequest } from './utils'

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
          exclude: /node_modules/,
          // Use vite cacheDir as default
          cacheLocation: resolve(config.cacheDir, '.eslintcache'),
          formatter: 'stylish',
          throwOnWarning: true,
          throwOnError: true,
        },
        rawOptions
      )
      const {
        include,
        exclude,
        formatter: userFormatter,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        throwOnError,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        throwOnWarning,
        ...eslintOptions
      } = options

      filter = createFilter(include, exclude)
      eslint = new ESLint(eslintOptions)

      switch (typeof userFormatter) {
        case 'string':
          formatter = (await eslint.loadFormatter(userFormatter)).format
          break
        case 'function':
          formatter = userFormatter
        default:
          break
      }
    },
    async transform(_, id) {
      const filePath = parseRequest(id)

      if (!filter(filePath) || (await eslint.isPathIgnored(filePath))) {
        return null
      }
      console.log(filePath)

      if (options.cache && !pathCache.has(filePath)) {
        pathCache.add(filePath)
      }

      const report = await eslint.lintFiles(options.cache ? Array.from(pathCache) : filePath)
      const hasWarnings = options.throwOnWarning && report.some((item) => item.warningCount > 0)
      const hasErrors = options.throwOnError && report.some((item) => item.errorCount > 0)
      const result = formatter(report)

      if (options.fix && report) {
        ESLint.outputFixes(report)
      }

      if (hasWarnings) {
        this.warn(typeof result === 'string' ? result : await result)
      }

      if (hasErrors) {
        this.error(typeof result === 'string' ? result : await result)
      }

      return null
    },
  }
}
