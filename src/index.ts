import type { PiniaPluginContext } from 'pinia'

export interface Storage {
  readonly length?: number
  clear?: () => void
  getItem: (key: string) => string | null
  key?: (index: number) => string | null
  removeItem?: (key: string) => void
  setItem: (key: string, value: string) => void
  [name: string]: any
}

export interface PersistOptions {
  prefix?: string
  storage?: Storage
  overwrite?: boolean
}

export function persist(options: PersistOptions = {}) {
  const storage = options.storage || (window && window.localStorage)

  if (!storage)
    throw new ReferenceError('"window" is undefined.')

  const prefix = options.prefix || 'pinia'
  const overwrite = options.overwrite || false

  return function({ store }: PiniaPluginContext) {
    const key = `${prefix}_${store.$id}`

    const storageResult = getItem(key, storage as Storage)
    if (!storageResult || overwrite)
      setItem(key, store.$state, storage)
    else
      store.$patch(storageResult)

    store.$subscribe(() => {
      setItem(key, store.$state, storage)
    })
  }
}

function getItem(key: string, storage: Storage): Record<string, any> | null {
  const value = storage.getItem(key)

  try {
    if (typeof value === 'string') return JSON.parse(value)
    else if (typeof value === 'object') return value
    else return null
  }
  catch (err) {
    return null
  }
}

function setItem(key: string, state: unknown, storage: Storage) {
  return storage.setItem(key, JSON.stringify(state))
}
