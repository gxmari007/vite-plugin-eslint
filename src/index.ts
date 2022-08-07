import { Plugin } from 'vite'
import { resolve } from 'path'
import { createFilter } from '@rollup/pluginutils'

import type { Options, OutputFixes, ESLint } from './types'
import { name } from '../package.json'
import { checkModule, isVirtualModule, parseRequest, pickESLintOptions, to } from './utils'

export { Options }

export default function eslintPlugin(rawOptions: Options = {}): Plugin {
  let eslint: ESLint
  let filter: ReturnType<typeof createFilter>
  let formatter: ESLint.Formatter['format']
  let options: Options
  let outputFixes: OutputFixes

  return {
    name,
    async configResolved(config) {
      options = Object.assign<Options, Options>(
        {
          lintOnStart: false,
          // include: /\.(jsx?|tsx?|vue|svelte)$/,
          include: [
            './**/*.js',
            './**/*.jsx',
            './**/*.ts',
            './**/*.tsx',
            './**/*.vue',
            './**/*.svelte',
          ],
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
    },
    async buildStart() {
      const [error, module] = await to(import(options.eslintPath ?? 'eslint'))

      if (error) {
        this.error('Failed to import ESLint, do you install or configure eslintPath?')
      } else {
        const eslintOptions = pickESLintOptions(options)

        eslint = new module.ESLint(eslintOptions)
        outputFixes = module.ESLint.outputFixes
        filter = createFilter(options.include, options.exclude)

        switch (typeof options.formatter) {
          case 'string':
            formatter = (await eslint.loadFormatter(options.formatter)).format
            break
          case 'function':
            formatter = options.formatter
          default:
            break
        }

        if (options.lintOnStart && options.include) {
          const [error] = await to(
            checkModule(this, eslint, options.include, options, formatter, outputFixes)
          )

          if (error) {
            this.error(error.message)
          }
        }
      }
    },
    async transform(_, id) {
      const filePath = parseRequest(id)

      if (
        !filter(filePath) ||
        (await eslint.isPathIgnored(filePath)) ||
        isVirtualModule(filePath)
      ) {
        return null
      }

      const [error] = await to(checkModule(this, eslint, filePath, options, formatter, outputFixes))

      if (error) {
        this.error(error.message)
      }

      return null
    },
  }
}
