import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    open({name, link}) {
        super.open();

        const pictureImagePopup = this._popupElement.querySelector('.popup__image');
        const captionImagePopup = this._popupElement.querySelector('.popup__caption');

        pictureImagePopup.src = link;
        pictureImagePopup.alt = name;
        captionImagePopup.textContent = name;
    }
}