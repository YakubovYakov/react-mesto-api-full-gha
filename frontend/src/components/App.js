import React from "react";

import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import Card from "./Card";
import { useState } from "react";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  // ---------- Стейты
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopup, setIsAddPlacePopup] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isOpenedImage, setIsOpenedImage] = React.useState(false);
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] =
    React.useState({ isOpen: false, card: {} });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardClick = (card) => {
    setIsOpenedImage(true);
    setSelectedCard(card);
  };

  // ---------- Обработчик открытия попапа обновления аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // ---------- Обработчик открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // ---------- Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  function handleDeletePlace(card) {
    setSelectedCardDeleteConfirm({
      ...selectedCardDeleteConfirm,
      isOpen: true,
      card: card,
    });
  }

  // ----------- Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopup(false);
    //setIsOpenedDelete(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setSelectedCardDeleteConfirm({
      ...selectedCardDeleteConfirm,
      isOpen: false,
    });
    setIsOpenedImage(false);
  }
  //------------- Изменение данных пользователя
  function handleUpdateUser(newUserData) {
    api
      .saveUserChanges(newUserData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------- Добавление новой карточки
  function handleAddPlaceSubmit(cardData) {
    api
      .postNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
				closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------- Изменение аватара пользователя
  function handleUpdateAvatar(newAvatarLink) {
    api
      .changedAvatar(newAvatarLink)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
				closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------- Постановка и снятие лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------ Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ----------- Разметка JSX
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <ImagePopup
          isOpened={isOpenedImage}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onDeleteCard={handleCardDelete}
        />
        {/* <PopupWithForm
          title="Вы уверены?"
          name="delete"
          isOpened={isOpenedDelete}
          onClose={closeAllPopups}
          //buttonName="ДА"
        >
          <button className="popup__button" id="delete-button" type="submit">
            ДА
          </button>
        </PopupWithForm> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
