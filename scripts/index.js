import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl:"https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "4836727-99c8-47d4-bb78-b7226e0efb6d",
    "Content-Type": "application/json"
  }
});



const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Elementos del DOM
const profileEditButton = document.querySelector(".profile__button");
const profileAddButton = document.querySelector(".profile__button-add");
const popupTitle = document.querySelector(".popup__subtitle");
const inputName = document.querySelector(".popup__input_name");
const inputAbout = document.querySelector(".popup__input_about");
const saveButton = document.querySelector(".popup__button_save");
const addButton = document.querySelector(".popup__button_add");

// Crear instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle"
});

// Crear instancia de PopupWithImage
const imagePopup = new PopupWithImage(".popup");
imagePopup.setEventListeners();

// Función para crear tarjeta
function createCard(cardData) {
  const card = new Card(cardData, "#element-template", (name, link) => {
    imagePopup.open(link, name);
  });
  return card.generateCard();
}

// Crear instancia de Section
let cardSection;

// Renderizar tarjetas iniciales
cardSection.renderItems();

// Variable para saber qué modo está activo
let currentMode = null;

// Crear instancia de PopupWithForm
const formPopup = new PopupWithForm(".popup", (formData) => {
  if (currentMode === "edit") {
    // Modo editar perfil
    userInfo.setUserInfo({ name: formData.name, job: formData.about });
  } else if (currentMode === "add") {
    // Modo agregar lugar
    const cardElement = createCard({ name: formData.name, link: formData.about });
    cardSection.addItem(cardElement);
  }
  formPopup.close();
});

formPopup.setEventListeners();

// Crear validador
const formValidator = new FormValidator(validationConfig, document.querySelector(".popup__container"));
formValidator.enableValidation();

// Event listener para abrir popup de EDITAR PERFIL
profileEditButton.addEventListener("click", () => {
  currentMode = "edit";

  const currentUserInfo = userInfo.getUserInfo();

  // Configurar el popup para modo editar
  popupTitle.textContent = "Editar perfil";
  inputName.value = currentUserInfo.name;
  inputAbout.value = currentUserInfo.job;
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mí";

  // Configurar atributos de validación
  inputName.setAttribute("minlength", "2");
  inputName.setAttribute("maxlength", "40");
  inputAbout.setAttribute("minlength", "2");
  inputAbout.setAttribute("maxlength", "200");

  // Mostrar botón correcto
  saveButton.style.display = "block";
  addButton.style.display = "none";

  // Limpiar validaciones
  inputName.setCustomValidity("");
  inputAbout.setCustomValidity("");
  formValidator.resetValidation();

  formPopup.open();
});

// Event listener para abrir popup de AGREGAR LUGAR
profileAddButton.addEventListener("click", () => {
  currentMode = "add";

  // Configurar el popup para modo agregar
  popupTitle.textContent = "Nuevo lugar";
  inputName.value = "";
  inputAbout.value = "";
  inputName.placeholder = "Título";
  inputAbout.placeholder = "Enlace a la imagen";

  // Configurar atributos de validación
  inputName.setAttribute("minlength", "2");
  inputName.setAttribute("maxlength", "30");
  inputAbout.removeAttribute("minlength");
  inputAbout.removeAttribute("maxlength");

  // Mostrar botón correcto
  saveButton.style.display = "none";
  addButton.style.display = "block";

  // Limpiar validaciones
  inputName.setCustomValidity("");
  inputAbout.setCustomValidity("");
  formValidator.resetValidation();

  formPopup.open();
});

// Event listener para el botón de agregar
addButton.addEventListener("click", () => {
  const newCardData = {
    name: inputName.value,
    link: inputAbout.value
  };

  const cardElement = createCard(newCardData);
  cardSection.addItem(cardElement);
  formPopup.close();
});
