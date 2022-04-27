export const isObject = (val: unknown) => val && typeof val === 'object'

export const mergeArrayWithDedupe = (a: any[], b: any[]) => {
  const result: any[] = [...a]

  for (const item of b) {
    if (!isObject(item)) {
      if (!result.includes(item)) result.push(item)
    }
    else {
      const itemStr = JSON.stringify(item)
      if (!a.some((i) => {
        if (!isObject(i)) return false
        else
          return itemStr === JSON.stringify(i)
      }))
        result.push(item)
    }
  }

  return result
}
