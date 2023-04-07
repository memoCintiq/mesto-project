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

  setUserInfo({ userName, userAbout }) {
    this._userName.textContent = userName;
    this._userAbout.textContent = userAbout;
  }

  setUserAvatar({ userAvatar }) {
    this._userAvatar.src = userAvatar;
  }
}
