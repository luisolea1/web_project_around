// utils.js

// Función para abrir popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Función para cerrar popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Función para cerrar popup con la tecla Escape
export function closePopupOnEscape(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

// Función para cerrar popup al hacer clic en el overlay
export function closePopupOnOverlayClick(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
}