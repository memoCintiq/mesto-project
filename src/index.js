import './pages/index.css';
import {
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
} from './utils/constants.js';

import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Api from './components/Api.js';
import UserInfo from './components/UserInfo';
import Section from './components/Section';
import Card from './components/Card.js';

const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: 'fc4830a2-99fd-4452-a8e2-34e875dbc10e',
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image'
});

let userId = '';

// Handlers for Card instances

const handleLikeClick = (card, isLiked) => {
  api.changeLikeRequest(card.id(), isLiked)
    .then((res) => card.setLikeInfo(res))
    .catch(rej => console.log(rej));
};

const handleDeleteClick = (card) => {
  api.removeCardRequest(card.id())
    .then(() => card.remove())
    .catch(rej => console.log(rej));
};

const handleImageClick = (link, title) => {
  popupWithImage.open(link, title);
};

// Creating Card instance and its markup

const createCard = (userId, cardData) => {
  const card = new Card(
      userId,
      {
        handleCardClick: handleImageClick,
        handleLikeClick: handleLikeClick,
        handleDeleteClick: handleDeleteClick
      },
      '#cards__item-template',
      cardData
    );
  const cardElement = card.generate();

  return cardElement;
}

// Creating Section instance for operating with markup

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(userId, item));
  }
},
'.cards__items'
);

//Get data from server

api.getAppInfo()
  .then(([ cardsArray, userData ]) => {

    userId = userData._id;

    userInfo.setUserInfo({
      userName: userData.name,
      userAbout: userData.about
    });
    userInfo.setUserAvatar({
      userAvatar: userData.avatar
    })

    cardList.renderItems(cardsArray);
  })
  .catch(rej => console.log(rej));

// Creating validators for each form

const formProfileValid = new FormValidator(settings, formProfile);
const formAddCardValid = new FormValidator(settings, formAddCard);
const formChangeAvatarValid = new FormValidator(settings, formChangeAvatar);

formProfileValid.enableValidation();
formAddCardValid.enableValidation();
formChangeAvatarValid.enableValidation();

// Попап с картинкой

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// Попап с редактированием профиля

const popupWithEditProfile = new PopupWithForm(popupProfileSelector, {
  handleFormSubmit: (formValues) => {
    popupWithEditProfile.renderLoading(true);
    api.setProfileRequest(formValues.name, formValues.about)
    .then((profile) => {
      userInfo.setUserInfo({ userName: profile.name, userAbout: profile.about});
      popupWithEditProfile.close();
    })
    .catch(err => {console.log(err)})
    .finally(() => popupWithEditProfile.renderLoading(false));
  }
});
popupWithEditProfile.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', () => {
  formProfileValid.resetValidation();
  const profile = userInfo.getUserInfo();
  popupWithEditProfile.setInputValues(profile);
  popupWithEditProfile.open();
})

// Попап с редактированием аватара

const popupWithEditAvatar = new PopupWithForm(popupAvatarSelector, {
  handleFormSubmit: (formValues) => {
    popupWithEditAvatar.renderLoading(true);
    api.changeAvatarRequest(formValues.avatarUrl)
    .then((res) => {
      userInfo.setUserAvatar({ userAvatar: res.avatar });
      popupWithEditAvatar.close();
    })
    .catch(err => {console.log(err)})
    .finally(() => popupWithEditAvatar.renderLoading(false));
  }
});
popupWithEditAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
  formChangeAvatarValid.resetValidation();
  popupWithEditAvatar.open();
})

// Попап с добавлением карточки

const popupWithAddCard = new PopupWithForm(popupCreateSelector, {
  handleFormSubmit: (formValues) => {
    popupWithAddCard.renderLoading(true);
    api.addCardRequest(formValues.place, formValues.url)
    .then((card) => {
      cardList.addItem(createCard(userId, card));
      popupWithAddCard.close();
    })
    .catch(err => {console.log(err)})
    .finally(() => popupWithAddCard.renderLoading(false));
  }
});
popupWithAddCard.setEventListeners();

buttonOpenAddCardPopup.addEventListener('click', () => {
  formAddCardValid.resetValidation();
  popupWithAddCard.open();
})
