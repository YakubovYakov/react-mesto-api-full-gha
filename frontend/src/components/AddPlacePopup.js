import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleAddName(e) {
    setName(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Создать"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          value={name}
          onChange={handleAddName}
          id="add-place"
          className="popup__input"
          type="text"
          placeholder="Название места"
          name="place"
          minLength="2"
          maxLength="30"
          required
        />

        <span className="popup__error"></span>
      </label>
      <label className="popup__label">
        <input
          value={link}
          onChange={handleAddLink}
          id="input-link"
          type="url"
          className="popup__input popup__input_add_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        ></input>
        <span className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
