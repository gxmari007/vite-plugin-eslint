import type { ESLint } from 'eslint'
import type { FilterPattern } from '@rollup/pluginutils'

/** ESlint plugin options, extending from ESlint options */
export interface Options extends ESLint.Options {
  /** The cache is enabled by default to decrease execution time */
  // cache?: boolean
  /** auto fix source code */
  // fix?: boolean
  /** A single file, or array of files, to include when linting */
  include?: FilterPattern
  /** A single file, or array of files, to exclude when linting */
  exclude?: FilterPattern
  /** Custom error formatter or the name of a built-in formatter */
  formatter?: string | ESLint.Formatter['format']
  /** The warings found will be emitted */
  throwOnWarning?: boolean
  /** The errors found will be emitted */
  throwOnError?: boolean
}
