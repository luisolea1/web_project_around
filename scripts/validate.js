
// Función para mostrar el error
function showInputError(formElement, inputElement, errorMessage, config) {

  // Construir el selector correctamente basado en el id del input
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

  // Si es el campo de URL y no es válida
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
  // Determinar si estamos validando el campo de URL
  const isAddMode = inputElement.placeholder === "Enlace a la imagen";
  const isURLField = isAddMode && inputElement.id === "profile-about-input";

  // Para el campo URL, validar con nuestra función personalizada
  let isValid = inputElement.validity.valid;

  if (isURLField && inputElement.value !== "") {
    isValid = isValid && isValidURL(inputElement.value);
  }

  if (!isValid) {
    const errorMessage = getErrorMessage(inputElement, isURLField);
    showInputError(formElement, inputElement, errorMessage, config);

    // Marcar como inválido manualmente para el campo URL
    if (isURLField && !isValidURL(inputElement.value)) {
      inputElement.setCustomValidity("URL inválida");
    }
  } else {
    // Limpiar validación personalizada
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

  // Desactiva el botón inicialmente
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener("input", function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
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

// FUNCIÓN OPCIONAL: Para resetear la validación
function resetValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(function(inputElement) {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}