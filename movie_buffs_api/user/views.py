from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from rest_framework import status
from .firebase_config import db, auth
import random
import requests

constants = {
    'omdb_api': 'http://www.omdbapi.com/?apikey=b467032&',
    'tmdb_api': 'https://api.themoviedb.org/3/movie/popular/?api_key=f7048614c1bd3c0ecba329bc8d08bdbc&language=en-US&'
}


@csrf_exempt
def register(request):
    if request.method == 'POST':
        fields = JSONParser().parse(request)
        data = {
            'first_name': fields['first_name'],
            'last_name': fields['last_name'],
            'age': fields['age'],
            'movies': {}
        }
        try:
            user = auth.create_user_with_email_and_password(fields['email'], fields['password'])
            db.child('users').child(user['localId']).set(data)
            return JsonResponse(user, status=status.HTTP_201_CREATED, safe=False)
        except requests.HTTPError as e:
            response = e.args[0].response
            error_message = response.json()['error']['errors'][0]['message']
            error_status = {"Error": error_message}
            return JsonResponse(error_status, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def google_register_user(request):
    if request.method == 'POST':
        fields = JSONParser().parse(request)
        if db.child('users').child(fields['uid']):
            return JsonResponse({}, status=status.HTTP_201_CREATED, safe=False)
        data = {
            'first_name': fields['first_name'],
            'last_name': fields['last_name'],
            'age': fields['age'],
        }
        try:
            db.child('users').child(fields['uid']).set(data)
            return JsonResponse({}, status=status.HTTP_201_CREATED, safe=False)
        except requests.HTTPError as e:
            print(e)
            response = e.args[0].response
            error_message = response.json()['error']['errors'][0]['message']
            error_status = {"Error": error_message}
            return JsonResponse(error_status, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        fields = JSONParser().parse(request)
        data = {
            'email': fields['email'],
            'password': fields['password']
        }
        try:
            user = auth.sign_in_with_email_and_password(data['email'], data['password'])
            user['user_name'] = db.child('users').child(user['localId']).child('first_name').get().val()
            return JsonResponse(user, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            response = e.args[0].response
            error_message = response.json()['error']['errors'][0]['message']
            error_status = {"Error": error_message}
            return JsonResponse(error_status, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def logout(request):
    if request.method == 'GET':
        refresh_token = request.GET.get('refresh_token', '')
        auth.refresh(refresh_token)
        return JsonResponse({'logout': True}, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def get_user_movies(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id', '')
        try:
            user_movies = list(db.child('users').child(user_id).child('movies').get().val().values())
            return JsonResponse(user_movies, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse(e, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def add_user_movie(request):
    if request.method == 'PUT':
        user_id = request.GET.get('user_id', '')
        imdb_id = request.GET.get('imdb_id', '')
        try:
            if db.child('movies').child(imdb_id).get().val():
                movie = db.child('movies').child(imdb_id).get().val()
            else:
                movie = requests.get(constants['omdb_api'] + 'i=' + imdb_id).json()
            db.child('users').child(user_id).child('movies').child(imdb_id).set(movie)
            return JsonResponse({'added movie': True}, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse(e, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def delete_user_movie(request):
    if request.method == 'DELETE':
        user_id = request.GET.get('user_id', '')
        imdb_id = request.GET.get('imdb_id', '')
        try:
            db.child('users').child(user_id).child('movies').child(imdb_id).remove()
            return JsonResponse({'deleted movie': True}, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse(e, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def get_recommended_movies(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id', '')
        recommended_movies = db.child('users').child(user_id).child('recommended_movies').get().val()
        if recommended_movies:
            return JsonResponse(recommended_movies, status=status.HTTP_200_OK, safe=False)
        pages = list()
        for p in range(1, 20):
            pages.append(p)
        page = str(random.choice(pages))
        try:
            tmdb_movies = random.sample(requests.get(constants['tmdb_api'] + 'page=' + page).json()['results'], 4)
            recommended_movies = dict()
            for movie in tmdb_movies:
                try:
                    movies_per_search_term = \
                        requests.get(constants['omdb_api'] + "s=" + movie['original_title']).json()[
                            'Search']
                    for searched_movie in movies_per_search_term:
                        if len(recommended_movies.keys()) >= 4:
                            break
                        if searched_movie['Poster'] != 'N/A':
                            recommended_movies[searched_movie['imdbID']] = searched_movie
                except:
                    pass
            db.child('users').child(user_id).child('recommended_movies').set(recommended_movies)
            return JsonResponse(recommended_movies, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse(e, status=status.HTTP_400_BAD_REQUEST, safe=False)
