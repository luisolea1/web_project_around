// index.js

import Card from "./card.js";
import FormValidator from "./formvalidator.js";
import { openPopup, closePopup, closePopupOnEscape, closePopupOnOverlayClick } from "./utils.js";

// Datos iniciales de las tarjetas
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

// Configuración de validación
const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Elementos del DOM
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

// Crear instancias de FormValidator
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

// Event listeners
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

// Escuchar evento personalizado de las tarjetas para abrir imagen
document.addEventListener("openImagePopup", (evt) => {
  openImagePopup(evt.detail.link, evt.detail.name);
});

// Inicializar
initializeCards();

























/*document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM cargado");


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


  const elementsContainer = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#element-template");


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

const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

  function createCard(cardData) {
    const cardElement = elementTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__place-name");
    const likeButton = cardElement.querySelector(".element__button-like");
    const deleteButton = cardElement.querySelector(".element__button-delete");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;


    likeButton.addEventListener("click", function() {
      toggleLike(this);
    });

    deleteButton.addEventListener("click", function() {
      deleteCard(this);
    });

    cardImage.addEventListener("click", function() {
      openImagePopup(cardData.link, cardData.name);
    });

    return cardElement;
  }


  function addCard(cardData, prepend = false) {
    const cardElement = createCard(cardData);
    if (prepend) {
      elementsContainer.prepend(cardElement);
    } else {
      elementsContainer.appendChild(cardElement);
    }
  }


  function toggleLike(button) {
    button.classList.toggle("element__button-like_active");
  }


  function deleteCard(button) {
    const card = button.closest(".element");
    card.style.transform = "scale(0.8)";
    card.style.opacity = "0";
    card.style.transition = "all 0.3s ease";

    setTimeout(function() {
      card.remove();
    }, 300);
  }


  function openEditPopup() {
  console.log("Abriendo popup de edición");

  popupContainer.style.display = "block";
  popupImages.style.display = "none";
  popupSaveButton.style.display = "block";
  popupAddButton.style.display = "none";

  popupTitle.textContent = "Editar perfil";
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  inputName.placeholder = "Nombre";
  inputAbout.placeholder = "Acerca de mí";

  // Restaurar atributos de validación para el modo "Editar perfil"
  inputName.setAttribute("minlength", "2");
  inputName.setAttribute("maxlength", "40");
  inputAbout.setAttribute("minlength", "2");
  inputAbout.setAttribute("maxlength", "200");

  inputName.setCustomValidity("");
  inputAbout.setCustomValidity("");

  resetValidation(popupContainer, validationConfig);

  popup.classList.add("popup_opened");
}

  function openAddPopup() {
  console.log("Abriendo popup de agregar");

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

  resetValidation(popupContainer, validationConfig);

  popup.classList.add("popup_opened");
}


  function openImagePopup(imageSrc, imageAlt) {
    console.log("Abriendo imagen ampliada");


    popupContainer.style.display = "none";
    popupImages.style.display = "flex";


    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupImageCaption.textContent = imageAlt;

    popup.classList.add("popup_opened");
  }

  function closePopup() {
    console.log("Cerrando popup");
    popup.classList.remove("popup_opened");

    setTimeout(function() {
      popupContainer.style.display = "none";
      popupImages.style.display = "none";
    }, 300);
  }

function saveProfileChanges(event) {
  event.preventDefault();
  console.log("Guardando cambios del perfil");

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

  function addNewCard() {
    console.log("Agregando nueva tarjeta");

    const newCardData = {
      name: inputName.value,
      link: inputAbout.value
    };

    addCard(newCardData, true);
    closePopup();
  }

  function validateAddButton() {
    const isValid = inputName.value.trim() !== "" && inputAbout.value.trim() !== "";
    popupAddButton.disabled = !isValid;
  }


  function initializeCards() {
    console.log("Inicializando tarjetas...");
    initialCards.forEach(function(cardData) {
      addCard(cardData);
    });
  }


  profileEditButton.addEventListener("click", openEditPopup);
  profileAddButton.addEventListener("click", openAddPopup);
  popupCloseButton.addEventListener("click", closePopup);
  popupContainer.addEventListener("submit", saveProfileChanges);
  popupAddButton.addEventListener("click", addNewCard);


  popup.addEventListener("click", function(event) {
    if (event.target === popup) {
      closePopup();
    }
  });


  popupContainer.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  popupImages.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  enableValidation(validationConfig);
  initializeCards();
});*/