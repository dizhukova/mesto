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
  editProfession: document.querySelector('.popup__input_type_profession')
}

// данные формы редактирования аватара
const editAvatarPopupConfig = {
  popupEditAvatar: document.querySelector('.popup_type_edit-avatar'),
  openEditAvatarBtn: document.querySelector('.profile__avatar-edit'),
  profileAvatar: document.querySelector('.profile__avatar'),
  editAvatarForm: document.forms.EditAvatar,
  editAvatarInput: document.querySelector('.popup__input_type_avatar-link')
}

// данные формы добавления новой карточки
const addCardConfig = {
  popupAddCard: document.querySelector('.popup_type_add-card'),
  openAddFormBtn: document.querySelector('.profile__add-button'),
  addForm: document.forms.AddCard
}

const deleteCardConfig = {
  popupDeleteCard: document.querySelector('.popup_type_delete-card'),
  deleteCardBtn: document.querySelector('#card_delete-button')
}

// данные формы открытия карточки
const imagePopupConfig = {
  imagePopup: document.querySelector('.popup_type_open-image'),
}

const loaderCongig = {
  loaderDots: document.querySelector('.loader-dots'),
  loaderDotsVisible: document.querySelector('.loader-dots_visible'),
}

export { templateConfig, validationConfig, editProfileConfig, editAvatarPopupConfig, addCardConfig, deleteCardConfig, imagePopupConfig, loaderCongig };