// настройки валидации 
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export { validationConfig };

export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    // показываем элемент ошибки
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    }
    
    // скрываем элемент ошибки
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = '';
    }

    // проверяем валидность поля
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            showInputError(inputElement, inputElement.validationMessage);
        } else {
            hideInputError(inputElement);
        }
    }

    // добавляем обработчики всем полям формы
    _setEventListeners() {
        // блокируем активацию кнопки до ввода данных
        this.toggleButtonState();
        
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
                });
            });
    }

    // проверяем наличиe хотя бы одного невалидного поля
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });
    }

    // блокируем кнопку сабмита при наличии хотя бы одного невалидного поля
    toggleButtonState() {
        if (hasInvalidInput()) {
            this._buttonElement.disabled = true;;
            this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;;
            this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        }
    }

    // добавляем обработчики всем формам
    enableValidation() {
        this.setEventListeners()
    }

    // удаление сообщений об ошибках
    removeInputErrors() {
        this._inputList.forEach(inputElement => {
            if (!inputElement.validity.valid) {
                this._hideInputError(inputElement);
          }
        });
    }
}