export default class Card {
  constructor (data, cardSelector, userId, {handleCardClick, handleCardDelete, handleCardLike}) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    
    return cardElement;
  }

  getCardId() {
    return this._cardId;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__name');
    this._cardDeleteButton = this._element.querySelector('.card__delete-button');
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-number');

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardTitle.alt = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._showUserLikes();
    this._removeDeleteButton();

    return this._element;
  }
  
  // удаление карточки
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
  
  // отображение кнопки удаления карточки только на карточках, созданных пользователем
  _removeDeleteButton() {
    if(this._ownerId !== this._userId) {
      this._cardDeleteButton.remove();
    }
  }
  
  // лайк карточки
  handleLikeCard() {
    this._cardLikeButton.classList.toggle('card__like-button_active');
    this._likeCounter.textContent = this._likes.lenght;
  }

  // проверка наличия лайка
  checkLikeStatus() {
    const activeLike = this._cardLikeButton.classList.contains('card__like-button_active');
    return activeLike;
  }

  setLikes(data) {
    this._likes = data;
  }

  _showUserLikes() {
    const newLikes = this._likes.some(like => like._id === this._userId);
    if (newLikes) {
      this._cardLikeButton.classList.add('card__like-button_active');
    }
  }
   
  // обработчики событий
  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard());
    this._cardLikeButton.addEventListener('click', () => this._handleLikeCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  } 
}