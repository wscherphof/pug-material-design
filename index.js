import './style.scss';
import { MDCRipple } from '@material/ripple';
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCTextField } from '@material/textfield';

window['mdc-text-field'] = function (element) {
  return new MDCTextField(element);
};

function ripple(element) {
  return new MDCRipple(element);
}

window['mdc-button'] = function (element) {
  ripple(element);
};

window['mdc-icon-button'] = function (element) {
  const ripple = ripple(element);
  ripple.unbounded = true;
  if (element.getAttribute('toggle')) {
    const iconToggle = new MDCIconButtonToggle(element);
    iconToggle.listen('MDCIconButtonToggle:change', (event) => {
      element.dispatchEvent(event);
    });
  }
};
