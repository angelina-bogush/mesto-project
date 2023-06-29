export const validationConfig = {
  formSelector: ".form",
  formInput: ".form__input",
  buttonSelector: ".form__button",
  formErrorTheme: "form__input_theme_error",
  formInputError: "form__input_error",
  inactiveButtonClass: "form__button_inactive",
};

export const profileInfo = {
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
};

export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "469baa30-a404-4c2f-8acf-7186e9d2571a",
    "Content-Type": "application/json",
  },
};

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
export const profileTitle = profile.querySelector(".profile__title");
export const profileSubtitle = profile.querySelector(".profile__subtitle");
export const buttonEdit = profile.querySelector('.profile__edit-button'); 
export const buttonAdd = profile.querySelector('.profile__add-button'); 
export const popups = page.querySelectorAll('.popup');
export const popupEditProfile = page.querySelector('.popup_theme_edit');
export const popupAddCard = page.querySelector('.popup_theme_add-card');
export const formEdit = page.querySelector(".form_edit");
export const formInputName = formEdit.querySelector(".form__input_theme_name");
export const formDescription = formEdit.querySelector(
  ".form__input_theme_description");
export const formAdd = page.querySelector('.form_add-card');
export const formAvatar = page.querySelector('.form_avatar');
export const cardNameInput = page.querySelector('.form__input_theme_name-card');
export const cardLinkInput =  formAdd.querySelector('.form__input_theme_link');
export const avatarLinkInput = page.querySelector('.form__input_theme_avatar');
export const popupPhoto = page.querySelector('.popup_theme_photo');
export const popupClosingIcon = page.querySelectorAll('.popup__close-icon');
export const popupPhotoImage = popupPhoto.querySelector('.popup__image');
export const popupPhotoDescription = popupPhoto.querySelector('.popup__description');
export const popupAvatar = page.querySelector('.popup_theme_avatar');
export const cardContainer = page.querySelector(".cards");
export const cardTemplate = page.querySelector("#template-card").content; 
export const formCreateButton = page.querySelector('.form__button_create');
export const formSubmitButton = page.querySelector('.form__button_submit');
export const buttonAvatar = page.querySelector('.profile__overlay');
export const profileAvatar = page.querySelector('.profile__avatar');
export const buttonSaveEdit = page.querySelector('.form__button_submit');
// export const buttonSaveNewCard = page.querySelector('.form__button_create');
export const buttonSaveAvatar = page.querySelector('.form__button_avatar');


