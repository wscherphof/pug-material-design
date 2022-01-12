import './style.scss'
import { MDCRipple } from '@material/ripple'
import { MDCIconButtonToggle } from '@material/icon-button'
import { MDCTextField } from '@material/textfield'

function initMaterialDesign (element) {
  function init (classes, init) {
    classes = classes instanceof Array ? classes : [classes]
    classes.forEach((className) => {
      if (element.classList.contains(className)) {
        init(element, className)
      }
      element.querySelectorAll('.' + className).forEach((element) => {
        init(element, className)
      })
    })
  }
  init(['mdc-button', 'mdc-icon-button'], (element, className) => {
    const ripple = new MDCRipple(element)
    if (className === 'mdc-icon-button') {
      ripple.unbounded = true
      if (element.getAttribute('toggle')) {
        const iconToggle = new MDCIconButtonToggle(element)
        iconToggle.listen('MDCIconButtonToggle:change', (event) => {
          element.dispatchEvent(event)
        })
      }
    }
  })
  init('mdc-text-field', (elt, className) => {
    return new MDCTextField(elt)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  if (!htmx) { // eslint-disable-line
    initMaterialDesign(document)
  }
})

if (htmx) { // eslint-disable-line
  htmx.on('htmx:load', function ({ detail }) { // eslint-disable-line
    initMaterialDesign(detail.elt)
  })
}
