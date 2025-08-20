

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM cargado"); // Para debugging

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

  // Seleccionar elementos del DOM para tarjetas
  const elementsContainer = document.querySelector(".elements");
  const elementTemplate = document.querySelector("#element-template");

  console.log("Contenedor:", elementsContainer); // Para debugging
  console.log("Template:", elementTemplate); // Para debugging

  // Función para crear una tarjeta usando el template
  function createCard(cardData) {
    // Clonar el contenido del template
    const cardElement = elementTemplate.content.cloneNode(true);

    // Llenar los datos de la tarjeta
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__place-name");
    const likeButton = cardElement.querySelector(".element__button-like");
    const deleteButton = cardElement.querySelector(".element__button-delete");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Agregar event listeners
    likeButton.addEventListener("click", function() {
      toggleLike(this);
    });

    deleteButton.addEventListener("click", function() {
      deleteCard(this);
    });

    return cardElement;
  }

  // Función para agregar tarjeta al DOM
  function addCard(cardData) {
    const cardElement = createCard(cardData);
    elementsContainer.appendChild(cardElement);
  }

  // Función para el toggle de like
  function toggleLike(button) {
    button.classList.toggle("element__button-like_active");
  }

  // Función para eliminar tarjeta
  function deleteCard(button) {
    const card = button.closest(".element");

    // Animación antes de eliminar
    card.style.transform = "scale(0.8)";
    card.style.opacity = "0";
    card.style.transition = "all 0.3s ease";

    // Eliminar después de la animación
    setTimeout(function() {
      card.remove();
    }, 300);
  }

  // Inicializar las tarjetas
  function initializeCards() {
    console.log("Inicializando tarjetas..."); // Para debugging
    initialCards.forEach(function(cardData) {
      addCard(cardData);
    });
  }

  // Cargar tarjetas iniciales
  initializeCards();

  // POPUP DE EDICIÓN DE PERFIL
  const butEdit = document.querySelector(".profile__button");
  const popupEdit = document.querySelector(".popup_edit");

  console.log("Botón editar:", butEdit); // Para debugging
  console.log("Popup editar:", popupEdit); // Para debugging

  if (butEdit && popupEdit) {
    const butCloseEdit = popupEdit.querySelector(".popup__button_close");
    const formEdit = popupEdit.querySelector(".popup__container");

    const inName = document.querySelector(".profile__title");
    const inAbout = document.querySelector(".profile__subtitle");

    const inputName = document.querySelector(".popup__input_name");
    const inputAbout = document.querySelector(".popup__input_about");

    function openEdit() {
      console.log("Abriendo popup de edición"); // Para debugging
      inputName.value = inName.textContent;
      inputAbout.value = inAbout.textContent;
      popupEdit.classList.add("popup_opened");
    }

    function closeEdit() {
      console.log("Cerrando popup de edición"); // Para debugging
      popupEdit.classList.remove("popup_opened");
    }

    function saveChange(event) {
      event.preventDefault();
      console.log("Guardando cambios"); // Para debugging
      inName.textContent = inputName.value;
      inAbout.textContent = inputAbout.value;
      closeEdit();
    }

    // Event listeners para popup de edición
    butEdit.addEventListener("click", openEdit);
    butCloseEdit.addEventListener("click", closeEdit);
    formEdit.addEventListener("submit", saveChange);
  }

  // POPUP DE AGREGAR NUEVA TARJETA
  const butAdd = document.querySelector(".profile__button-add");
  const popupAdd = document.querySelector(".popup_add");

  console.log("Botón agregar:", butAdd); // Para debugging
  console.log("Popup agregar:", popupAdd); // Para debugging

  if (butAdd && popupAdd) {
    const butCloseAdd = popupAdd.querySelector(".popup__button_close");
    const formAdd = popupAdd.querySelector(".popup__form-add");

    const inputPlace = document.querySelector(".popup__input_place");
    const inputLink = document.querySelector(".popup__input_link");

    function openAdd() {
      console.log("Abriendo popup de agregar"); // Para debugging
      inputPlace.value = "";
      inputLink.value = "";
      popupAdd.classList.add("popup_opened");
    }

    function closeAdd() {
      console.log("Cerrando popup de agregar"); // Para debugging
      popupAdd.classList.remove("popup_opened");
    }

    function addNewCard(event) {
      event.preventDefault();
      console.log("Agregando nueva tarjeta"); // Para debugging

      const newCardData = {
        name: inputPlace.value,
        link: inputLink.value
      };

      addCard(newCardData);
      closeAdd();
    }

    // Event listeners para popup de agregar
    butAdd.addEventListener("click", openAdd);
    butCloseAdd.addEventListener("click", closeAdd);
    formAdd.addEventListener("submit", addNewCard);
  }
});