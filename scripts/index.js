import { initialCards } from './initial-сards.js';
import Card from './Card.js';
import { validationConfig } from './FormValidator.js';
import FormValidator from './FormValidator.js';

// форма редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const closeEditPopupBtn = popupEditProfile.querySelector('#edit_close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const editForm = document.forms.EditProfile;
const editName = editForm.querySelector('.popup__input_type_name');
const editProfession = editForm.querySelector('.popup__input_type_profession');

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

// открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEscape); 
}

// закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByEscape);  
}


openEditPopupBtn.addEventListener('click', function openEditPopup() {
    removeInputErrors(editForm);
    editName.value = profileName.textContent;
    editProfession.value = profileProfession.textContent;
    openPopup(popupEditProfile);
});

closeEditPopupBtn.addEventListener('click', function closeEditPopup(){
    closePopup(popupEditProfile);
});

function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileProfession.textContent = editProfession.value;
    closePopup(popupEditProfile);
}

editForm.addEventListener('submit', handleProfileSubmit);


// // загрузка карточек на страницу
// const cards = document.querySelector('.cards')
// const cardTemplate = document.querySelector('.card-template');

// const imagePopup = document.querySelector('.popup_type_open-image');
// const closeImagePopupBtn = imagePopup.querySelector('#image_close-button');
// const pictureImagePopup = imagePopup.querySelector('.popup__image');
// const captionImagePopup = imagePopup.querySelector('.popup__caption');

// function createCard(element) {
//     const card = cardTemplate.content.cloneNode(true);
//     const cardTitle = card.querySelector('.card__name');
//     const cardImage = card.querySelector('.card__image');

//     cardTitle.textContent = element.name;
//     cardImage.alt = element.name;
//     cardImage.src = element.link;

//     // удаление карточки
//     const cardDeleteButton = card.querySelector('.card__delete-button');
//     cardDeleteButton.addEventListener('click', function (evt) {
//         evt.target.closest('.card').remove();
//     });

//     // лайк карточки
//     const cardLikeButton = card.querySelector('.card__like-button');
//     cardLikeButton.addEventListener('click', function () {
//         cardLikeButton.classList.toggle('card__like-button_active');
//     });

//     // открытие карточки с фото
//     cardImage.addEventListener('click', function openImagePopup() {
//         openPopup(imagePopup);
//         pictureImagePopup.src = element.link;
//         pictureImagePopup.alt = element.name;
//         captionImagePopup.textContent = element.name;
//     });

//     return card;
// };

function renderCards() {
    const photoCards = initialCards.map(createCard);
    cards.append(...photoCards);
}

renderCards();

// закрытие карточки с фото
closeImagePopupBtn.addEventListener('click', function() {
    closePopup(imagePopup);
});

// удаление сообщений об ошибках 
function removeInputErrors(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputList => {
        if (!inputList.validity.valid) {
            hideInputError(formElement, inputList);
      }
    });
}


// форма добавления новой карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const openAddFormBtn = document.querySelector('.profile__add-button');
const closeAddFormBtn = popupAddCard.querySelector('#add_close-button');
const addForm = document.forms.AddCard;
const inputName = addForm.querySelector('.popup__input_card_title');
const inputLink = addForm.querySelector('.popup__input_card_link');

openAddFormBtn.addEventListener('click', function openAddPopup() {
    openPopup(popupAddCard);
    removeInputErrors(addForm);
    addForm.reset();
});

function closeAddPopup() {
    closePopup(popupAddCard);
}

closeAddFormBtn.addEventListener('click', closeAddPopup);

function addNewCard(evt) {
    evt.preventDefault();

    const inputList = Array.from(addForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = addForm.querySelector(validationConfig.submitButtonSelector);
    

    const inputCardName = inputName.value;
    const inputCardLink = inputLink.value;
    
    const newCard = createCard({ name: inputCardName , link: inputCardLink});
    cards.prepend(newCard);

    addForm.reset();
    toggleButtonState(inputList, buttonElement);
    closePopup(popupAddCard);
}

addForm.addEventListener('submit',addNewCard);