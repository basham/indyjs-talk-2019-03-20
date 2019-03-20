// Review of slide `04-11.js`.

const { render, html } = lighterhtml
const { whenAdded } = WhenElements
const { BehaviorSubject, fromEvent } = rxjs
const { map } = rxjs.operators

whenAdded('[is="clicker"]', (element) => {
  const count$ = new BehaviorSubject(0)

  const clickSubscription = fromEvent(element, 'click').subscribe(() => {
    count$.next(count$.getValue() + 1)
  })

  const state$ = count$.pipe(
    map((count) => ({ count }))
  )
  const stateSubscription = state$.subscribe((state) => {
    const { count } = state
    render(element, () =>
      html`Clicks: <strong>${count}</strong>`
    )
  })

  return () => {
    clickSubscription.unsubscribe()
    stateSubscription.unsubscribe()
  }
})
