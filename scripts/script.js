// форма редактирования профиля
let popupEditForm = document.querySelector('.popup_edit_profile');
let openEditForm = document.querySelector('.profile__edit-button');
let closeEditForm = document.querySelector('#edit_close-button');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let form = document.querySelector('#form_edit-profile');
let editName = document.querySelector('.popup__form-input_type_name');
let editProfession = document.querySelector('.popup__form-input_type_profession');

openEditForm.addEventListener('click', function openEditPopup() {
    popupEditForm.classList.add('popup_opened');
    editName.value = profileName.textContent;
    editProfession.value = profileProfession.textContent;
});

function closeEditPopup() {
    popupEditForm.classList.remove('popup_opened');
}

closeEditForm.addEventListener('click', closeEditPopup);

form.addEventListener('submit', function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileProfession.textContent = editProfession.value;
    closeEditPopup();
});


// загрузка карточек на страницу
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

const elements = document.querySelector('.elements')
const CardTemplate = document.querySelector('.template');

const ImagePopup = document.querySelector('.popup_open_image');
const closeImagePopup = document.querySelector('#image_close-button');
const pictureImagePopup = document.querySelector('.popup__image');
const captionImagePopup = document.querySelector('.popup__caption');

function createCard(element) {
    const card = CardTemplate.content.cloneNode(true);
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
        ImagePopup.classList.add('popup_opened');
        pictureImagePopup.src = element.link;
        pictureImagePopup.alt = element.name;
        captionImagePopup.textContent = element.name;
    });

    return card;
};

function renderCards() {
    const photoCard = initialCards.map(createCard);
    elements.append(...photoCard);
}

renderCards();

// закрытие карточки
closeImagePopup.addEventListener('click', function() {
    ImagePopup.classList.remove('popup_opened');
});

// форма добавления новой карточки
const popupAddForm = document.querySelector('.popup_add_card');
const openAddForm = document.querySelector('.profile__add-button');
const closeAddForm = document.querySelector('#add_close-button');
const addForm = document.querySelector('#form_add-card');

openAddForm.addEventListener('click', function openAddPopup() {
    popupAddForm.classList.add('popup_opened');
});

function closeAddPopup() {
    popupAddForm.classList.remove('popup_opened');
}

closeAddForm.addEventListener('click', closeAddPopup);

addForm.addEventListener('submit', function addNewCard(evt) {
    evt.preventDefault();
    const inputName = addForm.querySelector('.popup__form-input_card_name');
    const inputLink = addForm.querySelector('.popup__form-input_card_link');
    const inputCardName = inputName.value;
    const inputCardLink = inputLink.value;

    const newCard = createCard({ name: inputCardName , link: inputCardLink});
    elements.prepend(newCard);

    addForm.reset();
    closeAddPopup();
});