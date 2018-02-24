# decade-out

[![Build Status](https://travis-ci.org/doshisid/decade-out.svg?branch=master)](https://travis-ci.org/doshisid/decade-out) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/doshisid/decade-out/issues) [![HitCount](http://hits.dwyl.io/doshisid/decade-out.svg)](http://hits.dwyl.io/doshisid/decade-out) [![npm](https://img.shields.io/npm/v/decade-out.svg)](https://www.npmjs.com/package/decade-out) [![npm](https://img.shields.io/npm/l/decade-out.svg)](https://www.npmjs.com/package/decade-out)

> Set huge timeouts

## Install

```bash
npm install --save decade-out
```

## Usage

```js
import { decadeOut, clearDecadeOut } from 'decade-out'

const oneDecade = 1000 * 60 * 60 * 24 * 365

// The callback will fire after 10 years,
// Given the program keeps running.
const decadeId = decadeOut(
  () => console.log('You are 10 years older now!'),
  oneDecade
)

// You can also cancel the execution
clearDecadeOut(decadeId)
```

Set timeouts for huge duration which are not handled by `setTimeout`. Cancel it if required.

## API

### decadeOut(callback, [ms]) -> ?decadeID

#### callback

Function to execute when timeout occurs.

#### ms

Time in ms after which callback should be fired. It can be much longer than what the default timeout supports.

If not provided, callback fires immediately.
If `Infinity` is provided, callback will never fire as no timer is set at all and `null` is returned.
If a proper ms is provided, callback will be fired after the time passes.

#### decadeId

`decadeId` is returned from `decadeOut` which is an internal way of identifying the running timer.
You can't use it with `clearTimeout`. You have to use it with `clearDecadeOut`.

### clearDecadeOut(decadeId)

`decadeId` can be passed to `clearDecadeOut` to clear the timeout. Use this instead of `clearTimeout`.

## License

MIT © [Siddharth Doshi](https://sid.sh)
