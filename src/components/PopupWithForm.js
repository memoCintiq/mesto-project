import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector('.popup__form');
    
    this._buttonSubmit = this._popupSelector.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputs = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputs._forEach(input => {this._formValues[input.name] = input.value});
    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
      .then(() => {
        this.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.renderLoading(false);
      })
    })
  }

  close() {
    super.close();
    this._formSelector.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = this._buttonSubmit.dataset.saving;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmit.dataset.save;
    }
  }
}