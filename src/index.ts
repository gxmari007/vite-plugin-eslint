import { Plugin } from 'vite'
import { resolve } from 'path'
import { ESLint } from 'eslint'
import { createFilter } from '@rollup/pluginutils'

import { name } from '../package.json'
import { Options } from './types'
import { checkModule, parseRequest, pickESLintOptions, to } from './utils'

export { Options }

export default function eslintPlugin(rawOptions: Options = {}): Plugin {
  let eslint: ESLint
  let filter: ReturnType<typeof createFilter>
  let formatter: ESLint.Formatter['format']
  let options: Options

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
      // eslint = new ESLint(eslintOptions)

      // switch (typeof options.formatter) {
      //   case 'string':
      //     formatter = (await eslint.loadFormatter(options.formatter)).format
      //     break
      //   case 'function':
      //     formatter = options.formatter
      //   default:
      //     break
      // }
    },
    async buildStart() {
      const [error, module] = await to(import(options.eslintPath ?? 'eslint'))

      if (error) {
        this.error('Failed to import ESLint, do you install or configure eslintPath?')
      }
    },
    async transform(_, id) {
      const filePath = parseRequest(id)

      if (!filter(filePath) || (await eslint.isPathIgnored(filePath))) {
        return null
      }

      const [error] = await to(
        checkModule(this, eslint, filePath, options, formatter, ESLint.outputFixes)
      )

      if (error) {
        this.error(error.message)
      }

      return null
    },
  }
}
