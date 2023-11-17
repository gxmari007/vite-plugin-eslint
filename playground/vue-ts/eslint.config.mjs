import vueParser from 'vue-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import { FlatCompat } from '@eslint/eslintrc'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintrc = new FlatCompat({
  baseDirectory: __dirname,
})

const rootEslintRc = JSON.parse(fs.readFileSync('../../.eslintrc'))
delete rootEslintRc.plugins

const config = [
  ...eslintrc.extends('plugin:vue/vue3-recommended'),
  ...eslintrc.config(rootEslintRc),
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
      },
    },
  },
]

export default config
