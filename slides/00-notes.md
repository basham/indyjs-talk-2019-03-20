# Reactive Components without React

Learn how to make web components without polyfills or frameworks. A few small libraries is all you need to cobble together robust solutions for lifecycle methods, rendering, data flow, and communication.

Chris Basham is a designer and front-end developer for Indiana University, specializing in functional reactive programming with RxJS.

https://bash.am

# Mount and unmount

Goal: Do something whenever a certain element appears.

Initiate once, for one instance.

```js
const el = document.querySelector('#counter')
init(el)
```

Initiate once, for many instances.

```js
document.querySelectorAll('.counter')
  .forEach(init)
```

Initiate anytime, for many instances.

https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define

```js
class MyElement extends HTMLElement {
  constructor() {
    // ...
  }
}
customElements.define('my-element', MyElement)
```

```html
<my-element></my-element>
```

```js
class WordCount extends HTMLElement {
  constructor() {
    // ...
  }
}
customElements.define('word-count', WordCount, { extends: 'p' })
```

```html
<p is="word-count"></p>
```

Custom Elements is not well supported.
https://caniuse.com/#feat=custom-elementsv1

But can we do this without polyfills?
Without classes?

How about a simple API like this?
When an element is added matching the selector, start up.

```js
whenAdded('.counter', (element) => {
  // initialize
})
```

Use Mutation Observer to do something whenever the DOM updates.
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

Strong browser support since 2012.
https://caniuse.com/#feat=mutationobserver

```js
const mutationObserver = new MutationObserver(() => {
  // DOM tree is updated.
})
mutationObserver.observe(document, { childList: true, subtree: true })
```

Now, let's look for unique elements matching a query.
And initialize once found.

```js
const addedCounters = new Set()
function checkCounter () {
  Array.from(document.querySelectorAll('.counter'))
    .filter((element) => !addedCounters.has(element))
    .forEach((element) => {
      addedCounters.add(element)
      // Initialize
    })
}

checkCounter()

const mutationObserver = new MutationObserver(() => {
  checkCounter()
})
mutationObserver.observe(document, { childList: true, subtree: true })
```

Now abstract again so any number of selectors can be defined.

```js
const whenCallbacks = new Set()
const mutationObserver = new MutationObserver(() => {
  whenCallbacks.forEach((callback) => callback())
})
mutationObserver.observe(document, { attributes: true, childList: true, subtree: true })

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

whenAdded('.counter', (element) => {
  // initialize
})
```

We can use a similar technique to provide `whenRemoved()`.

```js
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

whenAdded('.counter', (element) => {
  // Initialize
  whenRemoved(element, () => {
    // Clean up
  })
})
```

`whenRemoved` could be integrated into `whenAdded` for a cleaner API.

```js
function whenAdded (selector, callback) {
  const addedElements = new Set();
  check()
  whenCallbacks.add(check)
  function check () {
    Array.from(document.querySelectorAll(selector))
      .filter((element) => !addedElements.has(element))
      .forEach(function (element) {
        addedElements.add(element)
        // Start new
        const returnValue = callback(element)
        const removedCallback = typeof returnValue === 'function' ? returnValue : () => {}
        whenRemoved(element, () => {
          addedElements.delete(element)
          removedCallback()
        })
      })
  }
}

whenAdded('.counter', (element) => {
  // Initialize
  return () => {
    // Clean up
  }
})
```

With 34 LOC, we have general-purpose mount and unmount callbacks.

Use this now:
https://github.com/basham/when-elements

```
npm install when-elements
```

```js
import { added, removed } from 'when-elements'
```

# Rendering

With `whenAdded`, we can do whatever we wish.

Render within the element.
Set up behaviors.

```js
let i = 0
whenAdded('.counter', (element) => {
  element.innerHTML = `Counter ${i++}`
})
```

```js
const { render } = 'react-dom'

whenAdded('.counter', (element) => {
  render(element, <Counter />)
})
```

```js
const { render, html } = 'lighterhtml'

let i = 0
whenAdded('.counter', (element) => {
  render(element, html`woot ${i++}`)
})
```