const cards = document.querySelector(".cards__items");
const template = document.querySelector("#cards__item").content;
const popupAll = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#profile');
const popupCreate = document.querySelector('#create');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileForm = document.querySelector('#profile-form');
const formAddCard = document.querySelector('#create-form');
const inputName = document.querySelector('#inputName');
const inputAbout = document.querySelector('#inputAbout');
const inputPlace = document.querySelector('#inputPlace');
const inputUrl = document.querySelector('#inputUrl');
const popupImage = document.querySelector('#image');
const popupPic = document.querySelector('.popup__picture');
const popupDesc = document.querySelector('.popup__description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupAll.forEach(function (popup) {
  popup.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup__close-button') || e.target.classList.contains('popup')) {
      closePopup(e.target.closest('.popup'));
    }
  })
})

buttonOpenEditProfilePopup.addEventListener('click', function () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup(popupProfile);
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  openPopup(popupCreate);
});

function createCard(name, link) {
  const card = template.querySelector('.cards__item').cloneNode(true);
  let cardImage = card.querySelector('.cards__image');

  cardImage.alt = name;
  cardImage.src = link;
  card.querySelector('.cards__title').textContent = name;

  cardImage.addEventListener('click', function (e) {
    popupPic.src = link;
    popupPic.alt = name;
    popupDesc.textContent = name;
    openPopup(popupImage);
  });
  card.querySelector('.cards__like-button').addEventListener('click', function (e) {
    e.target.classList.toggle('cards__like-button_active');
  });
  card.querySelector('.cards__delete-button').addEventListener('click', function (e) {
    e.target.closest('.cards__item').remove();
  });

  return card;
}

function addCard(card, container) {
  container.prepend(card);
}

formAddCard.addEventListener('submit', function (e) {
  e.preventDefault();
  if (inputPlace.value !== '' && inputUrl.value !== '') {
    addCard(createCard(inputPlace.value, inputUrl.value), cards);
  }
  closePopup(popupCreate);

  formAddCard.reset();
});

initialCards.forEach((card) => {
  addCard(createCard(card.name, card.link), cards);
})

