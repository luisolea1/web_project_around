import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImages = this._popup.querySelector(".popup__images");
    this._popupContainer = this._popup.querySelector(".popup__container");
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__paragraph");
  }

  open(link, name) {
    // Ocultar el formulario y mostrar las imágenes
    this._popupContainer.style.display = "none";
    this._popupImages.style.display = "flex";

    // Establecer la imagen y caption
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }

  close() {
    // Restaurar estado al cerrar
    this._popupImages.style.display = "none";
    super.close();
  }
}