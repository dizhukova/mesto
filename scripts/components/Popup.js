export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closePopupByOverlay = this._closePopupByOverlay.bind(this);
        this._closePopupByEscape = this._closePopupByEscape.bind(this);
    }

    openPopup() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('click', this._closePopupByOverlay);
        document.addEventListener('keydown', this._closePopupByEscape); 
    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('click', this._closePopupByOverlay);
        document.removeEventListener('keydown', this._closePopupByEscape);
    }

    _closePopupByOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.closePopup();
          }
    }

    _closePopupByEscape(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        const closeButton = this._popupElement.querySelector('.popup__close-button');
        closeButton.addEventListener('click', this.closePopup.bind(this));
    }
}