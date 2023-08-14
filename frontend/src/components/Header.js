import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header({ email, handleSighOut }) {
  return (
    <header className="header">
      <div className="header__box">
        <div className="header__logo" />
        <div className="header__info-container">
          <p className="header__text">{email}</p>
          <Routes>
            <Route
              path="/"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/sign-in"
                  onClick={handleSighOut}
                >
                  Выйти
                </NavLink>
              }
            />
            <Route
              path="/sign-up"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/sign-in"
                >
                  Войти
                </NavLink>
              }
            />
            <Route
              path="/sign-in"
              element={
                <NavLink
                  className="header__text header__link-text"
                  to="/sign-up"
                >
                  Регистрация
                </NavLink>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}

export default Header;