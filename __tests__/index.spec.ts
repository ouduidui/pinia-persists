import { describe, expect, fn, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { PiniaPluginContext } from 'pinia'
import { createPinia, defineStore } from 'pinia'
import persist from '../src/index'

describe('Persist', () => {
  it('persist is a function', () => {
    expect(typeof persist).toBe('function')
  })

  it('persist return a function', () => {
    expect(typeof persist()).toBe('function')
  })

  it('test plugin called', () => {
    const fooStore = defineStore('foo', {
      state: () => {
        return {
          count: 1,
        }
      },
    })

    const barStore = defineStore('bar', {
      state: () => {
        return {
          count: 1,
        }
      },
    })
    const pinia = createPinia()

    const plugin = fn(({ store }: PiniaPluginContext) => {
      expect(store.$id).toMatch(/foo|bar/)
    })

    pinia.use(plugin)

    mount({ template: 'none' }, { global: { plugins: [pinia] } })

    expect(plugin).not.toBeCalled()
    const store = fooStore(pinia)
    expect(store.count).toBe(1)
    expect(plugin).toBeCalledTimes(1)
    fooStore(pinia)
    expect(plugin).toBeCalledTimes(1)
    barStore(pinia)
    expect(plugin).toBeCalledTimes(2)
  })

  it('set state on first time', () => {
    const testStore = defineStore('foo', {
      state: () => ({ test: 'foo' }),
    })
    const pinia = createPinia()
    pinia.use(persist())

    mount({ template: 'none' }, { global: { plugins: [pinia] } })
    const store = testStore(pinia)
    expect(store.test).toBe('foo')
    expect(window.localStorage.getItem('pinia_foo')).toBe(JSON.stringify({ test: 'foo' }))
  })

  it('sync state when storage has same key data', () => {
    window.localStorage.setItem('pinia_foo', JSON.stringify({ test: 'bar' }))
    const testStore = defineStore('foo', {
      state: () => ({ test: 'foo' }),
    })
    const pinia = createPinia()
    pinia.use(persist())

    mount({ template: 'none' }, { global: { plugins: [pinia] } })
    const store = testStore(pinia)
    expect(store.test).toBe('bar')
  })

  it('sync storage data when state change', (done) => {
    window.localStorage.clear()
    const testStore = defineStore('foo', {
      state: () => ({ test: 'foo' }),
      actions: {
        change(val: string) {
          this.test = val
        },
      },
    })
    const pinia = createPinia()
    pinia.use(persist())

    mount({ template: 'none' }, { global: { plugins: [pinia] } })
    const store = testStore(pinia)
    expect(store.test).toBe('foo')
    store.change('baz')
    expect(store.test).toBe('baz')
    Promise.resolve().then(() => {
      expect(window.localStorage.getItem('pinia_foo')).toBe(JSON.stringify({ test: 'baz' }))
      store.change('')
    }).then(() => {
      expect(window.localStorage.getItem('pinia_foo')).toBe(JSON.stringify({ test: '' }))
      done()
    })
  })

  it('not to sync state when set overwrite = true', () => {
    window.localStorage.setItem('pinia_foo', JSON.stringify({ test: 'bar' }))
    const testStore = defineStore('foo', {
      state: () => ({ test: 'foo' }),
    })
    const pinia = createPinia()
    pinia.use(persist({ overwrite: true }))

    mount({ template: 'none' }, { global: { plugins: [pinia] } })
    const store = testStore(pinia)
    expect(store.test).toBe('foo')
  })

  it('custom prefix', () => {
    window.localStorage.clear()

    const testStore = defineStore('foo', {
      state: () => ({ test: 'foo' }),
    })
    const pinia = createPinia()
    pinia.use(persist({ prefix: 'dewey' }))

    mount({ template: 'none' }, { global: { plugins: [pinia] } })
    testStore(pinia)
    expect(window.localStorage.getItem('pinia_foo')).toBe(null)
    expect(window.localStorage.getItem('dewey_foo')).toBe(JSON.stringify({ test: 'foo' }))
  })

  it('custom storage', (done) => {
    window.localStorage.clear()

    const storageData = new Map<string, string>()
    const customStorage = {
      setItem: (key: string, value: string): void => {
        storageData.set(key, value)
      },
      getItem: (key: string): string | null => {
        if (storageData.has(key)) return storageData.get(key)!
        return null
      },

    }

    const testStore = defineStore('foo', {
      state: () => ({ test: 'foo' }),
      actions: {
        change(val: string) {
          this.test = val
        },
      },
    })
    const pinia = createPinia()
    pinia.use(persist({ storage: customStorage }))

    mount({ template: 'none' }, { global: { plugins: [pinia] } })
    const store = testStore(pinia)

    expect(store.test).toBe('foo')
    expect(customStorage.getItem('pinia_foo')).toBe(JSON.stringify({ test: 'foo' }))

    store.change('bar')
    expect(store.test).toBe('bar')
    Promise.resolve().then(() => {
      expect(customStorage.getItem('pinia_foo')).toBe(JSON.stringify({ test: 'bar' }))
      done()
    })
  })
})
