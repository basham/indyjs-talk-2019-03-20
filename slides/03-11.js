// Render clickers.

const { render, html } = lighterhtml
const { whenAdded } = WhenElements


whenAdded('my-clicker', (element) => {
  let state = {
    //value: 0
  }

  function click () {
    //state.value++
    //update()
    setState({ value: state.value + 1 })
  }

  function setState (newState) {
    state = { ...state, ...newState }
    update()
  }

  function click () {
    setState((s) => ({ value: s.value + 1 }))
  }

  function setState (cb) {
    state = { ...state, ...cb(state) }
    update()
  }

  const handlers = {
    click
  }

  function update () {
    render(element, () => renderComponent({ ...state, handlers }))
  }

  //update()
  setState({ value: 0 })
})

function renderComponent (props) {
  const { handlers } = props
  return html`
  <button onclick=${handlers.click}>
    Clicks: ${renderValue(props)}
  </button>`
}

function renderValue (props) {
  const { value } = props
  return html`<strong>${value}</strong>`
}
