import { normalizePath, Plugin } from 'vite'
import { resolve } from 'path'
import { ESLint } from 'eslint'
import { createFilter } from '@rollup/pluginutils'

import { name } from '../package.json'
import { Options } from './utils'

export { Options }

export default function eslintPlugin(options: Options = {}): Plugin {
  let eslint: ESLint
  let filter: ReturnType<typeof createFilter>

  return {
    name,
    configResolved(config) {
      const userOptions = Object.assign<Options, Options>(options, {
        include: ['src/**/*'],
      })
      const eslintOptions = Object.assign<Options, Options>(
        {
          // Use vite cacheDir as default
          cacheLocation: resolve(config.cacheDir, '.eslintcache'),
        },
        options
      )

      filter = createFilter()
      eslint = new ESLint(eslintOptions)
    },
    async transform(_, id) {
      const filePath = normalizePath(id)

      if (!filter(filePath)) {
        return null
      }
    },
  }
}
