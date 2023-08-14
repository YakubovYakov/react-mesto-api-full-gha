import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import Card from "./Card";
import { useState } from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";

import * as auth from "../utils/auth";

function App() {
  // ---------- Стейты
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopup, setIsAddPlacePopup] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isOpenedImage, setIsOpenedImage] = React.useState(false);
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] = React.useState({ isOpen: false, card: {} });
	const [isInfoTooltip, setInfoTooltip]	= React.useState({isOpen: false, successful: false});

  const navigate = useNavigate();
  const [cards, setCards] = React.useState([]);

  // ----------- Состояния авторизации пользователя и его данных
  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  // ----------- При загрузке страницы получам данные карточек
  React.useEffect(() => {
		const jwt = localStorage.getItem('token');
		if(isloggedIn) {
    api.getInitialCards(jwt)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api.getUserData(jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
		}
  }, [isloggedIn]);

  //----------- При загрузке страницы проверяем токен и перенаправляем пользователя
	React.useEffect(() => {
		const jwt = localStorage.getItem('token');
			auth
					.checkToken(jwt)
					.then((res) => {
            if(res) {
              setIsLoggedIn(true);
						  navigate("/", {replace: true});
              setCurrentUser(res);
						  setEmail(res.email)
            } else {
              setIsLoggedIn(false);
						}
					})
					.catch(console.error);
		
	}, []);


  function handleLoggedIn() {
    setIsLoggedIn(true);
  }

  function handleCardClick(card) {
    setIsOpenedImage(true);
    setSelectedCard(card);
  }

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

	function handleInfoTooltip(result) {
		setInfoTooltip({...isInfoTooltip, isOpen: true, successful: result})
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
		setInfoTooltip(false);
  }
  //------------- Изменение данных пользователя
  function handleUpdateUser(newUserData) {
    const jwt = localStorage.getItem('token');
    api
      .saveUserChanges(newUserData, jwt)
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
    const jwt = localStorage.getItem('token');
    api
      .postNewCard(cardData, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------- Изменение аватара пользователя
  function handleUpdateAvatar(newAvatarLink) {
    const jwt = localStorage.getItem('token');
    api.changedAvatar(newAvatarLink, jwt)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------- Постановка и снятие лайка
  function handleCardLike(card) {
    const jwt = localStorage.getItem('token');
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
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
    const jwt = localStorage.getItem('token');
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
				handleInfoTooltip(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
				handleInfoTooltip(false);
      });
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
	// const handleLogin = () => {
	// 	setIsLoggedIn(true);
	// }

  function handleSighOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  }

  // ----------- Разметка JSX
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser || ""}>
        <Header />
				<Routes>
					<Route path="/"
						element={
							<ProtectedRoute
								// exact path="/"
								component={Main}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDelete}
								cards={cards} 
								isloggedIn={isloggedIn}
						/>}
					/>

          <Route
            path="*"
            element={
              isloggedIn ? (
                <Navigate to="/" replace/>
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />

          <Route
            path="/sign-up"
            element={<Register onSubmit={handleRegister} />}
          />

          <Route path="/sign-in" 
					element={
						<Login handleLogin={handleLogin} />
					} />
        </Routes>

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
				<InfoTooltip result={isInfoTooltip} onClose={closeAllPopups} />
        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          // isOpened={isOpenedDelete}
          onClose={closeAllPopups}
          //buttonName="ДА"
        >
          <button className="popup__button" id="delete-button" type="submit">
            ДА
          </button>
        </PopupWithForm>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
