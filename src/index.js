export const MAX = 2147483647

export type DecadeID = ?TimeoutID | (() => DecadeID)

export const decadeOut = (callback: Function, ms: number = 0): DecadeID => {
  if (Number.isNaN(+ms)) {
    throw new TypeError('ms must be a number')
  }

  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function')
  }

  if (!Number.isFinite(ms)) {
    return null
  }

  if (ms > MAX) {
    let timeoutId = setTimeout(() => {
      timeoutId = decadeOut(callback, ms - MAX)
    }, MAX)

    return () => timeoutId
  }

  const timeoutId = setTimeout(callback, ms)
  return timeoutId
}

export const clearDecadeOut = (d: DecadeID) => {
  if (typeof d === 'function') {
    clearDecadeOut(d())
    return
  }
  d && clearTimeout(d)
}
