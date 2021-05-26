export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.closePopup();
          }
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        const closeButton = this._popupElement.querySelector('.popup__close-button');
        closeButton.addEventListener('click', this.close.bind(this));
    }
}