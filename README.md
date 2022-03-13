<h1 align="center"><samp>Pinia Persists</samp></h1>

<p align="center">
  <samp>A pinia plugin for state persist.</samp>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/pinia-persists"><img src="https://img.shields.io/npm/v/pinia-persists?label=" alt="NPM version"></a></p>

<p align="center">
  <span>English</span> 
  <span style="padding: 0 8px">|</span>
  <a href="./README_CN.md">简体中文</a>
</p>


## Usage

### Install

```bash
npm i pinia-persists
```

### Use

```javascript
import { persist } from 'pinia-persists'
import { createPinia } from 'pinia'

const pinia = createPinia()

// pinia use plugin
pinia.use(persist({ /* options */ }))

app.use(pinia)
```

## Options

### prefix

- type: String
- optional, default "pinia"
- it is the prefix of the key to store the persisted state under, such as the store id is "test", that store key is "pinia_test" by default.

### storage

- type: Object

  ```typescript
  interface Storage {
      readonly length?: number;
      clear?: () => void;
      getItem: (key: string) => string | null;
      key?: (index: number) => string | null;
      removeItem?: (key: string) => void;
      setItem: (key: string, value: string) => void;
      [name: string]: any;
  }
  ```

- optional, default  `window.localStorage`
- it is the storage for state persist,  you can choose localStorage, sessionStorage or your custom storage.

### overwrite

- type: Boolean
- optional, default `false`
- when app first loader or refresh, whether to overwrite the existing state with the output from state directly, instead of merging the two objects with deep merge.


## License

[MIT](./LICENSE) License © 2022 [Dewey Ou](https://github.com/ouduidui)
