// Tick every second.

const { render, html } = lighterhtml
const { whenAdded } = WhenElements
const { interval } = rxjs
const { map, startWith } = rxjs.operators

whenAdded('[is="timer"]', (element) => {
  const seconds$ = interval(1000).pipe(
    map((value) => value + 1),
    startWith(0)
  )
  const state$ = seconds$.pipe(
    map((seconds) => ({ seconds }))
  )
  const subscription = state$.subscribe((state) => {
    const { seconds } = state
    render(element, () =>
      html`<h1>Timer: ${seconds}s</h1>`
    )
  })
  return () => subscription.unsubscribe()
})
