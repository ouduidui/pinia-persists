export interface Storage {
  /**
   * Returns the number of key/value pairs.
   */
  readonly length?: number
  /**
   * Removes all key/value pairs, if there are any.
   */
  clear?: () => void
  /**
   * Returns the current value associated with the given key, or null if the given key does not exist.
   */
  getItem: (key: string) => string | null
  /**
   * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
   */
  key?: (index: number) => string | null
  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   */
  removeItem?: (key: string) => void
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   */
  setItem: (key: string, value: string) => void
  [name: string]: any
}

export interface PersistOptions {
  /**
   * it is the prefix of the key to store the persisted state under, such as the store id is "test", that store key is "pinia_test" by default.
   */
  prefix?: string
  /**
   * it is the storage for state persist,  you can choose localStorage, sessionStorage or your custom storage.
   */
  storage?: Storage
  /**
   * when app first loader or refresh, whether to overwrite the existing state with the output from state directly, instead of merging the two objects with deep merge.
   */
  overwrite?: boolean
}
