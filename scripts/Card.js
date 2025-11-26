export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("element__button-like_active");
  }

  _handleDeleteClick() {
    this._element.style.transform = "scale(0.8)";
    this._element.style.opacity = "0";
    this._element.style.transition = "all 0.3s ease";

    setTimeout(() => {
      this._element.remove();
      this._element = null;
    }, 300);
  }

  _handleImageClick() {
    const event = new CustomEvent("openImagePopup", {
      detail: {
        link: this._link,
        name: this._name
      }
    });
    document.dispatchEvent(event);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__place-name");
    this._likeButton = this._element.querySelector(".element__button-like");
    this._deleteButton = this._element.querySelector(".element__button-delete");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}