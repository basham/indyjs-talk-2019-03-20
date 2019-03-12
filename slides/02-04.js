// Initiate anytime, for many instances.
// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define

class MyElement extends HTMLElement {
  constructor() {
    // ...
  }
}
customElements.define('my-element', MyElement)

// <my-element></my-element>
