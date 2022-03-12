import { defineConfig } from 'tsup'

const __DEV__ = process.env.NODE_ENV !== 'production'

// https://tsup.egoist.sh/
export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: __DEV__,
  clean: true,
  minify: !__DEV__,
  dts: __DEV__ ? false : { only: true },
  watch: __DEV__,
})
