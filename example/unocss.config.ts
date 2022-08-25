import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,

} from 'unocss';

/**
 *   transformerDirectives,
  transformerVariantGroup,
 */
import transformerCompileClass from './vite-unocss-compile-css';

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    })
  ],
  transformers: [
    // transformerDirectives(),
    // transformerVariantGroup(),
    transformerCompileClass(),
  ],
  // include: [/.*\/eurus-ui(.*)[.js]/],
});
