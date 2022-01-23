import './style.scss';
import { MDCRipple } from '@material/ripple';
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCTextField } from '@material/textfield';

console.log('ohai');

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
  const myRipple = ripple(element);
  myRipple.unbounded = true;
  if (element.getAttribute('toggle')) {
    return new MDCIconButtonToggle(element);
  }
};
