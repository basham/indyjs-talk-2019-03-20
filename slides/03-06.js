// Count seconds.

import { render, html } from 'lighterhtml'
import { whenAdded } from 'when-elements'

whenAdded('.seconds', (element) => {
  let seconds = 0
  setInterval(() => {
    render(element, () => html`Seconds: ${seconds++}`)
  }, 1000)
})
