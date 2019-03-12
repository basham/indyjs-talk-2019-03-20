
const mutationObserver = new MutationObserver(() => {
  // DOM tree is updated.
})
mutationObserver.observe(document, { childList: true, subtree: true })
