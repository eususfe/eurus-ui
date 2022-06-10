
import path from 'path'
import klawSync from 'klaw-sync'
import fs from 'fs'
import type { Plugin } from 'vite'
import { packagesDir } from '../constants';

const PACKAGES_PATH = path.resolve(__dirname, '../../', packagesDir)

const components = klawSync(PACKAGES_PATH, {
  nofile: true,
  depthLimit: 0,
}).map(dir => path.basename(dir.path))

export function MarkdownTransform(): Plugin {
  return {
    name: 'element-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {

      if (!id.endsWith('.md')) return

      const componentId = path.basename(id, '.md')

      if (!components.includes(componentId)) return
      const src = code.match(/(?<=src=\").*?(?=\")/g)![0];
      const source = fs.readFileSync(path.resolve(src),'utf-8');
      const codeSplit = code.split("code-demo")

      return {
        code:  codeSplit[0] + `code-demo source="${encodeURIComponent(source)}" ` + codeSplit[1],
      }
    },
  }
}