// import { existsSync, readFileSync } from 'fs'
import type { ESLint } from 'eslint'

import type { Options } from './types'

export function parseRequest(id: string) {
  return id.split('?', 2)[0]
}

export function pickESLintOptions(options: Options): ESLint.Options {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { include, exclude, formatter, throwOnError, throwOnWarning, ...eslintOptions } = options

  return eslintOptions
}

// export function readESLintCache(path: string) {
//   if (existsSync(path)) {
//     const content = readFileSync(path, { encoding: 'utf-8' })

//     if (content) {
//       try {
//         const data = JSON.parse(content)

//         if (Array.isArray(data) && data[0]) {
//           return new Set<string>(Object.keys(data[0]))
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }

//   return new Set<string>()
// }
