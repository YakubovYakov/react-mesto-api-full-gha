import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__action_like"
  }`;

  // -------- Обработчик клика по карточке
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleTrashClick() {
    props.onCardDelete(props.card);
  }

  return (
    // -------- Разметка JSX
    <article className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__item">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__likes-container">
          <button
            type="button"
            aria-label="Поставить Лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleTrashClick}
        id="element__delete"
      />
    </article>
  );
}

export default Card;
