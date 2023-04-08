import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = this._popupBody.querySelector('.popup__picture');
    this._popupDisc = this._popupBody.querySelector('.popup__description');
  }

  open(link, title) {
    this._popupPic.alt = title;
    this._popupPic.src = link;
    this._popupDisc.textContent = title;
    super.open();
  }
}
