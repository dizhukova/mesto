import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithImage.js';
import {  initialCards, templateConfig, validationConfig, elidProfileConfig, addCardConfig, imagePopupConfig } from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';

// создание экземпляров класса FormValidator
const editProfileFormValidator = new FormValidator(validationConfig, popupEditProfile);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, popupAddCard);
addCardFormValidator.enableValidation();

// создание экземпляра класса section 
const CardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = renderCard(item);

        CardList.addItem(card);
    }
}, templateConfig.cardsContainerSelector);

cardList.renderItems();

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

// добавление новой карточки
const addNewCard = new PopupWithForm(addCardConfig.popupAddCard, {
    formSubmitHandler: (data) => {
        const card = renderCard({
            name: data.title,
            link: data.link
        });
        cardList.addItem(card);
        popupAddCard.close();
    }
});

const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

// создание карточки и рендеринг
function renderCard(item) {
    const card = new Card({
        name: item.name,
        link: item.link
    }, {
        handleCardClick: () => {
            imagePopup.open({
                name: item.name,
                link: item.link
            });
        }
    }, templateConfig.cardSelector); 
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