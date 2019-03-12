// Render to the element with React.

import { render } from 'react-dom'
import { whenAdded } from 'when-elements'

whenAdded('.counter', (element) => {
  render(element, <Counter />)
})
