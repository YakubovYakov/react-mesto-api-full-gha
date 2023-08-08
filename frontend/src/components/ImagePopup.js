import React from "react";

export default function ImagePopup(props) {
	const className = `popup popup_type_image ${props.isOpened ? "popup_opened" : ""}`;
	return (
		<div className={className}>
			<div className="popup__image-container">
				<button
					type="button"
					className="popup__close-button"
					onClick={props.onClose}
				></button>
				<img
					className="popup__image"
					id="view_photo"
					src={props.card.link}
					alt={props.card.name}
				></img>
				<h2 className="popup__caption" id="view_title">
					{" "}
					{props.card.name}{" "}
				</h2>
			</div>
		</div>
	);
}
