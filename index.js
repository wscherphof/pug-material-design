import './style.scss';
import { MDCRipple } from '@material/ripple';
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCTextField } from '@material/textfield';
import { MDCFormField } from '@material/form-field';
import { MDCCheckbox } from '@material/checkbox';

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

window['mdc-text-field'] = function (element) {
  return new MDCTextField(element);
};

window['mdc-checkbox'] = function (element) {
  element = element.parentElement;
  const checkbox = new MDCCheckbox(element);
  const formField = new MDCFormField(element.closest('.mdc-form-field'));
  formField.input = checkbox;
};
