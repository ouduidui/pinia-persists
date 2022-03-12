import { defineConfig } from 'tsup'

// https://tsup.egoist.sh/
export default defineConfig(({ env }) => {
  const __DEV__ = env!.NODE_ENV !== 'production'
  return {
    entry: ['src/index.ts'],
    outDir: 'dist',
    splitting: false,
    sourcemap: __DEV__,
    clean: true,
    minify: !__DEV__,
    dts: __DEV__ ? false : { only: true },
    watch: __DEV__,
  }
})
