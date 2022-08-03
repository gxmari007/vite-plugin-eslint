import type { ESLint } from 'eslint'
import type { PluginContext } from 'rollup'
import { existsSync } from 'node:fs'

import type { Options } from './types'

export function parseRequest(id: string) {
  return id.split('?', 2)[0]
}

export function pickESLintOptions(options: Options): ESLint.Options {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    include,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    exclude,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formatter,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    emitWarning,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    emitError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    failOnWarning,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    failOnError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    throwOnError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    throwOnWarning,
    ...eslintOptions
  } = options

  return eslintOptions
}

export function isVirtualModule(module: string) {
  return !existsSync(module)
}

export async function to<R, E = Error>(func: () => Promise<R>) {
  return func()
    .then((value) => [null, value])
    .catch((error: E) => [error, null])
}

export function checkModule(
  ctx: PluginContext,
  eslint: ESLint,
  files: string | string[],
  formatter: ESLint.Formatter['format']
) {
  console.log('check module')
}
