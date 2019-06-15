from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from rest_framework import status
import requests
from .firebase_config import db
from urllib import request as req
import re

constants = {
    'omdb_api': 'http://www.omdbapi.com/?apikey=b467032&',
    'tmdb_api': 'https://api.themoviedb.org/3/movie/popular/?api_key=f7048614c1bd3c0ecba329bc8d08bdbc&language=en-US&',
    'youtube_search': 'https://www.youtube.com/results?search_query=',
    'youtube_embed': 'https://www.youtube.com/embed/'
}


@csrf_exempt
def get_trailer_youtube_url(title):
    title = title.replace(' ', '+') + '+trailer'
    html_content = req.urlopen(constants['youtube_search'] + title)
    search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read().decode())
    trailer_youtube_url = constants['youtube_embed'] + str(search_results[0])
    return trailer_youtube_url


@csrf_exempt
def search_by_id(request):
    if request.method == 'GET':
        imdb_id = request.GET.get('imdb_id', '')
        movie = db.child('movies').child(imdb_id).get().val()
        if movie:
            return JsonResponse({'movie': movie}, status=status.HTTP_200_OK, safe=False)
        movie = requests.get(constants['omdb_api'] + "i=" + imdb_id).json()
        trailer_youtube_url = get_trailer_youtube_url(movie['Title'])
        movie['trailer'] = trailer_youtube_url
        db.child('movies').child(imdb_id).set(movie)
        return JsonResponse({'movie': movie}, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def search_by_title(request):
    if request.method == 'GET':
        title = request.GET.get('title', '')
        movies = requests.get(constants['omdb_api'] + "s=" + title)
        return JsonResponse(movies.json()['Search'], status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def get_upcoming_movies(request):
    if request.method == 'GET':
        upcoming_movies = db.child('upcoming_movies').get().val()
        if upcoming_movies:
            return JsonResponse(upcoming_movies, status=status.HTTP_200_OK, safe=False)
        movies = list()
        for i in range(1, 10):
            movies += requests.get(constants['tmdb_api'] + 'page=' + str(i)).json()['results']
        upcoming_movies = dict()
        for movie in movies:
            try:
                movies_per_search_term = \
                    requests.get(constants['omdb_api'] + "s=" + movie['original_title']).json()[
                        'Search']
                for searched_movie in movies_per_search_term:
                    if searched_movie['Year'] == '2018':
                        upcoming_movies[searched_movie['imdbID']] = searched_movie
                        break
                if len(upcoming_movies.keys()) >= 12:
                    break
            except:
                pass
        db.child('upcoming_movies').set(upcoming_movies)
        return JsonResponse(upcoming_movies, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        review_data = JSONParser().parse(request)
        try:
            user_reviews = db.child('movies').child(review_data['imdb_id']).child('reviews').child(
                review_data['user_id']).get().val()
            if user_reviews:
                reviews = db.child('movies').child(review_data['imdb_id']).child('reviews').child(
                    review_data['user_id']).child('review').get().val()
                reviews.append(review_data['text'])
                db.child('movies').child(review_data['imdb_id']).child('reviews').child(review_data['user_id']).child(
                    'review').set(reviews)
            else:
                data = {
                    'user_name': db.child('users').child(review_data['user_id']).child('first_name').get().val(),
                    'review': [review_data['text']]
                }
                db.child('movies').child(review_data['imdb_id']).child('reviews').child(review_data['user_id']).set(
                    data)
            return JsonResponse({}, status=status.HTTP_201_CREATED, safe=False)
        except Exception as e:
            return JsonResponse(e, status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def get_currently_playing_movies(request):
    if request.method == 'GET':
        currently_playing = db.child('currently_playing').get().val()
        if not currently_playing:
            now_showing_regex = '{"event":"productClick","ecommerce":{"currencyCode":"INR","click":{"actionField":{"list":"Filter Impression:category\\\/now showing"},"products":\[{"name":"(.*?)","id":"(.*?)","category":"(.*?)","variant":"(.*?)","position":(.*?),"dimension13":"(.*?)"}\]}}}'
            url = "https://in.bookmyshow.com/Bengaluru/movies"
            html = req.urlopen(url).read().decode()
            currently_playing = re.findall(now_showing_regex, html)
            print(currently_playing)
            for movie in currently_playing:
                movie_data = {
                    'title': list(movie)[0],
                    'bms_id': list(movie)[1]
                }
                movies = requests.get(constants['omdb_api'] + "s=" + movie_data['title'])
                if 'Error' not in movies.json():
                    imdb_id = movies.json()['Search'][0]['imdbID']
                    db.child('currently_playing').child(imdb_id).set(movie_data['bms_id'])
        currently_playing = dict(db.child('currently_playing').get().val())
        movies = dict(db.child('movies').get().val())
        for movie in movies.keys():
            if movie not in currently_playing.keys():
                movies[movie]['currently_playing'] = False
            else:
                movies[movie]['currently_playing'] = True
                movies[movie]['bms_id'] = currently_playing[movie]
        db.child('movies').set(movies)
        return JsonResponse({}, status=status.HTTP_200_OK, safe=False)


# delete reviews
# movies = dict(db.child('movies').get().val())
# for movie in movies.keys():
#     if 'reviews' in movies[movie].keys():
#         del movies[movie]['reviews']
# db.child('movies').set(movies)
# return JsonResponse({}, status=status.HTTP_201_CREATED, safe=False)
