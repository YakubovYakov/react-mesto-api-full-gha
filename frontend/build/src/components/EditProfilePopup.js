import React from "react";
import PopupWithForm from "./PopupWithForm";
import App from "./App";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      //isOpened={isOpenedEdit}
      onClose={props.onClose}
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          value={name || ""}
          onChange={handleChangeName}
          id="name"
          className="popup__input"
          type="text"
          placeholder="Имя"
          name="Name"
          minLength="2"
          maxLength="40"
          required
        />

        <span className="popup__error popup__error-type-name"></span>
      </label>
      <label className="popup__label">
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          id="job"
          className="popup__input"
          type="text"
          placeholder="О себе"
          name="Description"
          minLength="2"
          maxLength="200"
          required
        />

        <span className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
