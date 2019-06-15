from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('movies/', get_user_movies, name='user_movies'),
    path('add_movie/', add_user_movie, name='add_movie'),
    path('delete_movie/', delete_user_movie, name='delete_movie'),
    path('recommended_movies/', get_recommended_movies, name='recommended_movies'),
    path('google_register/', google_register_user, name='google_register')
]
