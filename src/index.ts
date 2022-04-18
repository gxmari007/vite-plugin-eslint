import { normalizePath, Plugin } from 'vite'
import { resolve } from 'path'
import { ESLint } from 'eslint'
import { createFilter } from '@rollup/pluginutils'

import { name } from '../package.json'
import { Options } from './types'

export { Options }

export default function eslintPlugin(options: Options = {}): Plugin {
  let eslint: ESLint
  let filter: ReturnType<typeof createFilter>

  return {
    name,
    configResolved(config) {
      const userOptions = Object.assign<Options, Options>(
        {
          include: 'src/**/*',
          exclude: /node_modules/,
          // Use vite cacheDir as default
          cacheLocation: resolve(config.cacheDir, '.eslintcache'),
        },
        options
      )
      const { include, exclude, ...eslintOptions } = userOptions

      filter = createFilter(include, exclude)
      eslint = new ESLint(eslintOptions)
    },
    async transform(_, id) {
      const filePath = normalizePath(id)

      if (!filter(filePath)) {
        return null
      }

      console.log('pass', id)
    },
  }
}
