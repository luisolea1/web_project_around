import Card from "./card.js";
import FormValidator from "./formvalidator.js";
import { openPopup, closePopup, closePopupOnEscape, closePopupOnOverlayClick } from "./utils.js";


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

const elementsContainer = document.querySelector(".elements");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const popupImages = document.querySelector(".popup__images");
const popupCloseButton = document.querySelector(".popup__button_close");
const popupTitle = document.querySelector(".popup__subtitle");
const popupSaveButton = document.querySelector(".popup__button_save");
const popupAddButton = document.querySelector(".popup__button_add");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__paragraph");

const profileEditButton = document.querySelector(".profile__button");
const profileAddButton = document.querySelector(".profile__button-add");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");

const inputName = document.querySelector(".popup__input_name");
const inputAbout = document.querySelector(".popup__input_about");

const editFormValidator = new FormValidator(validationConfig, popupContainer);
editFormValidator.enableValidation();

// Función para crear y agregar tarjeta
function createCard(cardData) {
  const card = new Card(cardData, "#element-template");
  const cardElement = card.generateCard();
  return cardElement;
}

// Función para agregar tarjeta al DOM
function addCard(cardData, prepend = false) {
  const cardElement = createCard(cardData);
  if (prepend) {
    elementsContainer.prepend(cardElement);
  } else {
    elementsContainer.appendChild(cardElement);
  }
}

// Función para abrir popup de editar perfil
function openEditPopup() {
  popupContainer.style.display = "block";
  popupImages.style.display = "none";
  popupSaveButton.style.display = "block";
  popupAddButton.style.display = "none";

  popupTitle.textContent = "Editar perfil";
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mí";

  inputName.setAttribute("minlength", "2");
  inputName.setAttribute("maxlength", "40");
  inputAbout.setAttribute("minlength", "2");
  inputAbout.setAttribute("maxlength", "200");

  inputName.setCustomValidity("");
  inputAbout.setCustomValidity("");

  editFormValidator.resetValidation();

  openPopup(popup);
}

// Función para abrir popup de agregar lugar
function openAddPopup() {
  popupContainer.style.display = "block";
  popupImages.style.display = "none";
  popupSaveButton.style.display = "none";
  popupAddButton.style.display = "block";

  popupTitle.textContent = "Nuevo lugar";
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

  openPopup(popup);
}

// Función para abrir popup de imagen
function openImagePopup(imageSrc, imageAlt) {
  popupContainer.style.display = "none";
  popupImages.style.display = "flex";

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupImageCaption.textContent = imageAlt;

  openPopup(popup);
}

// Función para guardar cambios del perfil
function saveProfileChanges(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popup);
}

// Función para agregar nueva tarjeta
function addNewCard() {
  const newCardData = {
    name: inputName.value,
    link: inputAbout.value
  };

  addCard(newCardData, true);
  closePopup(popup);
}

// Función para inicializar tarjetas
function initializeCards() {
  initialCards.forEach((cardData) => {
    addCard(cardData);
  });
}

profileEditButton.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
popupCloseButton.addEventListener("click", () => closePopup(popup));
popupContainer.addEventListener("submit", saveProfileChanges);
popupAddButton.addEventListener("click", addNewCard);

popup.addEventListener("click", (evt) => {
  closePopupOnOverlayClick(evt, popup);
});

popupContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

popupImages.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("openImagePopup", (evt) => {
  openImagePopup(evt.detail.link, evt.detail.name);
});

initializeCards();