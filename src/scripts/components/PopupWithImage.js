import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._pictureImagePopup = this._popupElement.querySelector('.popup__image');
        this._captionImagePopup = this._popupElement.querySelector('.popup__caption');
    }

    open(name, link) {
        this._pictureImagePopup.src = link;
        this._pictureImagePopup.alt = name;
        this._captionImagePopup.textContent = name;

        super.open();
    }
}