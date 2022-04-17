import type { Plugin } from 'vite'

import { name } from '../package.json'

export default function eslintPlugin(): Plugin {
  return {
    name,
  }
}
