// setState() calls update().

const { render, html } = lighterhtml
const { whenAdded } = WhenElements

whenAdded('my-clicker', (element) => {
  let state = {}

  function setState (newState) {
    state = { ...state, ...newState }
    update()
  }

  function click () {
    setState({ value: state.value + 1 })
  }

  const handlers = {
    click
  }

  function update () {
    render(element, () => renderComponent({ ...state, handlers }))
  }

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
