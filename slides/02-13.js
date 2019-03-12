
const mutationObserver = new MutationObserver(() => {
  checkCounter()
})
mutationObserver.observe(document, { childList: true, subtree: true })

// Look for unique elements matching a query.

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
