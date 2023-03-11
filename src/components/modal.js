const popupImageZoom = document.querySelector('#image');
const buttonCloseList = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const popupPic = document.querySelector('.popup__picture');
const popupDisc = document.querySelector('.popup__description');

// Gotta go bigger, zooming card's pictures

function createPopupImageZoom(link, title) {
  popupPic.alt = title;
  popupPic.src = link;
  popupDisc.textContent = title;
  openPopup(popupImageZoom);
}
// Functions for opening and closing popups

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopupMousedown(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// Setting listenters on popups

popups.forEach(function(popup) {
  popup.addEventListener('mousedown', closePopupMousedown);
});

// Setting listeners on close buttons

buttonCloseList.forEach(function(button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function() {
    closePopup(popup);
  });
});

export {
  openPopup,
  closePopup,
  createPopupImageZoom
};
