import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName="Сохранить"
    >
      <label className="popup__label">
        <input
          ref={avatarRef}
          id="change-avatar"
          type="url"
          placeholder="Ссылка на аватар"
          className="popup__input popup__input_change_avatar"
          name="link"
          required
        />
        <span id="change-avatar-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
