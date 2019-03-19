// Integrate whenRemoved() with whenAdded() for a cleaner API.

whenAdded('.item', (element) => {
  // Initialize
  return () => {
    // Clean up
  }
})

function whenAdded (selector, callback) {
  const addedElements = new Set()
  check()
  whenCallbacks.add(check)
  function check () {
    Array.from(document.querySelectorAll(selector))
      .filter((element) => !addedElements.has(element))
      .forEach((element) => {
        addedElements.add(element)
        // Start new
        const returnValue = callback(element)
        const removedCallback = typeof returnValue === 'function'
          ? returnValue
          : () => {}
        whenRemoved(element, () => {
          addedElements.delete(element)
          removedCallback()
        })
      })
  }
}
