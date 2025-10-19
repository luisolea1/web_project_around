// Card.js

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Método privado: obtener la plantilla
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // Método privado: configurar los listeners de eventos
  _setEventListeners() {
    // Listener para el botón de like
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    // Listener para el botón de eliminar
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    // Listener para abrir la imagen
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  // Método privado: manejar el click en like
  _handleLikeClick() {
    this._likeButton.classList.toggle("element__button-like_active");
  }

  // Método privado: manejar el click en eliminar
  _handleDeleteClick() {
    this._element.style.transform = "scale(0.8)";
    this._element.style.opacity = "0";
    this._element.style.transition = "all 0.3s ease";

    setTimeout(() => {
      this._element.remove();
      this._element = null; // Liberar memoria
    }, 300);
  }

  // Método privado: manejar el click en la imagen
  _handleImageClick() {
    // Disparar un evento personalizado que será escuchado en index.js
    const event = new CustomEvent("openImagePopup", {
      detail: {
        link: this._link,
        name: this._name
      }
    });
    document.dispatchEvent(event);
  }

  // Método público: generar la tarjeta completa
  generateCard() {
    // Obtener la plantilla
    this._element = this._getTemplate();

    // Obtener los elementos internos
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__place-name");
    this._likeButton = this._element.querySelector(".element__button-like");
    this._deleteButton = this._element.querySelector(".element__button-delete");

    // Configurar los listeners
    this._setEventListeners();

    // Llenar con datos
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Devolver el elemento listo
    return this._element;
  }
}