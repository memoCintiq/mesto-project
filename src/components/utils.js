const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const renderLoading = (isLoading, evt) => {
  const button = evt.target.querySelector('.popup__save-button');
  if (isLoading) {
    button.textContent = button.dataset.saving;
  } else {
    button.textContent = button.dataset.save;
  }
};

export {
  checkResponse,
  request,
  renderLoading
}
