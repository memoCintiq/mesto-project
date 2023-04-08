// import { user } from '../components/constants.js';
// import { createPopupImageZoom } from './Popup.js';
// import { removeCardRequest, setLikeRequest, removeLikeRequest } from './api.js';

// Getting a card template

export default class Card {
  constructor(userId, {handleCardClick, handleLikeClick, handleDeleteClick}, templateSelector, item) {
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._owner = item.owner;
    this._id = item._id;
  }

  _getElement() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._checkMyLike());
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    });

    this._cartButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id)
    });

  }

  _checkMyLike() {
    return this._likes.some(like => like._id === this._userId);
  }

  _checkLikes() {
    if (this._checkMyLike()) {
      this._likeButton.classList.add('cards__like-button_active');
      this._likeCounter.textContent = this._likes.length;
    } else {
      this._likeButton.classList.remove('cards__like-button_active');
      this._likeCounter.textContent = this._likes.length;
    }
  }

  _deleteElement() {
    this._element.remove();
  }

  generate() {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector('.cards__image');
    this._cardName = this._element.querySelector('.cards__title');
    this._cartButton = this._element.querySelector('.cards__delete-button');
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._likeCounter = this._element.querySelector('.cards__like-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    if (this._userId !== this._owner._id) {
      this._cartButton.remove();
    }

    this._checkLikes();

    this._setEventListeners();

    return this._element;

  }


}


// const templateCard = document.querySelector('#cards__item-template').content;

// const hideCartButton = (owner, button) => {
//   if (user.id !== owner) {
//     button.remove();
//   }
// };

// // Check and set my user like
// const checkMyLike = (likes, button) => {
//   likes.forEach((like) => {
//     if (like.name === user.name) {
//       button.classList.add('cards__like-button_active');
//     }
//   });
// };

// // Check and set likes
// const checkLikes = (likes, counter) => {
//   if (likes.length > 0) {
//     counter.classList.add('cards__like-counter_active');
//     counter.textContent = likes.length;
//   } else {
//     counter.classList.remove('cards__like-counter_active');
//     counter.textContent = '';
//   }
// };

// Create a new card

// function createCard(card) {
//   const cardsClone = templateCard
//     .querySelector('.cards__item')
//     .cloneNode(true);
//   const cardImage = cardsClone.querySelector('.cards__image');
//   const cardName = cardsClone.querySelector('.cards__title');
//   const cartButton = cardsClone.querySelector('.cards__delete-button');
//   const likeButton = cardsClone.querySelector('.cards__like-button');
//   const likeCounter = cardsClone.querySelector('.cards__like-counter');

//   cardImage.src = card.link;
//   cardImage.alt = card.name;
//   cardName.textContent = card.name;

//   cardsClone
//     .querySelector('.cards__image')
//     .addEventListener('click', function () {
//       createPopupImageZoom(card.link, card.name);
//     });

//   cartButton.addEventListener('click', function (evt) {
//     removeCardRequest(card._id)
//       .then(() => {
//         evt.target.closest('.cards__item').remove();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   likeButton.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('cards__like-button_active')) {
//       removeLikeRequest(card._id)
//         .then((card) => {
//           checkLikes(card.likes, likeCounter);
//           checkMyLike(card.likes, evt.target);
//           evt.target.classList.remove('cards__like-button_active');
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       setLikeRequest(card._id)
//         .then((card) => {
//           checkLikes(card.likes, likeCounter);
//           checkMyLike(card.likes, evt.target);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });

//   checkLikes(card.likes, likeCounter);
//   checkMyLike(card.likes, likeButton);
//   hideCartButton(card.owner._id, cartButton);

//   return cardsClone;
// }

// // Add a new card to the container

// const addCard = (card, container) => {
//   container.prepend(card);
// };

// // Put cards from list to container
// const addCardList = (cards, container) => {
//   cards.reverse().forEach((card) => {
//     const item = createCard(card);
//     addCard(item, container);
//   });
// };

// export {
//   createCard,
//   addCard,
//   addCardList
// };
