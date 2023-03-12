(()=>{"use strict";var e={id:"",name:""},t=document.querySelector("#image"),n=document.querySelectorAll(".popup__close-button"),r=document.querySelectorAll(".popup"),o=document.querySelector(".popup__picture"),c=document.querySelector(".popup__description");function a(e){e.classList.add("popup_opened"),document.addEventListener("keydown",u)}function i(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_opened"))}function s(e){e.target.classList.contains("popup_opened")&&i(e.target)}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}r.forEach((function(e){e.addEventListener("mousedown",s)})),n.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){i(t)}))}));var d=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},f=function(e,t){return fetch(e,t).then(d)},p=function(e,t){var n=t.target.querySelector(".popup__save-button");n.textContent=e?n.dataset.saving:n.dataset.save},m={baseUrl:"https://nomoreparties.co/v1/plus-cohort-20",headers:{authorization:"fc4830a2-99fd-4452-a8e2-34e875dbc10e","Content-Type":"application/json"}},v=function(){return f("".concat(m.baseUrl,"/cards"),{method:"GET",headers:m.headers})},_=function(e){return f("".concat(m.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:m.headers})},y=function(e){return f("".concat(m.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:m.headers})},h=function(e){return f("".concat(m.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:m.headers})},S=document.querySelector("#cards__item-template").content,b=function(t,n){e.id!==t&&n.remove()},q=function(t,n){t.forEach((function(t){t.name===e.name&&n.classList.add("cards__like-button_active")}))},g=function(e,t){e.length>0?(t.classList.add("cards__like-counter_active"),t.textContent=e.length):(t.classList.remove("cards__like-counter_active"),t.textContent="")};function E(e){var n=S.querySelector(".cards__item").cloneNode(!0),r=n.querySelector(".cards__image"),i=n.querySelector(".cards__title"),u=n.querySelector(".cards__delete-button"),s=n.querySelector(".cards__like-button"),l=n.querySelector(".cards__like-counter");return r.src=e.link,r.alt=e.name,i.textContent=e.name,n.querySelector(".cards__image").addEventListener("click",(function(){var n,r;n=e.link,r=e.name,o.alt=r,o.src=n,c.textContent=r,a(t)})),u.addEventListener("click",(function(t){_(e._id).then((function(){t.target.closest(".cards__item").remove()})).catch((function(e){console.log(e)}))})),s.addEventListener("click",(function(t){t.target.classList.contains("cards__like-button_active")?h(e._id).then((function(e){g(e.likes,l),q(e.likes,t.target),t.target.classList.remove("cards__like-button_active")})).catch((function(e){console.log(e)})):y(e._id).then((function(e){g(e.likes,l),q(e.likes,t.target)})).catch((function(e){console.log(e)}))})),g(e.likes,l),q(e.likes,s),b(e.owner._id,u),n}var L=function(e,t){t.prepend(e)};function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var C,A=document.querySelector("#profile"),x=document.querySelector("#create"),U=document.querySelector("#avatar"),T=document.querySelector("#profile-form"),j=document.querySelector("#create-form"),w=document.querySelector("#avatar-form"),O=T.querySelector("#inputName"),P=T.querySelector("#inputAbout"),B=j.querySelector("#inputPlace"),D=j.querySelector("#inputUrl"),N=w.querySelector("#avatarUrl"),M=document.querySelector(".profile__name"),I=document.querySelector(".profile__about"),J=document.querySelector(".profile__avatar-image"),G=document.querySelector(".profile__edit-button"),H=document.querySelector(".profile__add-button"),V=document.querySelector(".cards__items");Promise.all([f("".concat(m.baseUrl,"/users/me"),{method:"GET",headers:m.headers}),v()]).then((function(t){var n,r,o=(n=t,r=1,function(e){if(Array.isArray(e))return e}(n)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];M.textContent=o.name,I.textContent=o.about,J.src=o.avatar,e.id=o._id,e.name=o.name})).then((function(){v().then((function(e){!function(e,t){e.reverse().forEach((function(e){var n=E(e);L(n,t)}))}(e,V)}))})).catch((function(e){console.log(e)})),G.addEventListener("click",(function(){O.value=M.textContent,P.value=I.textContent,a(A)})),H.addEventListener("click",(function(){a(x)})),J.addEventListener("click",(function(){a(U)})),T.addEventListener("submit",(function(e){e.preventDefault(),p(!0,e),function(e,t){return f("".concat(m.baseUrl,"/users/me"),{method:"PATCH",headers:m.headers,body:JSON.stringify({name:e,about:t})})}(O.value,P.value).then((function(e){M.textContent=e.name,I.textContent=e.about,i(A)})).catch((function(e){console.log(e)})).finally((function(){p(!1,e)}))})),j.addEventListener("submit",(function(e){e.preventDefault(),p(!0,e),function(e,t){return f("".concat(m.baseUrl,"/cards"),{method:"POST",headers:m.headers,body:JSON.stringify({name:e,link:t})})}(B.value,D.value).then((function(t){L(E(t),V),i(x),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){p(!1,e)}))})),w.addEventListener("submit",(function(e){e.preventDefault(),p(!0,e),function(e){return f("".concat(m.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:m.headers,body:JSON.stringify({avatar:e})})}(N.value).then((function(t){J.src=t.avatar,i(U),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){p(!1,e)}))})),C={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(C.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),e.addEventListener("reset",(function(){setTimeout((function(){l(n,r,t)}),0)})),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(e,C)}))})();