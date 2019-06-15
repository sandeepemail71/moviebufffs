# Register 
### Endpoint: http://127.0.0.1:8000/user/register/
#### Method: POST
``` javascript 
params: {}
headers: {}
body: {
    'first_name': 'Rahul',
    'last_name': 'Pugal',
    'age': 23,
    'email': 'rahul.pugal@mountblue.io',
    'password': 'admin123'
}
response: {
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAwOTZhZDZm...",
    "registered": true,
    "email": "rahul.pugal@mountblue.io",
    "displayName": "",
    "localId": "unH8lg8HqWVVDifVlFOoskcznnp2",
    "refreshToken": "AK2wQ-yu-tnhBAEMmNPk2Rz2gq8t_OwBvAG...",
    "expiresIn": "3600",
    "kind": "identitytoolkit#VerifyPasswordResponse"    
}
```
***

# Login
### Endpoint: http://127.0.0.1:8000/user/login/
#### Method: POST
``` javascript
params: {}
headers: {}
body: {
    'email': 'rahul.pugal@mountblue.io',
    'password': 'admin123'
}
response: {
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAwOTZhZDZm...",
    "registered": true,
    "email": "rahul.pugal@mountblue.io",
    "displayName": "",
    "localId": "unH8lg8HqWVVDifVlFOoskcznnp2",
    "refreshToken": "AK2wQ-yrjNxyf7zCiv87fNnWCfSRmW3eH4K...",
    "expiresIn": "3600",
    "kind": "identitytoolkit#VerifyPasswordResponse"
}
```
***

# Logout
### Endpoint: http://127.0.0.1:8000/user/logout/
#### Method: GET
``` javascript
params: {
    "refresh_token": "AK2wQ-yrjNxyf7zCiv87fNnWCfSRmW3eH4..."
}
headers: {}
body: {}
response: {
    "logout": true,
}
```
***

# User's movies
### Endpoint: http://127.0.0.1:8000/user/movies/
#### Method: GET
``` javascript
params: {
    "user_id": "unH8lg8HqWVVDifVlFOoskcznnp2"
}
headers: {}
body: {}
response: {
    "tt0468569": {
        "BoxOffice": "$533,316,061",
        "Website": "http://thedarkknight.warnerbros.com/",
        "Ratings": [
            {
                "Value": "9.0/10",
                "Source": "Internet Movie Database"
            },
            {
                "Value": "94%",
                "Source": "Rotten Tomatoes"
            },
            {
                "Value": "82/100",
                "Source": "Metacritic"
            }
        ],
        "Plot": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "Production": "Warner Bros. Pictures/Legendary",
        "Country": "USA, UK",
        "Language": "English, Mandarin",
        "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
        "Released": "18 Jul 2008",
        "Awards": "Won 2 Oscars. Another 152 wins & 155 nominations.",
        "imdbRating": "9.0",
        "imdbVotes": "1,928,558",
        "Director": "Christopher Nolan",
        "Rated": "PG-13",
        "Poster": "https://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        "Metascore": "82",
        "Type": "movie",
        "imdbID": "tt0468569",
        "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
        "Year": "2008",
        "Runtime": "152 min",
        "DVD": "09 Dec 2008",
        "Response": "True",
        "Genre": "Action, Crime, Drama",
        "Title": "The Dark Knight"
    }
}
```

# Add movie to user
### Endpoint:  http://127.0.0.1:8000/user/add_movie/
#### Method: PUT
``` javascript
params: {
    "user_id": "unH8lg8HqWVVDifVlFOoskcznnp2",
    "imdb_id": "tt0416449"
}
headers: {}
body: {}
response: {
    "added movie": true
}
```
***

# Search movie by title
### Endpoint: http://127.0.0.1:8000/movies/search_title/
#### Method: GET
``` javascript
params: {
    "title": "The dark knignt"
}
header: {}
body: {}
response: [
    {
        "Year": "2008",
        "Title": "The Dark Knight",
        "Poster": "https://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        "Type": "movie",
        "imdbID": "tt0468569"
    },
    {
        "Year": "2012",
        "Title": "The Dark Knight Rises",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg",
        "Type": "movie",
        "imdbID": "tt1345836"
    }
]
```
> *note: This call can give 'n' number of results
***

# Search movie by ID
### Endpoint: http://127.0.0.1:8000/movies/search_title/
#### Method: GET
``` javascript
params: {
    "imdb_id": "tt0468569"
}
headers: {}
body: {}
response: {
    "movie": {
        "trailer": "http://www.youtube.com/watch?v=EXeTwQWrcwY",
        "Country": "USA, UK",
        "Awards": "Won 2 Oscars. Another 152 wins & 155 nominations.",
        "Type": "movie",
        "Runtime": "152 min",
        "Website": "http://thedarkknight.warnerbros.com/",
        "Metascore": "82",
        "Year": "2008",
        "Ratings": [
            {
                "Value": "9.0/10",
                "Source": "Internet Movie Database"
            },
            {
                "Value": "94%",
                "Source": "Rotten Tomatoes"
            },
            {
                "Value": "82/100",
                "Source": "Metacritic"
            }
        ],
        "Genre": "Action, Crime, Drama",
        "Director": "Christopher Nolan",
        "Production": "Warner Bros. Pictures/Legendary",
        "imdbVotes": "1,928,558",
        "DVD": "09 Dec 2008",
        "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
        "Title": "The Dark Knight",
        "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
        "Plot": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "Rated": "PG-13",
        "imdbID": "tt0468569",
        "Response": "True",
        "BoxOffice": "$533,316,061",
        "Released": "18 Jul 2008",
        "Language": "English, Mandarin",
        "Poster": "https://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        "imdbRating": "9.0"
    }
} 
```
***
