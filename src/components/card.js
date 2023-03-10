import { initialCards } from '../components/constants.js';
import { createPopupImageZoom } from '../components/modal.js';

// Collecting cards

const cards = document.querySelector('.cards__items');

// Getting a card template

const templateCard = cards.querySelector('#cards__item-template').content;

// Create a new card

function createCard(link, title) {
    const cardsClone = templateCard
    .querySelector('.cards__item')
    .cloneNode(true);
  const cardImage = cardsClone.querySelector('.cards__image');
  const cardName = cardsClone.querySelector('.cards__title');
  const cartButton = cardsClone.querySelector('.cards__delete-button');

  cardImage.src = link;
  cardImage.alt = title;
  cardName.textContent = title;
  cardsClone
    .querySelector('.cards__like-button')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like-button_active');
    });

  cardsClone
    .querySelector('.cards__image')
    .addEventListener('click', function () {
      createPopupImageZoom(link, title);
    });

  cartButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    cardsClone.remove();
  });

  return cardsClone;
}

// Add a new card to the container

function addImage() {
  initialCards.forEach(function (item) {
    cards.append(createCard(item.link, item.name));
  });
}
addImage();

export {
  createCard
};
