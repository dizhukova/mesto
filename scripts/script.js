// форма редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const closeEditPopupBtn = popupEditProfile.querySelector('#edit_close-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const editForm = document.forms.EditProfile;
const editName = editForm.querySelector('.popup__input_type_name');
const editProfession = editForm.querySelector('.popup__input_type_profession');

// открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened'); 
}

// закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
}

openEditPopupBtn.addEventListener('click', function openEditPopup() {
    openPopup(popupEditProfile);
    editName.value = profileName.textContent;
    editProfession.value = profileProfession.textContent;
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


// загрузка карточек на страницу
const elements = document.querySelector('.elements')
const cardTemplate = document.querySelector('.template');

const imagePopup = document.querySelector('.popup_open_image');
const closeImagePopupBtn = imagePopup.querySelector('#image_close-button');
const pictureImagePopup = imagePopup.querySelector('.popup__image');
const captionImagePopup = imagePopup.querySelector('.popup__caption');

function createCard(element) {
    const card = cardTemplate.content.cloneNode(true);
    const cardTitle = card.querySelector('.element__name');
    const cardImage = card.querySelector('.element__image');

    cardTitle.textContent = element.name;
    cardImage.alt = element.name;
    cardImage.src = element.link;

    // удаление карточки
    const cardDeleteButton = card.querySelector('.element__delete-button');
    cardDeleteButton.addEventListener('click', function deleteCard(evt) {
        evt.target.closest('.element').remove();
    });

    // лайк карточки
    const cardLikeButton = card.querySelector('.element__like-button');
    cardLikeButton.addEventListener('click', function likeCard() {
        cardLikeButton.classList.toggle('element__like-button_active');
    });

    // открытие карточки
    cardImage.addEventListener('click', function openImagePopup() {
        openPopup(imagePopup);
        pictureImagePopup.src = element.link;
        pictureImagePopup.alt = element.name;
        captionImagePopup.textContent = element.name;
    });

    return card;
};

function renderCards() {
    const photoCards = initialCards.map(createCard);
    elements.append(...photoCards);
}

renderCards();

// закрытие карточки
closeImagePopupBtn.addEventListener('click', function() {
    closePopup(imagePopup);
});

// форма добавления новой карточки
const popupAddCard = document.querySelector('.popup_add_card');
const openAddFormBtn = document.querySelector('.profile__add-button');
const closeAddFormBtn = popupAddCard.querySelector('#add_close-button');
const addForm = document.forms.AddCard;
const inputName = addForm.querySelector('.popup__input_card_name');
const inputLink = addForm.querySelector('.popup__input_card_link');

openAddFormBtn.addEventListener('click', function openAddPopup() {
    openPopup(popupAddCard);
});

function closeAddPopup() {
    closePopup(popupAddCard);
}

closeAddFormBtn.addEventListener('click', closeAddPopup);

function addNewCard(evt) {
    evt.preventDefault();

    const inputCardName = inputName.value;
    const inputCardLink = inputLink.value;
    
    const newCard = createCard({ name: inputCardName , link: inputCardLink});
    elements.prepend(newCard);

    addForm.reset();
    closePopup(popupAddCard);
}

addForm.addEventListener('submit',addNewCard);