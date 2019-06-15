import pyrebase

config = {
    'apiKey': "AIzaSyAsoHg1qaKkAAyLhC9Atj9gE8GozZOVhgA",
    'authDomain': "moviebuffs-9ab91.firebaseapp.com",
    'databaseURL': "https://moviebuffs-9ab91.firebaseio.com",
    'projectId': "moviebuffs-9ab91",
    'storageBucket': "moviebuffs-9ab91.appspot.com",
    'messagingSenderId': "985532246743"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
