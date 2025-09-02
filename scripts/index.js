

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM cargado");

  // FUNCIONALIDAD DE TARJETAS: Datos iniciales
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

  // Seleccionar elementos del DOM
  const elementsContainer = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#element-template");

  // Elementos del popup unificado
  const popup = document.querySelector(".popup");
  const popupContainer = document.querySelector(".popup__container");
  const popupImages = document.querySelector(".popup__images");
  const popupCloseButton = document.querySelector(".popup__button_close");
  const popupTitle = document.querySelector(".popup__subtitle");
  const popupSaveButton = document.querySelector(".popup__button_save");
  const popupAddButton = document.querySelector(".popup__button_add");
  const popupImage = document.querySelector(".popup__image");
  const popupImageCaption = document.querySelector(".popup__paragraph");

  // Elementos del perfil
  const profileEditButton = document.querySelector(".profile__button");
  const profileAddButton = document.querySelector(".profile__button-add");
  const profileName = document.querySelector(".profile__title");
  const profileAbout = document.querySelector(".profile__subtitle");

  // Inputs del popup
  const inputName = document.querySelector(".popup__input_name");
  const inputAbout = document.querySelector(".popup__input_about");

  // Función para crear una tarjeta usando el template
  function createCard(cardData) {
    const cardElement = elementTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__place-name");
    const likeButton = cardElement.querySelector(".element__button-like");
    const deleteButton = cardElement.querySelector(".element__button-delete");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Event listeners
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

  // Función para agregar tarjeta al DOM
  function addCard(cardData, prepend = false) {
    const cardElement = createCard(cardData);
    if (prepend) {
      elementsContainer.prepend(cardElement);
    } else {
      elementsContainer.appendChild(cardElement);
    }
  }

  // Función para el toggle de like
  function toggleLike(button) {
    button.classList.toggle("element__button-like_active");
  }

  // Función para eliminar tarjeta
  function deleteCard(button) {
    const card = button.closest(".element");
    card.style.transform = "scale(0.8)";
    card.style.opacity = "0";
    card.style.transition = "all 0.3s ease";

    setTimeout(function() {
      card.remove();
    }, 300);
  }

  // Función para abrir popup de edición
  function openEditPopup() {
    console.log("Abriendo popup de edición");

    // Configurar el popup para edición
    popupContainer.style.display = "block";
    popupImages.style.display = "none";
    popupSaveButton.style.display = "block";
    popupAddButton.style.display = "none";

    // Configurar contenido
    popupTitle.textContent = "Editar perfil";
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
    inputName.placeholder = "Nombre";
    inputAbout.placeholder = "Acerca de mí";

    // Abrir popup
    popup.classList.add("popup_opened");
  }

  // Función para abrir popup de agregar
  function openAddPopup() {
    console.log("Abriendo popup de agregar");

    // Configurar el popup para agregar
    popupContainer.style.display = "block";
    popupImages.style.display = "none";
    popupSaveButton.style.display = "none";
    popupAddButton.style.display = "block";

    // Configurar contenido
    popupTitle.textContent = "Nuevo lugar";
    inputName.value = "";
    inputAbout.value = "";
    inputName.placeholder = "Título";
    inputAbout.placeholder = "Enlace a la imagen";

    // Validar campos inicialmente
    validateAddButton();

    // Abrir popup
    popup.classList.add("popup_opened");
  }

  // Función para abrir popup de imagen
  function openImagePopup(imageSrc, imageAlt) {
    console.log("Abriendo imagen ampliada");

    // Configurar el popup para imagen
    popupContainer.style.display = "none";
    popupImages.style.display = "flex";

    // Configurar contenido
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupImageCaption.textContent = imageAlt;

    // Abrir popup
    popup.classList.add("popup_opened");
  }

  // Función para cerrar popup
  function closePopup() {
    console.log("Cerrando popup");
    popup.classList.remove("popup_opened");

    // Limpiar estilos después de cerrar
    setTimeout(function() {
      popupContainer.style.display = "none";
      popupImages.style.display = "none";
    }, 300);
  }

  // Función para guardar cambios del perfil
  function saveProfileChanges(event) {
    event.preventDefault();
    console.log("Guardando cambios del perfil");

    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup();
  }

  // Función para agregar nueva tarjeta
  function addNewCard() {
    console.log("Agregando nueva tarjeta");

    const newCardData = {
      name: inputName.value,
      link: inputAbout.value
    };

    addCard(newCardData, true);
    closePopup();
  }

  // Función para validar botón de agregar
  function validateAddButton() {
    const isValid = inputName.value.trim() !== "" && inputAbout.value.trim() !== "";
    popupAddButton.disabled = !isValid;
  }

  // Inicializar las tarjetas
  function initializeCards() {
    console.log("Inicializando tarjetas...");
    initialCards.forEach(function(cardData) {
      addCard(cardData);
    });
  }

  // Event listeners
  profileEditButton.addEventListener("click", openEditPopup);
  profileAddButton.addEventListener("click", openAddPopup);
  popupCloseButton.addEventListener("click", closePopup);
  popupContainer.addEventListener("submit", saveProfileChanges);
  popupAddButton.addEventListener("click", addNewCard);

  // Validación en tiempo real para el popup de agregar
  inputName.addEventListener("input", function() {
    if (popupAddButton.style.display === "block") {
      validateAddButton();
    }
  });

  inputAbout.addEventListener("input", function() {
    if (popupAddButton.style.display === "block") {
      validateAddButton();
    }
  });

  // Cerrar popup al hacer clic fuera
  popup.addEventListener("click", function(event) {
    if (event.target === popup) {
      closePopup();
    }
  });

  // Prevenir cierre al hacer clic dentro del contenido
  popupContainer.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  popupImages.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  // Cargar tarjetas iniciales
  initializeCards();
});