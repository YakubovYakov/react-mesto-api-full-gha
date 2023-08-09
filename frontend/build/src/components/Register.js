import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth" 

const Register = ({onSubmit}) => {
	const [userData, setUserData] = useState({
		email: '',
		password: ''
	})

	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;

		setUserData({
			...userData,
			[name]: value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(userData)

		//const { email, password } = formValue;

		// auth.register(email, password)
		// .then(() => {
		// 	navigate('/signup', {replace: true});
		// })
		//.catch(err => setErrorMessage(err))
	}
	return (
		<section className="register page__center">
			<div className="register__container">
				<h3 className="register__title">Регистрация</h3>
				<form
					className="register__form"
					name="register-form"
					noValidate
					onSubmit={handleSubmit}
				>
				<div>
					<label className="form__label">
					<input
						//value={formValue.email}
						onChange={(e) => handleChange(e)}
						className="register__input"
						type="email"
						placeholder="Email"
						name="email"
						minLength="2"
						maxLength="40"
						required
					/>
				</label>
				<label className="form__label">
					<input
						value={userData.password}
						onChange={handleChange}
						type="password"
						id="password"
						placeholder="Пароль"
						className="register__input"
						name="password"
						minLength="4"
						maxLength="10"
						required
						autoComplete="on"
						
					/>
					</label>
					</div>
	
					<button className="register__submit-btn" type="submit">
						Зарегистрироваться
					</button>
					<Link to="sign-in" className="register__link">
						Уже зарегестрированы? Войти
					</Link>
				</form>
			</div>
		</section>
	);
}

// function Register( props ) {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");

//   function handleChangeEmail(e) {
//     setEmail(e.target.value);
//   }

//   function handleChangePassword(e) {
//     setPassword(e.target.value);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const arr = {
// 			email: email,
// 			password: password,
// 		};
// 		props.onRegister(email, password)
//   }

//}

export default Register;
