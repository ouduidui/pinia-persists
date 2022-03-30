export const isObject = (val: unknown) => val && typeof val === 'object'

export const mergeArrayWithDedupe = (a: any[], b: any[]) => Array.from(new Set([...a, ...b]))
