class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._userUrl = `${this._baseUrl}/users/me`;
		this._cardsUrl = `${this._baseUrl}/cards`
    this._likesUrl = `${this._baseUrl}/cards/likes`;
    this._token = headers[`authorization`];
  }

  _checkResponse(response, method) {
    return response.ok
      ? response.json()
      : Promise.reject(`${method}: ${response.status}`);
  }

  getUserData() {
    return fetch(this._userUrl, {
			credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  saveUserChanges({ name, about }) {
    return fetch(this._userUrl, {
			credentials: 'include',
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changedAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
			credentials: 'include',
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
			credentials: 'include',
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "setUserInfo");
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        return this._checkResponse(res, "getInitialCards");
      }
    );
  }

	postNewCard({
		name,
		link
	}) {
		return fetch(this._cardsUrl, {
			credentials: 'include', 
			method: "POST",
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
			body: JSON.stringify({
        name: name,
				link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
		
	}

  changeLikeCardStatus(id, isNotLiked) {
    return fetch(`${this._likesUrl}/${id}`, {
			credentials: 'include',
      method: isNotLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

	deleteCard(id) {
		return fetch(`${this._cardsUrl}/${id}`, {
			credentials: 'include',
			method: 'DELETE',
			headers: {
				authorization: this._token,
			}
		}).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
	}

}
const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    authorization: "2ceb7c58-7c31-4d20-a44d-d2bf37d02e88",
    "Content-Type": "aaplication/json",
  },
});

export { Api, api };

