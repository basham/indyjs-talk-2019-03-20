// WhenElements verses useEffect.

whenAdded(selector, (element) => {
  // componentDidMount

  return () => {
    // componentWillUnmount
  }
})

function ReactComponent () {
  useEffect(() => {
    // componentDidMount

    return () => {
      // componentWillUnmount
    }
  }, [])
}
