import React from "react";

function PopupWithForm({
  title,
  name,
  children,
  buttonName,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : false}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <h3 className={`popup__title popup__title_type${name}`}>{title}</h3>
        <form
          className="popup__form"
          name={`popup-form-${name}`}
          onSubmit={onSubmit}
        >
          <>{children}</>
          <button className="popup__button" type="submit" onClick={onClose}>
            {buttonName}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
