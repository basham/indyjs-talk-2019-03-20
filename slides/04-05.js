// Produce and manipulate data over time.
// $ node slides/04-05.js

// import { interval } from 'rxjs'
// import { map } from 'rxjs/operators'
const { interval } = require('rxjs')
const { map } = require('rxjs/operators')

interval(1000).pipe(
  map((value) => `${value + 1}s`)
).subscribe((seconds) => {
  console.log(seconds)
})

// Output:
// 1s
// 2s
// 3s
// ...
