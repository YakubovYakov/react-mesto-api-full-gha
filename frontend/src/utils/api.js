class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(response, method) {
    return response.ok
      ? response.json()
      : Promise.reject(`${method}: ${response.status}`);
  }

  getUserData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,
			}
    }).then((res) => {
      return this._checkResponse(res, "getUserData");
    });
  }

  saveUserChanges(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "saveUserChanges");
    });
  }

  changedAvatar(src, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,
			},
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => {
      return this._checkResponse(res, "changedAvatar");
    });
  }

  setUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
				...this._headers,
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
				...this._headers,
				Authorization: `Bearer ${token}`
			}
		 }).then((res) => {
      return this._checkResponse(res, "getInitialCards");
    });
  }

	postNewCard(data, token) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
        name: data.name,
				link: data.link,
      }),
    }).then((res) => {
      return this._checkResponse(res, "postNewCard");
    });
		
	}

  changeLikeCardStatus(id, isNotLiked, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,	
			},
    }).then((res) => {
      return this._checkResponse(res, "changeLikeCardStatus");
    });
  }

	deleteCard(id, token) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,	
			},
		}).then((res) => {
      return this._checkResponse(res, "deleteCard");
    });
	}

}
export const api = new Api({
  baseUrl: 'https://domainname.backendyaks.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});
