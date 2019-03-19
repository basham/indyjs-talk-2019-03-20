// Render clickers.

const { render, html } = lighterhtml
const { whenAdded } = WhenElements
const { BehaviorSubject, fromEvent } = rxjs
const { map } = rxjs.operators

whenAdded('[is="clicker"]', (element) => {
  const [ count$, setCount ] = useStream(0)
  const [ whenRemoved, whenRemovedStack ] = useCallbackStack()

  const clickSubscription = fromEvent(element, 'click').subscribe(() => {
    setCount(count$.getValue() + 1)
  })
  whenRemoved(() => clickSubscription.unsubscribe())

  const state$ = count$.pipe(
    map((count) => ({ count }))
  )
  const stateSubscription = state$.subscribe((state) => {
    const { count } = state
    render(element, () =>
      html`Clicks: <strong>${count}</strong>`
    )
  })
  whenRemoved(() => stateSubscription.unsubscribe())

  return whenRemovedStack
})

function useStream (value) {
  const stream$ = value === undefined
    ? new Subject()
    : new BehaviorSubject(value)
  const set = (newValue) => stream$.next(newValue)
  return [ stream$, set ]
}

function useCallbackStack () {
  const stack = new Set()
  const add = (value) => {
    if (typeof value === 'function') {
      stack.add(value)
    }
  }
  const call = () => {
    stack.forEach((callback) => callback())
    stack.clear()
  }
  return [ add, call ]
}
