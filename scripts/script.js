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

function createPhotoCard(element) {
    return `
        <li class="element">
            <img class="element__image" src="${element.link}" alt="${element.name}">
            <button class="element__delete-button" type="button" aria-label="Удалить"></button>
            <div class="element__caption">
                    <h2 class="element__name">${element.name}</h2>
                    <button class="element__like-button" type="button" aria-label="Нравится"></button>
            </div>
        </li>
    `;
};

function renderCards() {
    const card = initialCards.map(createPhotoCard).join('');
    elements.insertAdjacentHTML('afterbegin', card);
}

renderCards();

// форма редактирования профиля
let openEditForm = document.querySelector('.profile__edit-button');
let closeEditForm = document.querySelector('#edit_close-button');
let popupEditForm = document.querySelector('.popup_edit_profile');
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


// форма добавления новой карточки
const openAddForm = document.querySelector('.profile__add-button');
const closeAddForm = document.querySelector('#add_close-button');
const popupAddForm = document.querySelector('.popup_add_card');
const addForm = document.querySelector('#form_add-card');

openAddForm.addEventListener('click', function openAddPopup() {
    popupAddForm.classList.add('popup_opened');
});

function closeAddPopup() {
    popupAddForm.classList.remove('popup_opened');
}

closeAddForm.addEventListener('click', closeAddPopup);

function addNewCard(evt) {
    evt.preventDefault();
    const inputName = addForm.querySelector('.popup__form-input_card_name');
    const inputLink = addForm.querySelector('.popup__form-input_card_link');
    const inputCardName = inputName.value;
    const inputCardLink = inputLink.value;

    const newCard = createPhotoCard({ name: inputCardName , link: inputCardLink});
    elements.insertAdjacentHTML('afterbegin', newCard);

    inputName.value = '';
    inputLink.value = '';

    closeAddPopup();
};

addForm.addEventListener('submit', addNewCard);





