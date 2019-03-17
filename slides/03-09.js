// Render clickers.

import { render, html } from 'lighterhtml'
import { whenAdded } from 'when-elements'

whenAdded('#clicker', (element) => {
  let state = {
    value: 0
  }

  function click () {
    state.value++
    update()
  }

  const handlers = {
    click
  }

  function update () {
    render(element, () => renderComponent({ ...state, handlers }))
  }
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