export default class FormValidator {
  constructor(settings, selectedForm) {
    this._settings = settings;
    this._selectedForm = selectedForm;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  // Show error, change input

  _showInputError(input, errorMessage) {
    const error = this._selectedForm.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  };

  // Hide error, change input

  _hideInputError(input) {
    const error = this._selectedForm.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };

  // Check inputs according to patterns

  _checkInputValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  };

  // Change submit button state if input valid/invalid

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._inputs = Array.from(this._selectedForm.querySelectorAll(this._inputSelector));
    this._button = this._selectedForm.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._selectedForm.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

// Enabling validation, setting listeners

  enableValidation() {
    this._setEventListeners();
};

}

// Show error, change input

// function showInputError (form, input, errorMessage, settings) {
//   const error = form.querySelector(`.${input.id}-error`);
//   input.classList.add(settings.inputErrorClass);
//   error.classList.add(settings.errorClass);
//   error.textContent = errorMessage;
// };

// Hide error, change input

// function hideInputError (form, input, settings) {
//   const error = form.querySelector(`.${input.id}-error`);
//   input.classList.remove(settings.inputErrorClass);
//   error.classList.remove(settings.errorClass);
//   error.textContent = '';
// };

// Check inputs according to patterns

// function checkInputValidity(form, input, settings) {
//   if (input.validity.patternMismatch) {
//     input.setCustomValidity(input.dataset.errorMessage);
//   } else {
//     input.setCustomValidity('');
//   }
//   if (!input.validity.valid) {
//     showInputError(form, input, input.validationMessage, settings);
//   } else {
//     hideInputError(form, input, settings);
//   }
// }

// function hasInvalidInput (inputs) {
//   return inputs.some((input) => {
//     return !input.validity.valid;
//   });
// };

// Change submit button state if input valid/invalid

// function toggleButtonState (inputs, button, settings) {
//   if (hasInvalidInput(inputs)) {
//     button.disabled = true;
//     button.classList.add(settings.inactiveButtonClass);
//   } else {
//     button.disabled = false;
//     button.classList.remove(settings.inactiveButtonClass);
//   }
// };

// Setting listeners on forms and inputs

// function setEventListeners (form, settings) {
//   const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
//   const button = form.querySelector(settings.submitButtonSelector);
//   toggleButtonState(inputs, button, settings);
//   form.addEventListener('reset', () => {
//     setTimeout(() => {
//       toggleButtonState(inputs, button, settings);
//     }, 0);
//   });
//   inputs.forEach((input) => {
//     input.addEventListener('input', () => {
//       checkInputValidity(form, input, settings);
//       toggleButtonState(inputs, button, settings);
//     });
//   });
// };

// Enabling validation, setting listeners

// function enableValidation (settings) {
//   const forms = Array.from(document.querySelectorAll(settings.formSelector));
//   forms.forEach((form) => {
//     setEventListeners(form, settings);
//   });
// };

// export {
//   enableValidation
// };
