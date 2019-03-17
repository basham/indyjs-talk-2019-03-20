// Watch for elements added to the DOM
// matching a given CSS selector.

const mutationObserver = new MutationObserver(() => {
  checkCounter()
})
mutationObserver.observe(document, { childList: true, subtree: true })

const addedCounters = new Set()
function checkCounter () {
  Array.from(document.querySelectorAll('.item'))
    .filter((element) => !addedCounters.has(element))
    .forEach((element) => {
      addedCounters.add(element)
      // Initialize
    })
}

checkCounter()
