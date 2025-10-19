export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._addButtonElement = this._formElement.querySelector(".popup__button_add");
  }

  // Método privado: mostrar error
  _showInputError(inputElement, errorMessage) {
    let errorSelector;

    if (inputElement.id === "profile-name-input") {
      errorSelector = ".profile-name__input_error";
    } else if (inputElement.id === "profile-about-input") {
      errorSelector = ".profile-about__input_error";
    }

    const errorElement = this._formElement.querySelector(errorSelector);

    if (errorElement) {
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  }

  // Método privado: ocultar error
  _hideInputError(inputElement) {
    let errorSelector;

    if (inputElement.id === "profile-name-input") {
      errorSelector = ".profile-name__input_error";
    } else if (inputElement.id === "profile-about-input") {
      errorSelector = ".profile-about__input_error";
    }

    const errorElement = this._formElement.querySelector(errorSelector);

    if (errorElement) {
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = "";
    }
  }

  // Método privado: verificar si es URL válida
  _isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Método privado: obtener mensaje de error
  _getErrorMessage(inputElement, isURLField) {
    if (inputElement.validity.valueMissing) {
      return "Por favor, rellena este campo.";
    }

    if (isURLField) {
      if (!this._isValidURL(inputElement.value) && inputElement.value !== "") {
        return "Por favor, introduce una dirección web válida.";
      }
    }

    if (inputElement.validity.tooShort) {
      return `El texto debe tener al menos ${inputElement.minLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
    }

    if (inputElement.validity.tooLong) {
      return `El texto no debe exceder ${inputElement.maxLength} caracteres.`;
    }

    return inputElement.validationMessage;
  }

  // verificar validez del input
  _checkInputValidity(inputElement) {
    const isAddMode = inputElement.placeholder === "Enlace a la imagen";
    const isURLField = isAddMode && inputElement.id === "profile-about-input";

    let isValid = inputElement.validity.valid;

    if (isURLField && inputElement.value !== "") {
      isValid = isValid && this._isValidURL(inputElement.value);
    }

    if (!isValid) {
      const errorMessage = this._getErrorMessage(inputElement, isURLField);
      this._showInputError(inputElement, errorMessage);

      if (isURLField && inputElement.value !== "" && !this._isValidURL(inputElement.value)) {
        inputElement.setCustomValidity("URL inválida");
      }
    } else {
      inputElement.setCustomValidity("");
      this._hideInputError(inputElement);
    }
  }

  // Método privado: verificar si hay inputs inválidos
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Método privado: cambiar estado del botón
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;

      if (this._addButtonElement) {
        this._addButtonElement.classList.add(this._config.inactiveButtonClass);
        this._addButtonElement.disabled = true;
      }
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;

      if (this._addButtonElement) {
        this._addButtonElement.classList.remove(this._config.inactiveButtonClass);
        this._addButtonElement.disabled = false;
      }
    }
  }

  // Método privado: configurar listeners
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  // Método público: resetear validación
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.setCustomValidity("");
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

  // Método público: habilitar validación
  enableValidation() {
    this._setEventListeners();
  }
}


























// Función para mostrar el error
/*function showInputError(formElement, inputElement, errorMessage, config) {
  let errorSelector;
  if (inputElement.id === "profile-name-input") {
    errorSelector = ".profile-name__input_error";
  } else if (inputElement.id === "profile-about-input") {
    errorSelector = ".profile-about__input_error";
  }

  const errorElement = formElement.querySelector(errorSelector);

  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
}

// Función para ocultar el error
function hideInputError(formElement, inputElement, config) {

  let errorSelector;
  if (inputElement.id === "profile-name-input") {
    errorSelector = ".profile-name__input_error";
  } else if (inputElement.id === "profile-about-input") {
    errorSelector = ".profile-about__input_error";
  }

  const errorElement = formElement.querySelector(errorSelector);

  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
}

// Función para verificar si es una URL válida
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Función para obtener mensaje de error personalizado
function getErrorMessage(inputElement, isURLField) {
  if (inputElement.validity.valueMissing) {
    return "Por favor, rellena este campo.";
  }

  if (isURLField) {
    if (!isValidURL(inputElement.value) && inputElement.value !== "") {
      return "Por favor, introduce una dirección web válida.";
    }
  }

  if (inputElement.validity.tooShort) {
    return `El texto debe tener al menos ${inputElement.minLength} caracteres. Longitud actual: ${inputElement.value.length}.`;
  }

  if (inputElement.validity.tooLong) {
    return `El texto no debe exceder ${inputElement.maxLength} caracteres.`;
  }

  return inputElement.validationMessage;
}


// Función para verificar si el input es válido
function checkInputValidity(formElement, inputElement, config) {
  const isAddMode = inputElement.placeholder === "Enlace a la imagen";
  const isURLField = isAddMode && inputElement.id === "profile-about-input";

  let isValid = inputElement.validity.valid;
  if (isURLField && inputElement.value !== "") {
    isValid = isValid && isValidURL(inputElement.value);
  }

  if (!isValid) {
    const errorMessage = getErrorMessage(inputElement, isURLField);
    showInputError(formElement, inputElement, errorMessage, config);

    if (isURLField && inputElement.value !== "" && !isValidURL(inputElement.value)) {
      inputElement.setCustomValidity("URL inválida");
    }
  } else {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, config);
  }
}

// Función para verificar si hay inputs inválidos en el formulario
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  });
}

// Función para activar/desactivar el botón
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Función para agregar eventos a los inputs de un formulario
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const addButtonElement = formElement.querySelector(".popup__button_add");

  toggleButtonState(inputList, buttonElement, config);
  if (addButtonElement) {
    toggleButtonState(inputList, addButtonElement, config);
  }

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener("input", function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
      if (addButtonElement) {
        toggleButtonState(inputList, addButtonElement, config);
      }
    });
  });
}

// Función principal para habilitar la validación
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(function(formElement) {
    formElement.addEventListener("submit", function(evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

// Función para resetear la validación
function resetValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(function(inputElement) {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}*/