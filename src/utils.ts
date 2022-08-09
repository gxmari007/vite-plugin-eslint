import type { PluginContext } from 'rollup'
import { existsSync } from 'node:fs'

import type { Options, ESLint, OutputFixes } from './types'

export function parseRequest(id: string) {
  return id.split('?', 2)[0]
}

export function isVirtualModule(file: string) {
  return !existsSync(file)
}

export function pickESLintOptions(options: Options): ESLint.Options {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eslintPath,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lintOnStart,
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
    ...eslintOptions
  } = options

  return eslintOptions
}

export async function to<R, E = Error>(promise: Promise<R>) {
  return promise
    .then<[null, R]>((data) => [null, data])
    .catch<[E, undefined]>((error: E) => [error, undefined])
}

export async function checkModule(
  ctx: PluginContext,
  eslint: ESLint,
  files: string | string[],
  options: Options,
  formatter: ESLint.Formatter['format'],
  outputFixes: OutputFixes
) {
  const [error, report] = await to(eslint.lintFiles(files))

  if (error) {
    return Promise.reject(error)
  }

  const hasWarning = report.some((item) => item.warningCount > 0)
  const hasError = report.some((item) => item.errorCount > 0)
  const result = formatter(report)

  // Auto fix error
  if (options.fix && report) {
    const [error] = await to(outputFixes(report))

    if (error) {
      return Promise.reject(error)
    }
  }

  // Throw warning message
  if (hasWarning && options.emitWarning) {
    const warning = typeof result === 'string' ? result : await result

    if (options.failOnWarning) {
      ctx.error(warning)
    } else {
      ctx.warn(warning)
    }
  }

  // Throw error message
  if (hasError && options.emitError) {
    const error = typeof result === 'string' ? result : await result

    if (options.failOnError) {
      ctx.error(error)
    } else {
      console.log(error)
    }
  }

  return Promise.resolve()
}
