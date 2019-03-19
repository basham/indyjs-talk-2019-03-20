// Manipulate data streams
// $ node slides/04-07.js
//
// a$: ---0------1------2-------------3---
// b$: ---0----------------------4--------
// c$: --[0,0]--[1,0]--[2,0]--[2,4]--[3,4]

const { combineLatest, interval } = require('rxjs')
const { filter, map } = require('rxjs/operators')

const a$ = interval(1000)

const b$ = a$.pipe(
  filter((value) => value % 2 === 0),
  map((value) => value * 2)
)

const c$ = combineLatest(a$, b$)

c$.subscribe(console.log)
