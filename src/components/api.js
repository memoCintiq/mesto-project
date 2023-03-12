import { request } from './utils.js';

const settings = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: 'fc4830a2-99fd-4452-a8e2-34e875dbc10e',
    'Content-Type': 'application/json',
  },
};

// Get user profile

const getProfileRequest = () => {
  return request(`${settings.baseUrl}/users/me`, {
    method: 'GET',
    headers: settings.headers,
  });
};

// Change user profile

const setProfileRequest = (inputName, inputAbout) => {
  return request(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name: inputName,
      about: inputAbout,
    }),
  });
};

// Change user avatar

const changeAvatarRequest = (inputUrl) => {
  return request(`${settings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar: inputUrl,
    }),
  });
};

// Get cards

const getCardsRequest = () => {
  return request(`${settings.baseUrl}/cards`, {
    method: 'GET',
    headers: settings.headers,
  });
};

// Add and remove card

const addCardRequest = (inputTitle, inputUrl) => {
  return request(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      name: inputTitle,
      link: inputUrl,
    }),
  });
};

const removeCardRequest = (cardId) => {
  return request(`${settings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  });
};

// Set and remove like

const setLikeRequest = (cardId) => {
  return request(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settings.headers,
  });
};

const removeLikeRequest = (cardId) => {
  return request(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  });
};

export {
  settings,
  getProfileRequest,
  setProfileRequest,
  changeAvatarRequest,
  getCardsRequest,
  addCardRequest,
  removeCardRequest,
  setLikeRequest,
  removeLikeRequest,
};
