// Render HTML.

const { render, html } = lighterhtml

render(document.getElementById('clicker'), () =>
  html`<button>Clicks: <strong>0</strong></button>`
)
