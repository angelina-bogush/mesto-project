let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
editButton.addEventListener('click', function openPopup() {
    popup.classList.add('popup_opened');
});
