// WhenElements verses useEffect and useLayoutEffect.

whenAdded(selector, (element) => {
  // Define state$
  state$.pipe(
    // componentWillUpdate
    tap(() => {
      // render
    }),
    // componentDidUpdate
  ).subscribe()
})

function ReactComponent () {
  useEffect(() => {
    // componentWillUpdate
  }, [/* execute when array values change */])

  useLayoutEffect(() => {
    // componentDidUpdate
  }, [/* execute when array values change */])
}
