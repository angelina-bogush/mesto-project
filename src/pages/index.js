import "../pages/index.css";
import {
  formAdd,
  buttonEdit,
  formInputName,
  formDescription,
  buttonAdd,
  formEdit,
  buttonAvatar,
  formAvatar,
  validationConfig,
  profileInfo,
  config,
  cardsContainer,
  popupPhotoSelector,
} from "../utils/constants.js";

import { Api } from "../components/api.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/section.js";
import { Card } from "../components/Card.js";

let userId;
let cardList;

const editProfileValidation = new FormValidator(validationConfig, formEdit);
const editAvatarValidation = new FormValidator(validationConfig, formAvatar);
const newPostValidation = new FormValidator(validationConfig, formAdd);
const api = new Api(config);
const userInfo = new UserInfo(profileInfo);
const popupWithImage = new PopupWithImage(popupPhotoSelector);

//Добавление карточки, лайки и удаление 
const createCard = (item) => {
  const card = new Card({
    title: item.name,
    link: item.link,
    ownerId: item.owner._id,
    cardId: item._id,
    userId: userId,
    likes: item.likes,
    cardSelector: "#template-card",
    handleAddLikeClick: () => {
      api
        .addLikeCard(item._id)
        .then((data) => {
          card.setLike();
          card.showLikeCount(data.likes.length);
        })
        .catch((err) => {
          console.log(`Что-то пошло так! Ошибка при добавления лайки: ${err}`);
        });
    },
    handleRemoveLikeClick: () => {
      api
        .deleteLikeCard(item._id)
        .then((data) => {
          card.setLike();
          card.showLikeCount(data.likes.length);
        })
        .catch((err) => {
          console.log(`Что-то пошло так! Ошибка при удаления лайки: ${err}`);
        });
    },
    handleDeleteClick: () => {
      api
        .deleteCardOnServer(item._id)
        .then((dataFromServer) => {
          card.clickButtonDelete();
          console.log(dataFromServer.message);
        })
        .catch((err) => {
          сonsole.log(`Что-то пошло так! Ошибка при удаление карточки: ${err}`);
        });
    },
    handleCardClick: () => popupWithImage.open(item.link, item.name),
  });
  return card;
};

//инфо о пользователе и вывод карточек с сервера
api.getInfo().then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
  userId = userData._id;

  cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createCard(item);
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      },
    },
    cardsContainer
  );
  cardList.renderItems();
});

//изменение имени в форме редактирования профиля
const changeUserInfo = new PopupWithForm({
  popupSelector: ".popup_theme_edit",
  handleFormSubmit: (inputValue) => {
    changeUserInfo.renderLoading(true);
    api
      .loadProfileInfo({
        name: inputValue.name,
        about: inputValue.aboutUser,
      })
      .then((profile) => {
        userInfo.setUserInfo({ name: profile.name, about: profile.about });
        changeUserInfo.close();
      })
      .catch((err) => {
        console.log(
          `Что-то пошло так! Ошибка при редактирования профиля: ${err}`
        );
      })
      .finally(() => {
        changeUserInfo.renderLoading(false);
      });
  },
});

//пост новой карточки на сервер
const submitNewCardForm = new PopupWithForm({
  popupSelector: ".popup_theme_add-card",
  handleFormSubmit: (inputValue) => {
    submitNewCardForm.renderLoading(true);
    api
      .postNewCard({
        name: inputValue.place,
        link: inputValue.placeLink,
      })
      .then((data) => {
        const card = createCard(data);
        const cardElement = card.generate();
        cardList.addItem(cardElement);

        submitNewCardForm.close();
      })
      .catch((err) => {
        console.log(
          `Что-то пошло так! Ошибка при добавления новой карточки: ${err}`
        );
      })
      .finally(() => {
        submitNewCardForm.renderLoading(false);
      });
  },
});

//добавление нового аватара
const submitAvatarForm = new PopupWithForm({
  popupSelector: ".popup_theme_avatar",
  handleFormSubmit: (inputValue) => {
    submitAvatarForm.renderLoading(true);
    api
      .postNewAvatar({ avatar: inputValue.avatar })
      .then((data) => {
        userInfo.setUserInfo({ avatar: data.avatar });
        submitAvatarForm.close();
      })
      .catch((err) => {
        console.log(
          `Что-то пошло так! Ошибка при добавления нового аватара: ${err}`
        );
      })
      .finally(() => {
        submitAvatarForm.renderLoading(false);
      });
  },
});

//Открытие попап редактирование профилья и валидация
function handleProfileForm() {
  const userObject = userInfo.getUserInfo();
  formInputName.value = userObject.name;
  formDescription.value = userObject.about;
  editProfileValidation.disableButton();
  editProfileValidation.hideError();
  changeUserInfo.open();
}

changeUserInfo.setEventListeners();
buttonEdit.addEventListener("click", handleProfileForm);

//Открытие попап изменение аватара и валидация
function handleAvatarForm() {
  editAvatarValidation.disableButton();
  editAvatarValidation.hideError();
  submitAvatarForm.open();
}

submitAvatarForm.setEventListeners();
buttonAvatar.addEventListener("click", handleAvatarForm);

//Открытие попап добавление карточки и валидация
function handlePostForm() {
  newPostValidation.hideError();
  newPostValidation.disableButton();
  submitNewCardForm.open();
}

submitNewCardForm.setEventListeners();
buttonAdd.addEventListener("click", handlePostForm);

//закрытие попапа с картинкой на крестик
popupWithImage.setEventListeners();

//Валидация форм
newPostValidation.enableValidation();
editAvatarValidation.enableValidation();
editProfileValidation.enableValidation();
