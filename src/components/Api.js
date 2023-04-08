export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }


  getAppInfo() {
    return Promise.all([this.getCardsRequest(), this.getProfileRequest()]);
  }

  // Get user profile

  getProfileRequest() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  // Change user profile

  setProfileRequest(inputName, inputAbout) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputName,
        about: inputAbout,
      }),
    });
  }

  // Change user avatar

  changeAvatarRequest(inputUrl) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputUrl,
      }),
    });
  }

  // Get cards

  getCardsRequest() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  // Add and remove card

  addCardRequest(inputTitle, inputUrl) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputTitle,
        link: inputUrl,
      }),
    });
  }

  removeCardRequest(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // Set and remove like

  changeLikeRequest(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    });
  }

}
