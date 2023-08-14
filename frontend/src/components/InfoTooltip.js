/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import ok from "../images/ok.png";
import err from "../images/err.png";

function InfoTooltip({onClose ,result: { isOpen, successful }}) {

	return (
		<section className={`popup popup_type_info ${isOpen ? 'popup_opened' : false}`}>
			<div className="popup__container popup__container_type_info">
				<img className="popup__photo popup__photo_type_info" src={successful ? ok : err} />
				<h2 className={`popup__title popup__title_type_info`}>{successful  ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
				<button onClick={onClose} className="popup__close-button" type="button" />
			</div>
		</section>
	)
}

export default InfoTooltip