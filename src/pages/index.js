import './index.css';
import { initialCards, templateConfig, validationConfig, editProfileConfig, addCardConfig, deleteCardConfig, imagePopupConfig } from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

// валидация
const editProfileFormValidator = new FormValidator(validationConfig, editProfileConfig.editForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addCardConfig.addForm);
addCardFormValidator.enableValidation();

// попап, открывающий карточку
const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);


// загрузка данных с сервера
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '0bfe8642-03b6-4f4d-92cc-535741de9ca8',
        'Content-Type': 'application/json'
    }
});




// создание и рендеринг карточек
function renderCard(data) {
    const card = new Card(data, templateConfig.cardSelector, userId, {
        handleCardClick: () => {
            imagePopup.open({
                name: data.name,
                link: data.link
            });
        },
        handleCardDelete: () => {
            // popupDeleteCard.open(card);
        },
        handleCardLike: () => {

        }

    });
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
    renderer: (item) => {
        const card = renderCard(item);
        cardList.appendItem(card);
    }
}, templateConfig.cardsContainerSelector);

cardList.renderItems(initialCards);

// создание экземпляра класса UserInfo
const userInfo = new UserInfo ({
    name: editProfileConfig.profileName,
    profession: editProfileConfig.profileProfession
});

// создание экземпляра класса PopupWithForm для формы EditProfile
const popupEditProfile = new PopupWithForm(editProfileConfig.popupEditProfile, {
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
    }
});

// открытие формы редактирования профиля
function openEditPopup() {
    editProfileFormValidator.removeInputErrors();
    const profileInfo = userInfo.getUserInfo();
    editProfileConfig.editName.value = profileInfo.name;
    editProfileConfig.editProfession.value = profileInfo.profession;

    popupEditProfile.open();
};

// создание экземпляра класса PopupWithForm для формы AddCard
const popupAddCard = new PopupWithForm(addCardConfig.popupAddCard, {
    handleFormSubmit: (data) => {
        const card = renderCard({
            name: data['card-name'],
            link: data['card-link']
        });
        popupAddCard.close();
    }
});

// открытие формы добавления карточки
function openAddPopup() {
    popupAddCard.open();
    addCardFormValidator.removeInputErrors();
    addCardFormValidator.toggleButtonState();
    addCardConfig.addForm.reset();
}


editProfileConfig.openEditPopupBtn.addEventListener('click', openEditPopup);
addCardConfig.openAddFormBtn.addEventListener('click', openAddPopup);
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
imagePopup.setEventListeners();
