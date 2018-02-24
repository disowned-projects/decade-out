import { decadeOut, clearDecadeOut, MAX } from './'

jest.useFakeTimers()

test('throws if proper callback is not provided', () => {
  const callback = 'invalid'
  const ms = 1000
  expect(() => decadeOut(callback, ms)).toThrowError(
    /callback must be a function/
  )
})
test('throws if proper ms is not provided', () => {
  const callback = jest.fn()
  const ms = 'ss'
  expect(() => decadeOut(callback, ms)).toThrowError(/ms must be a number/)
})
test('returns the actual TimeoutID if timeout is small enough', () => {
  const callback = jest.fn()
  const ms = 5000
  const timeoutID = decadeOut(callback, ms)
  expect(callback).not.toBeCalled()
  clearTimeout(timeoutID)
  jest.runTimersToTime(5000)
  expect(callback).not.toBeCalled()
})
test('returns DecadeID if timeout is bigger', () => {
  const callback = jest.fn()
  const ms = MAX + 1
  const decadeID = decadeOut(callback, ms)
  expect(typeof decadeID).toBe('function')
  jest.clearAllTimers()
})
test('fires callback no matter how big the timeout is', () => {
  const callback = jest.fn()
  const ms = MAX + 1000
  decadeOut(callback, ms)
  expect(callback).not.toBeCalled()
  jest.runTimersToTime(ms % 4)
  expect(callback).not.toBeCalled()
  jest.runTimersToTime(ms % 2)
  expect(callback).not.toBeCalled()
  jest.runTimersToTime(ms)
  expect(callback).toBeCalled()
})
test('never fires callback if ms Infinity', () => {
  const callback = jest.fn()
  const ms = Infinity
  const d = decadeOut(callback, ms)
  expect(d).toBeNull()
  expect(callback).not.toBeCalled()
  jest.runTimersToTime(ms % 4)
  expect(callback).not.toBeCalled()
  jest.runTimersToTime(ms % 2)
  expect(callback).not.toBeCalled()
  jest.runTimersToTime(ms)
  expect(callback).not.toBeCalled()
})
test('clearDecadeOut clears the timeout properly', () => {
  const callback = jest.fn()
  const ms = MAX + 1500
  const decadeID = decadeOut(callback, ms)
  expect(typeof decadeID).toBe('function')
  jest.runTimersToTime(ms % 4)
  clearDecadeOut(decadeID)
  jest.runTimersToTime(ms + 1)
  expect(callback).not.toBeCalled()
})

test('should fire immediately if ms is not provided', () => {
  const callback = jest.fn()
  decadeOut(callback)
  jest.runTimersToTime(1)
  expect(callback).toBeCalled()
})
