# pinia-persists

a pinia plugin for state persist.

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
- it is the prefix of the key to store the persisted state under, such as the pinia store id is "test", that storage key is "pinia_test".

### storage

- type:

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
- when app reload, whether to overwrite the existing state with the output from state directly, instead of merging the two objects with deepmerge.


