// $ node slides/03-09.js

const { interval } = require('rxjs')

interval(1000).subscribe((seconds) => {
  console.log('Seconds', seconds)
})
