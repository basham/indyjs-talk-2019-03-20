// Render HTML with static state.

const { render, html } = lighterhtml

const element = document.getElementById('clicker')
const state = {
  value: 0
}

render(element, () => renderComponent(state))

function renderComponent (props) {
  return html`
  <button>Clicks: ${renderValue(props)}</button>`
}

function renderValue (props) {
  const { value } = props
  return html`<strong>${value}</strong>`
}
