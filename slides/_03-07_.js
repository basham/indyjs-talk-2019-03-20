// Count seconds.

import { render, html } from 'lighterhtml'
import { interval } from 'rxjs'
import { whenAdded } from 'when-elements'

whenAdded('.seconds', (element) => {
  const subscription = interval(1000).subscribe((seconds) => {
    render(element, () => html`Seconds: ${seconds++}`)
  })
  return () => subscription.unsubscribe()
})
