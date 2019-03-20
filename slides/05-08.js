// Custom useState with RxJS.

const { html, render } = lighterhtml
const { BehaviorSubject } = rxjs
const { whenAdded } = WhenElements

whenAdded('my-counter', (element) => {
  const initialCount = parseInt(element.getAttribute('data-count'))
  const [ count$, setCount ] = useState(initialCount)
  const sub = count$.subscribe((count) => {
    render(element, () => html`
      Count: ${count}
      <button onclick=${() => setCount(initialCount)}>Reset</button>
      <button onclick=${() => setCount(count$.getValue() + 1)}>+</button>
      <button onclick=${() => setCount(count$.getValue() - 1)}>-</button>
    `)
  })
  return () => sub.unsubscribe()
})

function useState (initValue) {
  const stream$ = new BehaviorSubject(initValue)
  const next = (nextValue) => stream$.next(nextValue)
  return [ stream$, next ]
}

/*
function ReactCounter({ initialCount }) {
  const [ count, setCount ] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}
*/
