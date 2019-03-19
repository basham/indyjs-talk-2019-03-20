// Watch for elements removed from the DOM.

whenAdded('.item', (element) => {
  // Initialize
  whenRemoved(element, () => {
    // Clean up
  })
})

function whenRemoved (target, callback) {
  check()
  whenCallbacks.add(check)
  function check () {
    if (target && document.contains(target)) {
      return
    }
    whenCallbacks.delete(check)
    callback()
  }
}
