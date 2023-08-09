import React from "react";
import Card from "./Card.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile page__center">
        <div className="profile__person">
          <button
            className="profile__overlay"
            type="submit"
            alt="Смена аватара"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Avatar"
            ></img>
          </button>

          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name" id="profile__name">
                {currentUser.name}
              </h1>
              <button
                type="button"
                className="profile__edit-button"
                id="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle" id="profile__subtitle">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          className="profile__add-button"
          id="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements page__center" aria-label="Photos">
        {props.cards.map((element) => (
          <Card
            key={element["_id"]}
            card={element}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
