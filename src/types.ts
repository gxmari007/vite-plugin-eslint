import type { FilterPattern } from '@rollup/pluginutils'
import { ESLint } from 'eslint'

export { ESLint }
export type OutputFixes = typeof ESLint.outputFixes

/** Plugin options, extending from ESlint options */
export interface Options extends ESLint.Options {
  /** Path to ESLint instance that will be used for linting */
  eslintPath?: string
  /** A single file, or array of files, to include when linting */
  include?: FilterPattern
  /** A single file, or array of files, to exclude when linting */
  exclude?: FilterPattern
  /** Custom error formatter or the name of a built-in formatter */
  formatter?: string | ESLint.Formatter['format']
  /** The warings found will be printed */
  emitWarning?: boolean
  /** The errors found will be printed */
  emitError?: boolean
  /** Will cause the module build to fail if there are any warnings, based on emitWarning */
  failOnWarning?: boolean
  /** Will cause the module build to fail if there are any errors, based on emitError */
  failOnError?: boolean
  /**
   * The warings found will be emitted
   * @deprecated
   */
  throwOnWarning?: boolean
  /**
   * The errors found will be emitted
   * @deprecated
   */
  throwOnError?: boolean
}
