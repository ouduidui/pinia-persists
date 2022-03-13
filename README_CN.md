<h1 align="center"><samp>Pinia Persists</samp></h1>

<p align="center">
  <samp>一个关于数据持久化的Pinia插件</samp>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/pinia-persists"><img src="https://img.shields.io/npm/v/pinia-persists?label=" alt="NPM version"></a></p>

<p align="center">
  <a href="./README.md">English</a> 
  <span style="padding: 0 8px">|</span>
  <a href="./README_CN.md">简体中文</a>
</p>

## 使用

### 安装

```bash
npm i pinia-persists
```

### 使用

```javascript
import { persist } from 'pinia-persists'
import { createPinia } from 'pinia'

const pinia = createPinia()

// pinia通过use安装插件
pinia.use(persist({ /* options */ }))

app.use(pinia)
```

## Options选项

### prefix

- 类型： String
- 可选， 默认为 "pinia"
- 这是关于存储持久化数据的key值前缀。比如你的store id为 `test` ，那默认情况下这个key会是`pinia_test`。

### storage

- 类型： Object

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

- 可选， 默认为  `window.localStorage`
- 这是设置存储持久化数据的容器，你可以选择 `localStorage`、`sessionStorage`  或者自定义容器。

### overwrite

- 类型： Boolean
- 可选， 默认为`false`
- 当app首次加载或者刷新时，是否覆盖已经存在的持久化数据，而不是对两个数据进行对比合并。


## License

[MIT](./LICENSE) License © 2022 [Dewey Ou](https://github.com/ouduidui)