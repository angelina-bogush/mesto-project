export class Card {
  constructor({
    title,
    ownerId,
    link,
    cardId,
    userId,
    likes,
    cardSelector,
    handleAddLikeClick,
    handleRemoveLikeClick,
    handleDeleteClick,
    handleCardClick,
  }) {
    this._title = title;
    this._link = link;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._userId = userId;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
    this.clickButtonDelete = this.clickButtonDelete.bind(this);
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _showDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector(".card__trash").remove();
    }
  }
  setLike() {
    this._like.classList.toggle("card__like_active");
  }
  _handleLike() {
    if (!this._like.classList.contains("card__like_active")) {
      this._handleAddLikeClick();
    } else {
      this._handleRemoveLikeClick();
    }
  }
  showLikeCount(arrayLikes) {
    this._likeCounter.textContent = arrayLikes;
  }
  _showMyLike() {
    if (this._likes.find((item) => this._userId === item._id)) {
      this._like.classList.add("card__like_active");
    }
  }
  generate() {
    this._element = this._getElement();
    this._like = this._element.querySelector(".card__like");
    this._likeCounter = this._element.querySelector(".card__like-count");
    this._cardImage = this._element.querySelector(".card__image");

    this._setEventListeners();
    this._showDeleteButton();
    this.showLikeCount(this._likes.length);
    this._showMyLike();

    this._cardImage.src = this._link;
    //название карточки
    this._element.querySelector(".card__title").textContent = this._title;
    this._cardImage.alt = this._title;

    return this._element;
  }
  clickButtonDelete() {
    this._element.remove();
  }
  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);

    this._like.addEventListener("click", () => {
      this._handleLike();
    });
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
  }
}
