

let butEdit = document.querySelector(".profile__button");
let popup = document.querySelector(".popup");
let butClose = document.querySelector(".popup__button_close");
let form = document.querySelector(".popup__container");

let inName = document.querySelector(".profile__title");
let inAbout = document.querySelector(".profile__subtitle");

let inputName = document.querySelector(".popup__input_name");
let inputAbout = document.querySelector(".popup__input_about");

function openEdit() {
  inputName.value = inName.textContent;
  inputAbout.value = inAbout.textContent;
  popup.classList.add("popup_opened");
}

function closeEdit() {
  popup.classList.remove("popup_opened");
}

butEdit.addEventListener("click", openEdit);
butClose.addEventListener("click", closeEdit);

function saveChange(event) {
  event.preventDefault();
  inName.textContent = inputName.value;
  inAbout.textContent = inputAbout.value;
  closeEdit();
}

form.addEventListener("submit", saveChange);
