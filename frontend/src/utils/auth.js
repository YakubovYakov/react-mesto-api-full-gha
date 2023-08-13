//export const BASE_URL = "http://localhost:3001";

export const BASE_URL = "http://localhost:3000";

const checkResponce = (res) => 
	res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} `)

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res))
};

export const login = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
      'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then(res => checkResponce(res))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "appliccation/json",
      "Authorization": `Bearer ${token}`
    },
  })
	.then(res => checkResponce(res))
};
