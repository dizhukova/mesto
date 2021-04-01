const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach();



let openEditForm = document.querySelector('.profile__edit-button');
let closeEditForm = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let form = document.querySelector('.popup__form');
let editName = document.querySelector('.popup__form-input_type_name');
let editProfession = document.querySelector('.popup__form-input_type_profession');

function openPopup() {
    popup.classList.add('popup_opened');
    editName.value = profileName.textContent;
    editProfession.value = profileProfession.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileProfession.textContent = editProfession.value;
    closePopup();
}

openEditForm.addEventListener('click', openPopup);
closeEditForm.addEventListener('click', closePopup);
form.addEventListener('submit', handleProfileSubmit);