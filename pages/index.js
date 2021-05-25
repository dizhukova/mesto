import { Card } from '../scripts/components/Card.js';
import { initialCards } from '../scripts/utils/initial-сards.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { validationConfig } from '../scripts/components/FormValidator.js';


// данные формы редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const closeEditPopupBtn = popupEditProfile.querySelector('#edit_close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const editForm = document.forms.EditProfile;
const editName = editForm.querySelector('.popup__input_type_name');
const editProfession = editForm.querySelector('.popup__input_type_profession');

// данные формы добавления новой карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const openAddFormBtn = document.querySelector('.profile__add-button');
const closeAddFormBtn = popupAddCard.querySelector('#add_close-button');
const addForm = document.forms.AddCard;
const inputName = addForm.querySelector('.popup__input_card_title');
const inputLink = addForm.querySelector('.popup__input_card_link');

// данные формы открытия карточки
const imagePopup = document.querySelector('.popup_type_open-image');
const closeImagePopupBtn = imagePopup.querySelector('#image_close-button');
const pictureImagePopup = imagePopup.querySelector('.popup__image');
const captionImagePopup = imagePopup.querySelector('.popup__caption');

// создание экземпляров класса FormValidator
const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, popupAddCard);
addCardFormValidator.enableValidation();


// открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEscape); 
}

// открытие формы редактирования профиля
function openEditPopup() {
    editProfileFormValidator.removeInputErrors();

    editName.value = profileName.textContent;
    editProfession.value = profileProfession.textContent;

    openPopup(popupEditProfile);
}

// открытие формы добавления карточки
function openAddPopup() {
    openPopup(popupAddCard);
    addCardFormValidator.removeInputErrors();
    addForm.reset();
}

// открытие карточки c фото
function openImagePopup(link, name) {
    openPopup(imagePopup);
    pictureImagePopup.src = link;
    pictureImagePopup.alt = name;
    captionImagePopup.textContent = name;
}


// Закрытие попапа кликом на оверлей
function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
}

// Закрытие попапа нажатием на Esc
function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

// закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByEscape);  
}

// сохранение изменений в форме редактирования профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileProfession.textContent = editProfession.value;
    closePopup(popupEditProfile);
}

// добавление новой карточки
function addNewCard(evt) {
    evt.preventDefault();
    
    renderCard({
        name: inputName.value, 
        link: inputLink.value
    });

    addForm.reset();
    addCardFormValidator.toggleButtonState();
    closePopup(popupAddCard);
}

// создание карточки и рендеринг
function renderCard(item) {
    const card = new Card(item, '.card-template', openImagePopup);
    const cardElement = card.generateCard();

    document.querySelector('.cards').prepend(cardElement);
}

// вызов карточек из массива
initialCards.map(item => renderCard(item));

// слушатели - открытие/закрытие формы редактирования профиля
openEditPopupBtn.addEventListener('click', openEditPopup);
closeEditPopupBtn.addEventListener('click', () => closePopup(popupEditProfile));
editForm.addEventListener('submit', handleProfileSubmit);

// слушатели - открытие/закрытие формы добавления карточки
openAddFormBtn.addEventListener('click', openAddPopup);
closeAddFormBtn.addEventListener('click', () => closePopup(popupAddCard));
addForm.addEventListener('submit', addNewCard);

// слушатель - закрытие карточки с фото
closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));