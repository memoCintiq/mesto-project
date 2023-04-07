export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo({ userName, userAbout }, handleNewUserInfo) {
    this._userName = userName;
    this._userAbout = userAbout;

    //Обработчик, отправляющий новые значения полей "Имя" и "О себе" на сервер
    handleNewUserInfo();
  }

  setUserAvatar({ userAvatar }, handleNewUserAvatar) {
    this._userAvatar = userAvatar;

    //Обработчик, отправляющий новую ссылку на аватар пользователя на сервер
    handleNewUserAvatar();
  }
}
