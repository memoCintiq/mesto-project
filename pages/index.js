const cards = document.querySelector(".cards__items");
const template = document.querySelector("#cards__item").content;
const popupAll = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#profile');
const popupCreate = document.querySelector('#create');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileForm = document.querySelector('#profile-form');
const createForm = document.querySelector('#create-form');
const inputName = document.querySelector('#inputName');
const inputAbout = document.querySelector('#inputAbout');
const inputPlace = document.querySelector('#inputPlace');
const inputUrl = document.querySelector('#inputUrl');
const popupImage = document.querySelector('#image');
const popupPic = document.querySelector('.popup__picture');
const popupDesc = document.querySelector('.popup__description');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});

profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup(popupProfile);

  inputName.value = '';
  inputAbout.value = '';
});

addButton.addEventListener('click', function () {
  openPopup(popupCreate);
});

function createCard(name, link) {
  const card = template.querySelector('.cards__item').cloneNode(true);

  card.querySelector('.cards__image').alt = name;
  card.querySelector('.cards__image').src = link;
  card.querySelector('.cards__title').textContent = name;

  card.querySelector('.cards__image').addEventListener('click', function (e) {
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

createForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (inputPlace.value !== '' && inputUrl.value !== '') {
    addCard(createCard(inputPlace.value, inputUrl.value), cards);
  }
  closePopup(popupCreate);

  inputPlace.value = '';
  inputUrl.value = '';
});

for (let i = 0; i < initialCards.length; i++) {
  addCard(createCard(initialCards[i].name, initialCards[i].link), cards);
}
