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
      this._handleLikeClick(this, this._checkMyLike());
      this._switchLikeButtonState();
      this._switchLikeCounterState();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    });

    this._cartButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id)
      this._deleteElement();
    });
  }

  _checkMyLike() {
    return this._likes.some(like => like._id === this._userId);
  }

  _checkLikes() {
    return this._likes.length;
  }

  _switchLikeButtonState() {
    this._checkMyLike()
      ? this._likeButton.classList.add('cards__like-button_active')
      : this._likeButton.classList.remove('cards__like-button_active');
  }

  _switchLikeCounterState() {
    this._checkLikes() > 0
      ? ( this._likeCounter.classList.add('cards__like-counter_active'),
          this._likeCounter.textContent = this._likes.length )
      : ( this._likeCounter.classList.remove('cards__like-counter_active'),
          this._likeCounter.textContent = '');
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

    this._switchLikeCounterState();
    this._switchLikeButtonState();
    this._setEventListeners();

    return this._element;
  }

  id() {
    return this._id;
  }

  setLikeInfo(res) {
    this._likes = res.likes;
    this._switchLikeButtonState();
    this._switchLikeCounterState();
  }
}
