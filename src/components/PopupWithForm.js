import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupBody.querySelector('.popup__form');
    this._inputs = this._popupBody.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popupBody.querySelector('.popup__save-button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach(input => {this._formValues[input.name] = input.value});
    return this._formValues;
  }

  setInputValues(formValues) {
  this._inputs.forEach((input) => {
    input.value = formValues[input.name]
  })
}

  setEventListeners(){
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      })
  }

  close() {
    super.close();
    this._formSelector.reset();
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}
