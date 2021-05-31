import './index.css';
import { templateConfig, validationConfig, editProfileConfig, editAvatarPopupConfig, addCardConfig, deleteCardConfig, imagePopupConfig, loaderCongig } from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithСonfirm from '../scripts/components/PopupWithСonfirm.js';


// загрузка данных с сервера
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '0bfe8642-03b6-4f4d-92cc-535741de9ca8',
        'Content-Type': 'application/json'
    }
});


let userId = {};
const userInfo = new UserInfo(editProfileConfig.profileName, editProfileConfig.profileProfession, editAvatarPopupConfig.profileAvatar);

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
            popupDeleteCard.open(card);
        },
        handleCardLike: () => {
            const userLikedCard = card.checkLikeStatus();
            const requiredApi = userLikedCard
                ? api.unlikeCard(card.getCardId())
                : api.likeCard(card.getCardId());

            requiredApi.then((data) => {
                card.setLikes(data.likes);
                card.handleLikeCard();
            })
                .catch(err => console.log(err));
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardList.renderItems(cards);
    })
    .catch(err => console.log(err))


// валидация
const editProfileFormValidator = new FormValidator(validationConfig, editProfileConfig.editForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(validationConfig, addCardConfig.addForm);
addCardFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(validationConfig, editAvatarPopupConfig.editAvatarForm);
editAvatarFormValidator.enableValidation();

// попап, открывающий карточку
const imagePopup = new PopupWithImage(imagePopupConfig.imagePopup);

// попап редактирования данных профиля
const popupEditProfile = new PopupWithForm(editProfileConfig.popupEditProfile, {
    handleFormSubmit: (data) => {
        popupEditProfile.renderLoading(true);
        api.setUserInfo(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                popupEditProfile.close();
            })
            .catch(err => console.log(err))
            .finally(() => popupEditProfile.renderLoading(false));
    }
});

// открытие формы редактирования профиля
function openEditPopup() {
    editProfileFormValidator.removeInputErrors();
    const profileInfo = userInfo.getUserInfo();
    editProfileConfig.editName.value = profileInfo.name;
    editProfileConfig.editProfession.value = profileInfo.about;

    popupEditProfile.open();
};

// попап редактирования аватара
const popupEditAvatar = new PopupWithForm(editAvatarPopupConfig.popupEditAvatar, {
    handleFormSubmit: (data) => {
        popupEditAvatar.renderLoading(true);
        api.editAvatar(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                popupEditAvatar.close();
            })
            .catch(err => console.log(err))
            .finally(() => popupEditAvatar.renderLoading(false));
    }
});

// открытие попапа редактирования аватара
function openEditAvatarPopup() {
    editAvatarFormValidator.removeInputErrors();
    editAvatarFormValidator.toggleButtonState();
    popupEditAvatar.open();
};

// попап добавления карточки
const popupAddCard = new PopupWithForm(addCardConfig.popupAddCard, {
    handleFormSubmit: (data) => {
        popupAddCard.renderLoading(true);
        api.addCard(data)
            .then((res) => {
                const card = renderCard(res);
                cardList.prependItem(card);
                popupAddCard.close();
            })
            .catch(err => console.log(err))
            .finally(() => popupAddCard.renderLoading(false));
    }
});

// открытие попапа добавления карточки
function openAddPopup() {
    addCardFormValidator.removeInputErrors();
    addCardFormValidator.toggleButtonState();
    popupAddCard.open();
};

// попап удаления карточки
const popupDeleteCard = new PopupWithСonfirm(deleteCardConfig.popupDeleteCard, deleteCardConfig.deleteCardBtn, {
    handleCardDelete: (card) => {
        api.deleteCard(card.getCardId())
            .then(() => {
                card.handleDeleteCard();
                popupDeleteCard.close()
            })
            .catch(err => console.log(err))
    }
})

editProfileConfig.openEditPopupBtn.addEventListener('click', openEditPopup);
editAvatarPopupConfig.openEditAvatarBtn.addEventListener('click', openEditAvatarPopup);
addCardConfig.openAddFormBtn.addEventListener('click', openAddPopup);
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
imagePopup.setEventListeners();
