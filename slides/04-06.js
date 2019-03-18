// Produce data streams

// Observe all click events.
import { fromEvent } from 'rxjs'
const clicks$ = fromEvent(document, 'click')

// Tick every second.
import { interval } from 'rxjs'
const seconds$ = interval(1000)

// Emit one string.
import { of } from 'rxjs'
const string$ = of('abc')

// Emit one letter at a time.
import { from } from 'rxjs'
const letters$ = from([ 'a', 'b', 'c' ])

// Emit from a custom stream.
import { Subject } from 'rxjs'
const movies$ = new Subject()
movies$.next('Back to the Future')
movies$.next('Back to the Future Part II')
movies$.next('Back to the Future Part III')

// Emit from a custom stream, with an initial value.
// DeLorean year coordinates.
import { BehaviorSubject } from 'rxjs'
const year$ = new BehaviorSubject('1985')
year$.next('1955')
year$.next('1985')
