const whenCallbacks = new Set()
const mutationObserver = new MutationObserver(() => {
  whenCallbacks.forEach((callback) => callback())
})
mutationObserver.observe(document, { childList: true, subtree: true })

// Abstract again so any number of selectors can be defined.

function whenAdded (selector, callback) {
  const addedElements = new Set();
  check()
  whenCallbacks.add(check)
  function check () {
    Array.from(document.querySelectorAll(selector))
      .filter((element) => !addedElements.has(element))
      .forEach(function (element) {
        addedElements.add(element)
        callback(element)
      })
  }
}
