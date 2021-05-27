import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupElement, {handleFormSubmit}) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(this._getInputValues())
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}