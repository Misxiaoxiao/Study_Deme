export function isFalsy (val: any) {
  return val === 0 ? false : !val
}

export function cleanObject (object: any) {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}