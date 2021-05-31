// массив карточек
const initialCards = [
    {
      name: 'Италия',
      link: 'https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2602&q=80'
    },
    {
      name: 'Франция',
      link: 'https://images.unsplash.com/photo-1587889834738-eb80f47da2e3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=882&q=80'
    },
    {
      name: 'Грузия',
      link: 'https://images.unsplash.com/photo-1568558715456-0983a3b5cca9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=975&q=80'
    },
    {
      name: 'Турция',
      link: 'https://images.unsplash.com/photo-1526048598645-62b31f82b8f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80'
    },
    {
      name: 'Куба',
      link: 'https://images.unsplash.com/photo-1570299437522-f66ff98d52e7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Шри-Ланка',
      link: 'https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
    }
];

const templateConfig = {
  cardsContainerSelector: '.cards',
  cardSelector: '.card-template'
}

// настройки валидации 
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// данные формы редактирования профиля
const editProfileConfig = {
  popupEditProfile: document.querySelector('.popup_type_edit-profile'),
  openEditPopupBtn: document.querySelector('.profile__edit-button'),
  profileName: document.querySelector('.profile__name'),
  profileProfession: document.querySelector('.profile__profession'),
  editForm: document.forms.EditProfile,
  editName: document.querySelector('.popup__input_type_name'),
  editProfession: document.querySelector('.popup__input_type_profession'),
}

// данные формы добавления новой карточки
const addCardConfig = {
  popupAddCard: document.querySelector('.popup_type_add-card'),
  openAddFormBtn: document.querySelector('.profile__add-button'),
  addForm: document.forms.AddCard
}

// данные формы открытия карточки
const imagePopupConfig = {
  imagePopup: document.querySelector('.popup_type_open-image'),
}


export { initialCards, templateConfig, validationConfig, editProfileConfig, addCardConfig, imagePopupConfig };