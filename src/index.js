import './pages/index.css';
import { settings } from './components/constants.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { createCard } from './components/card.js';

// Popups
const popupProfile = document.querySelector('#profile');  // Есть ли смысл выносить переменные из файлов в один constants/variables, а затем просто импортировать их?
const popupCreate = document.querySelector('#create');

// Forms
const formProfile = document.querySelector('#profile-form');
const formAddCard = document.querySelector('#create-form');

// Inputs
const inputName = formProfile.querySelector('#inputName');
const inputAbout = formProfile.querySelector('#inputAbout');
const inputPlace = formAddCard.querySelector('#inputPlace');
const inputUrl = formAddCard.querySelector('#inputUrl');

// Profile data
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// Buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

// List of cards
const cards = document.querySelector('.cards__items');


// Handlers for editing profile and adding a card

function handleFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
}

function handleFormAddCard(evt) {
  evt.preventDefault();
  const title = inputPlace.value;
  const link = inputUrl.value;
  cards.prepend(createCard(link, title));
  evt.target.reset();
  closePopup(popupCreate);
}

// Open popup for editing profile

buttonOpenEditProfilePopup.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
});

// Open popup for adding card

buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupCreate);
});


// Submit buttons listeners+handlers

formProfile.addEventListener("submit", handleFormProfile);

formAddCard.addEventListener("submit", handleFormAddCard);

// Validation

enableValidation(settings);
