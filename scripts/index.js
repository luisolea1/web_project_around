import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const profileEditButton = document.querySelector(".profile__button");
const profileAddButton = document.querySelector(".profile__button-add");
const inputName = document.querySelector(".popup__input_name");
const inputAbout = document.querySelector(".popup__input_about");
const popupContainerEdit = document.querySelector(".popup__container");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle"
});

const imagePopup = new PopupWithImage(".popup");
imagePopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, "#element-template", (name, link) => {
    imagePopup.open(link, name);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.appendItem(cardElement);
    }
  },
  ".elements"
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm(".popup", (formData) => {
  userInfo.setUserInfo({ name: formData.name, job: formData.about });
  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, popupContainerEdit);
editFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  document.querySelector(".popup__container").style.display = "block";
  document.querySelector(".popup__images").style.display = "none";
  document.querySelector(".popup__button_save").style.display = "block";
  document.querySelector(".popup__button_add").style.display = "none";
  document.querySelector(".popup__subtitle").textContent = "Editar perfil";

  inputName.value = currentUserInfo.name;
  inputAbout.value = currentUserInfo.job;
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mí";

  inputName.setAttribute("minlength", "2");
  inputName.setAttribute("maxlength", "40");
  inputAbout.setAttribute("minlength", "2");
  inputAbout.setAttribute("maxlength", "200");

  inputName.setCustomValidity("");
  inputAbout.setCustomValidity("");
  editFormValidator.resetValidation();

  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  document.querySelector(".popup__container").style.display = "block";
  document.querySelector(".popup__images").style.display = "none";
  document.querySelector(".popup__button_save").style.display = "none";
  document.querySelector(".popup__button_add").style.display = "block";
  document.querySelector(".popup__subtitle").textContent = "Nuevo lugar";

  inputName.value = "";
  inputAbout.value = "";
  inputName.placeholder = "Título";
  inputAbout.placeholder = "Enlace a la imagen";

  inputName.setAttribute("minlength", "2");
  inputName.setAttribute("maxlength", "30");
  inputAbout.removeAttribute("minlength");
  inputAbout.removeAttribute("maxlength");

  inputName.setCustomValidity("");
  inputAbout.setCustomValidity("");
  editFormValidator.resetValidation();

  editProfilePopup.open();
});

document.querySelector(".popup__button_add").addEventListener("click", () => {
  const newCardData = {
    name: inputName.value,
    link: inputAbout.value
  };

  const cardElement = createCard(newCardData);
  cardSection.addItem(cardElement);
  editProfilePopup.close();
});