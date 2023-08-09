
const formValidationConfig = {
  inputSelector: ".popup__input",
  errorClass: "popup__input_type_error",
  buttonSelector: ".popup__button",
  buttonDisabled: "popup__button_disabled",
};

const profileOpenButton = document.querySelector(".profile__edit-button");
const popupOpenButton = document.querySelector(".profile__add-button");
const popupCardTitleInput = document.querySelector(".popup__input_add_place");
const popupCardLinkInput = document.querySelector(".popup__input_add_link");
const profileOvarlay = document.querySelector(".profile__overlay");

const popupName = document.querySelector(".popup__input_edit_name");
const popupProffesion = document.querySelector(".popup__input_edit_about");

const popupChangeAvatar = document.querySelector(".popup__avatar-form");
const editForm = document.querySelector(".popup__edit-form");
const addForm = document.querySelector(".popup__add-form");

const httpMethods = {
	get: 'GET',
	patch: 'PATCH',
	post: 'POST',
	delete: 'DELETE',
	put: 'PUT',
}


export {
  formValidationConfig,
  profileOpenButton,
  popupOpenButton,
  editForm,
  addForm,
  popupName,
  popupProffesion,
  popupCardTitleInput,
  popupCardLinkInput,
	popupChangeAvatar,
	profileOvarlay,
	httpMethods,
};
