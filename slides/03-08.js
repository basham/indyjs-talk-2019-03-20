// Render HTML with dynamic state.

import { render, html } from 'lighterhtml'

update() // value: 0
click()  // value: 1
click()  // value: 2

const element = document.getElementById('clicker')
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
