import { initialCards, templateConfig, validationConfig, editProfileConfig, addCardConfig, imagePopupConfig } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

// создание экземпляров класса FormValidator
const editProfileFormValidator = new FormValidator(validationConfig, editProfileConfig.editForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addCardConfig.addForm);
addCardFormValidator.enableValidation();

// создание карточки
function renderCard(item) {
    const card = new Card(item, () => imagePopup.open(item.name, item.link), templateConfig.cardSelector);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    
    return cardElement;
}

// создание экземпляра класса Section 
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = renderCard(item);

        cardList.addItem(card);
    }
}, templateConfig.cardsContainerSelector);

cardList.renderItems();

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
        cardList.addItem(card);
        popupAddCard.close();
    }
});

// открытие формы добавления карточки
function openAddPopup() {
    popupAddCard.open();
    addCardFormValidator.removeInputErrors();
    addCardConfig.addForm.reset();
}

// создание экземпляра класса PopupWithImage
const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

editProfileConfig.openEditPopupBtn.addEventListener('click', openEditPopup);
addCardConfig.openAddFormBtn.addEventListener('click', openAddPopup);
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
imagePopup.setEventListeners();
