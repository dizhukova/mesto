let openEditForm = document.querySelector('.profile__edit-button');
let closeEditForm = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let form = document.querySelector('form[name="EditProfile"]');
let editName = document.querySelector('input[name="name"]');
let editProfession = document.querySelector('input[name="profession"]');

function openPopup() {
    popup.classList.add('popup_opened');
    editName.value = profileName.textContent;
    editProfession.value = profileProfession.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileProfession.textContent = editProfession.value;
    closePopup();
}

openEditForm.addEventListener('click', openPopup);
closeEditForm.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);