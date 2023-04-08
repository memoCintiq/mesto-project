import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupBody.querySelector('.popup__form');
    this._inputs = this._popupBody.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popupBody.querySelector('.popup__save-button');
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
      this._renderLoading(true);

      this._handleFormSubmit(this._getInputValues())
      this.close();

      this._renderLoading(false);
      })
  }

  close() {
    super.close();
    this._formSelector.reset();
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = this._buttonSubmit.dataset.saving;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmit.dataset.save;
    }
  }
}
