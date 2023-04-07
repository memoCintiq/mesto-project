import './pages/index.css';
import { settings, user } from './components/constants.js';
// import { openPopup, closePopup } from './components/Popup.js';
// import { enableValidation } from './components/FormValidator.js';
// import { renderLoading} from './components/utils';

import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Api from './components/Api.js';
import UserInfo from './components/UserInfo';
import Section from './components/Section';
import Card from './components/Card.js';

// Popups
const popupProfile = document.querySelector('#profile');
const popupCreate = document.querySelector('#create');
const popupAvatar = document.querySelector('#avatar');
const popupImage = document.querySelector('#image');

// Forms
const formProfile = document.querySelector('#profile-form');
const formAddCard = document.querySelector('#create-form');
const formChangeAvatar = document.querySelector('#avatar-form');


// Inputs
const inputName = formProfile.querySelector('#inputName');
const inputAbout = formProfile.querySelector('#inputAbout');
const inputPlace = formAddCard.querySelector('#inputPlace');
const inputUrl = formAddCard.querySelector('#inputUrl');
const inputAvatarUrl = formChangeAvatar.querySelector('#avatarUrl');

// Profile data
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar-image');

// Buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

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


const cardList = new Section({
  renderer: (item) => {
    const card = new Card(
      userId,
      {
        handleCardClick: handleImageClick,
        handleLikeClick: handleLikeClick,
        handleDeleteClick: handleDeleteClick
      },
      '.cards__item-template',
      item,
    );
    const cardElement = card.generate();

    cardList.addItem(cardElement);
  }
},
'.cards__items'
);

//Get data from server




const handleLikeClick = (cardId, isLiked) => {
  api.changeLikeRequest(cardId, isLiked);
};

const handleDeleteClick = (id) => {
  api.removeCardRequest(id);
};

const handleImageClick = (link, title) => {
  popupWithImage.open(link, title);
}

//   cartButton.addEventListener('click', function (evt) {
//     removeCardRequest(card._id)
//       .then(() => {
//         evt.target.closest('.cards__item').remove();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

// Handlers for editing profile and adding a card

// function handleFormProfile(evt) {
//   evt.preventDefault();
//   renderLoading(true, evt);
//   setProfileRequest(inputName.value, inputAbout.value)
//     .then((res) => {
//       profileName.textContent = res.name;
//       profileAbout.textContent = res.about;
//       closePopup(popupProfile);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(false, evt);
//     });
// }

// function handleFormAddCard(evt) {
//   evt.preventDefault();
//   renderLoading(true, evt);
//   addCardRequest(inputPlace.value, inputUrl.value)
//     .then((card) => {
//       addCard(createCard(card), cards);
//       closePopup(popupCreate);
//       evt.target.reset();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(false, evt);
//     });
// }

// const handleFormChangeAvatar = (evt) => {
//   evt.preventDefault();
//   renderLoading(true, evt);
//   changeAvatarRequest(inputAvatarUrl.value)
//     .then((res) => {
//       profileAvatar.src = res.avatar;
//       closePopup(popupAvatar);
//       evt.target.reset();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(false, evt);
//     });
// };

// Open popup for editing profile

// buttonOpenEditProfilePopup.addEventListener("click", function () {
//   inputName.value = profileName.textContent;
//   inputAbout.value = profileAbout.textContent;
//   openPopup(popupProfile);
// });

// // Open popup for adding card

// buttonOpenAddCardPopup.addEventListener("click", function () {
//   openPopup(popupCreate);
// });

// profileAvatar.addEventListener("click", function () {
//   openPopup(popupAvatar);
// });


// Submit buttons listeners+handlers



// formProfile.addEventListener("submit", handleFormProfile);

// formAddCard.addEventListener("submit", handleFormAddCard);

// formChangeAvatar.addEventListener("submit", handleFormChangeAvatar);

// Validation

// enableValidation(settings); - старый код

const formProfileValid = new FormValidator(settings, formProfile);
const formAddCardValid = new FormValidator(settings, formAddCard);
const formChangeAvatarValid = new FormValidator(settings, formChangeAvatar);

formProfileValid.enableValidation();
formAddCardValid.enableValidation();
formChangeAvatarValid.enableValidation();

// попап с картинкой

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// попап с редактированием профиля

const popupWithEditProfile = new PopupWithForm(popupProfile, {
  handleFormSubmit: ({userName, userAbout}) => {
    return api.setProfileRequest(userName, userAbout)
    .then((profile) => {
      userInfo.setUserInfo(profile);
    })
    .catch(err => {console.log(err)});
  }
})
popupWithEditProfile.setEventListeners();

// попап с редактированием аватара

const popupWithEditAvatar = new PopupWithForm(popupAvatar, {
  handleFormSubmit: ({userAvatar}) => {
    return api.changeAvatarRequest(userAvatar)
    .then((inputUrl) => {
      userInfo.setUserInfo(inputUrl);
    })
    .catch(err => {console.log(err)});
  }
})
popupWithEditAvatar.setEventListeners();

// попап с добавлением карточки

const popupWithAddCard = new PopupWithForm(popupCreate, {
  handleFormSubmit: ({name, link}) => {
    return api.addCardRequest(name, link)
    .then((card) => {

      cardList.addItem(item)
    })
  }
})

