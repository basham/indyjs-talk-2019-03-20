// Mutate the element or manually update it.

import { whenAdded } from 'when-elements'

let i = 0
whenAdded('.counter', (element) => {
  const id = i++
  element._id = id
  element.innerHTML = `Counter ${id}`
})
