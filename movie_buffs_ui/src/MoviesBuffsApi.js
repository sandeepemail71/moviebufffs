// export const api = "http://127.0.0.1:8000"
export const api = "https://rahulpugal.pythonanywhere.com/"


export const register = (firstName, lastName, age, email, password) => {
	return fetch(`${api}/user/register/`, {
		method: 'POST',
		body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			age: age,
			email: email,
			password: password
		})
	})
	.then((response) => {
		return response.json()
	})
}

export const login = (email, password) => {
	return fetch(`${api}/user/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
	.then((response) => {
		return response.json()
	})

}

export const logout = (refreshToken) => {
	return fetch(`${api}/user/logout/?refresh_token=${refreshToken}`, {
		method: 'GET'
	})
	.then((response) => {
		return response.json()
	})
}

export const getUserMovies = (user_id) => {
	return fetch(`${api}/user/movies/?user_id=${user_id}`, {
		method: 'GET'
	})
	.then((response) => {
		return response.json()
	})
}

export const addUserMovie = (user_id, imdb_id) => {
	return fetch(`${api}/user/add_movie/?user_id=${user_id}&imdb_id=${imdb_id}`, {
		method: 'PUT'
	})
	.then((response) => {
		return response.json()
	}) 
}

export const searchTitle = (title) => {
	return fetch(`${api}/movies/search_title/?title=${title}`, {
		method: 'GET'
	})
	.then((response) => {
		return response.json()
	})
}

export const searchId = (imdb_id) => {
	return fetch(`${api}/movies/search_id/?imdb_id=${imdb_id}`, {
		method: 'GET'
	})
	.then((response) => {
		return response.json()
	})
}

export const recommendedMovies = (user_id) => {
	return fetch(`${api}/user/recommended_movies/?user_id=${user_id}`, {
		method: 'GET'
	})
	.then((response) => {
		return response.json()
	})
}

export const upcomingMovies = () => {
	return fetch(`${api}/movies/upcoming_movies/`, {
		method: 'GET'
	})
	.then((response) => {
		return response.json()
	})
}

export const googleRegister = (user) => {
	return fetch(`${api}/user/google_register/`, {
		method: 'POST',
		body: JSON.stringify({
			'uid': user.user.uid,
			'first_name': user.additionalUserInfo.profile.given_name,
      		'last_name': user.additionalUserInfo.profile.family_name,
      		'age': 22
		})
	})
}

export const addReview = (reviewData) => {
	return fetch(`${api}/movies/add_review/`, {
		method: 'POST',
		body: JSON.stringify({
			'user_id': reviewData.user_id,
			'imdb_id': reviewData.imdb_id,
			'text': reviewData.text
		})
	})
}
export const deleteUserMovie = (user_id, imdb_id) => {
	return fetch(`${api}/user/delete_movie/?user_id=${user_id}&imdb_id=${imdb_id}`, {
		method: 'DELETE'
	})
	.then((response) => {
		return response.json()
	}) 
}