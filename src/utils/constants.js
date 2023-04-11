const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Popups
const popupProfileSelector = '#profile';
const popupCreateSelector = '#create';
const popupAvatarSelector = '#avatar';
const popupImageSelector = '#image';

// Forms
const formProfile = document.querySelector('#profile-form');
const formAddCard = document.querySelector('#create-form');
const formChangeAvatar = document.querySelector('#avatar-form');

// Profile data
const profileAvatar = document.querySelector('.profile__avatar-image');

// Buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

export {
  settings,
  popupProfileSelector,
  popupCreateSelector,
  popupAvatarSelector,
  popupImageSelector,
  formProfile,
  formAddCard,
  formChangeAvatar,
  profileAvatar,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
}
