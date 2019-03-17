// Render HTML.

import { render, html } from 'lighterhtml'

render(document.getElementById('clicker'), () =>
  html`<button>Clicks: <strong>0</strong></button>`
)

/*
Before:
<div id="clicker" />

After:
<div id="clicker">
  <button>Clicks: <strong>0</strong></button>
</div>
*/
