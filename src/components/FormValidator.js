export default class FormValidator {
  constructor(settings, selectedForm) {
    this._settings = settings;
    this._selectedForm = selectedForm;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._inputList = Array.from(selectedForm.querySelectorAll(this._inputSelector));
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
    return this._inputList.some((input) => {
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
    this._button = this._selectedForm.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._selectedForm.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach((input) => {
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

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

}
