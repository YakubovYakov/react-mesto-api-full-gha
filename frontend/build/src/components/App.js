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

import * as auth from "../utils/auth.js";

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
  const navigate = useNavigate;
  const [cards, setCards] = React.useState([]);

  // ----------- Состояния авторизации пользователя и его данных
  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  // ----------- При загрузке страницы получам данные карточек
  React.useEffect(() => {
		if(isloggedIn) {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
		}
  }, []);

  // ----------- При загрузке страницы получам данные пользователя
  React.useEffect(() => {
		if(isloggedIn) {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
		}
  }, []);

  //----------- При загрузке страницы проверяем токен и перенаправляем пользователя
	React.useEffect(() => {
		if(localStorage.getItem("jwt")) {
			auth
					.checkToken()
					.then((res) => {
						setIsLoggedIn(true);
						navigate("/", {replace: true});
						setEmail(res.data.email)
					})
					.catch(console.error);
		}
	}, [navigate]);

  // React.useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     auth.checkToken(token).then((data) => {
  //       if (data) {
  //         setEmail(data.data.email);
  //         handleLoggedIn();
  //         navigate("/", { replace: true });
  //       }
  //     });
  //   }
  // });

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
        closeAllPopups();
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
        closeAllPopups();
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

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function handleLogin({email, password}) {
  //   auth
  //     .login({email, password})
  //     .then((res) => {
  //         setEmail(email);
	// 				setIsLoggedIn(true)
  //         navigate("/", { replace: true });
  //         localStorage.setItem("token", res.token);
        
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
	const handleLogin = () => {
		setIsLoggedIn(true);
	}

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
					<Route
						//path="/"
						element={
							<ProtectedRoute
								exact path="/"
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
        <Footer />
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
