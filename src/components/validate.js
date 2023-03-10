// Show error, change input

function showInputError (form, input, errorMessage, settings) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.classList.add(settings.errorClass);
  error.textContent = errorMessage;
};

// Hide error, change input

function hideInputError (form, input, settings) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.errorClass);
  error.textContent = '';
};

// Check inputs according to patterns

function checkInputValidity(form, input, settings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
}
function hasInvalidInput (inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

// Change submit button state if input valid/invalid

function toggleButtonState (inputs, button, settings) {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  }
};

// Setting listeners on forms and inputs

function setEventListeners (form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, button, settings);
  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputs, button, settings);
    }, 0);
  });
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
};

// Enabling validation, setting listeners

function enableValidation (settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, settings);
  });
};

export {
  enableValidation
};
