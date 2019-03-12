// Render to the element with lighterhtml.

import { render, html } from 'lighterhtml'
import { whenAdded } from 'when-elements'

whenAdded('.counter', (element) => {
  render(element, () => html`Counter ${i++}`)
})
