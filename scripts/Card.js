export default class Card {
    constructor (data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__name');

        this._cardImage.src = this._link;
        this._cardTitle.textContent = this._name;
        this._cardTitle.alt = this._name;

        return this._element;
    }

    _handleDeleteCard() {
      this._element.remove();
      this._element = null;
    }

    _handleLikeCard() {
      this._cardLikeButton.classList.toggle('card__like-button_active');
    }
    
    _setEventListeners() {
      this._cardDeleteButton = this._element.querySelector('.card__delete-button');
      this._cardLikeButton = this._element.querySelector('.card__like-button');

      this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard());
      this._cardLikeButton.addEventListener('click', () => this._handleLikeCard());
      this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this.name));
    } 
}

initialCards.forEach((item) => {
    // создаем экземпляр карточки
    const card = new Card(item, '.card-template_type_default');
    // создаем карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // добавляем в DOM
    document.querySelector('.cards').prepend(cardElement);
});