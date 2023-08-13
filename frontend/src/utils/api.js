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

  getUserData(token) {
    return fetch(`users/me`, {
      headers: {
				...this.headers,
				Authorization: `Bearer ${token}`
			}
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  saveUserChanges({ name, about, token }) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
				headers: {
					...this.headers,
					Authorization: `Bearer ${token}`,
				}
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

  changedAvatar(src, token) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: {
				...this.headers,
				Authorization: `Bearer ${token}`,
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

  setUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
				...this.headers,
				Authorization: `Bearer ${token}`,	
			},
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "setUserInfo");
    });
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, { 
			headers: {
				...this.headers,
				Authorization: `Bearer ${token}`
			}
		 })
			.then(
      (res) => {
        return this._checkResponse(res, "getInitialCards");
      }
    );
  }

	postNewCard({
		name,
		link,
		token
	}) {
		return fetch(this._cardsUrl, {
			method: "POST",
			headers: {
				...this.headers,
				Authorization: `Bearer ${token}`,	
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

  changeLikeCardStatus(id, isNotLiked, token) {
    return fetch(`${this._likesUrl}/${id}`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: {
				...this.headers,
				Authorization: `Bearer ${token}`,	
			},
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

	deleteCard(id, token) {
		return fetch(`${this._cardsUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				...this.headers,
				Authorization: `Bearer ${token}`,	
			},
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
    "Content-Type": "application/json",
  },
});

export { Api, api };

