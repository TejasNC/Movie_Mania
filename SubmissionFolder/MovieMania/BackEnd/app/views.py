from django.shortcuts import render
from .models import Movie, user, Rating, genreRating #importing the tables from models.py
from django.http import JsonResponse 
import json #for parsing the json database
import os #for filepaths
from fuzzywuzzy import process #for movie recommendation algorithm

module_dir = os.path.dirname(__file__) #path to the directory of the current file.
file_path = os.path.join(module_dir, 'movies.json') #filepath of movies.json

# Create your views here.
with open(file_path) as json_file:
    movies = json.load(json_file)

#Here we are basically assigning movie_mania_rating to all the movies as 0. It is better in case of a fully populated database. But if all movies are not getting some rating from 1 to 5 i.e. some movies are left out, then the recommendations systems will not work well.
if not Movie.objects.all():
    for movie in movies:
        new_movie = Movie.objects.create(movie_name=movie['name'], movie_mania_rating=3)
        new_movie.save()

#This function takes the rank of a movie, total number of movies and returns a score based on its rank. (20% weightage)
def rank_weight(index, max_index):
  # Normalize the rank between 0 and 1.
  normalized_rank = index / max_index
  # Weight the rank based on a user-defined weightage (20% in this case).
  weight = 0.2 * (1 - normalized_rank)
  return weight 


#This function takes the IMDB Rating of the movie and returns IMDV score (20% weightage)
def imdb_weight(imdb_rating):
    # Normalize the IMDB rating between 0 and 1.
    normalized_imdb = imdb_rating / 10
    # Weight the IMDB rating based on a user-defined weightage (20% in this case).
    weight = 0.2 * normalized_imdb
    return weight


#takes in a json file and returns all the uniqe genres in the entire database
def get_unique_genres(filename):
    all_genres = []
    with open(filename, 'r') as f:
        data = json.load(f)
    for item in data:
        # Check if "genre" key exists and is a list
        if "genre" in item and isinstance(item["genre"], list):        
            all_genres.extend(item["genre"])
    genres={}
    # Get unique genres
    unique_genres = list(set(all_genres))
    for genre in all_genres:
        genres[genre] = 0
    #returns a dictionary called genres
    return genres


#this will calculate the genre score for a particular movie for a given user. (60% weightage)
def genre_score(movie_genres, genre_rating):
    #movie_genres is the list fo genres of the movie for which score is being calculated
    #genre_rating is the dictionary of genres and their ratings for the user
    sum = 0 
    for genre in movie_genres:
        sum += genre_rating.get(genre, 0)
    movie_genre_score = sum/len(movie_genres) * 0.6
    return movie_genre_score


def login(request):

    if request.method == 'POST':

        data = json.loads(request.body) #convert the json object returned in response a Python dictionary.
        username = data.get('username')
        password = data.get('password')

        try:
            user_obj = user.objects.get(user_name=username) #we get the object in the model 'user' that is associated with the username returned by the http request.

            if user_obj.user_password == password:
                response_data = {'data': 'done'}
                return JsonResponse(response_data, status=200)   
            
            else:
                response_data = {'data': 'NotDone'}
                return JsonResponse(response_data, status=409) #reutrn conflict. 
            
        except:

            new_user = user.objects.create(user_name=username, user_password=password)
            new_user.save()
            response_data = {'data': 'done'}
            return JsonResponse(response_data, status=200)

#for sending the recommendations.
def home(request):

    if request.method == 'GET':

        response_data = []

        for movie in movies[:6]:
            response_data.append({
                'index': movie['index'],
                'name': movie['name'],
                'poster': movie['poster'],
            })

        return JsonResponse(response_data, status=200, safe=False)

    if request.method == 'POST':

        data = json.loads(request.body)
        username = data.get('username')
        user_obj = user.objects.get(user_name=username) #get the row with the particular username    
        response_data = []

        #genres is a dictionary with all the keys as the unique genres and values as 0 (default)
        genres = get_unique_genres(file_path)
        sum_value = 0

        #assigning the rating for each genre for a given user
        for genre in genres.keys():
            if genreRating.objects.filter(user=user_obj, genre=genre):
                genre_rating_obj = genreRating.objects.filter(user=user_obj, genre=genre)
                length = len(genre_rating_obj)

                for g in genre_rating_obj:  
                    sum_value = sum_value + g.rating

                genres[genre] = sum_value / length

            else: #if the user has not rated any movie with that particular genre
                genres[genre] = 0
        
        #now genreating movie score of all movies for the given user.
        for movie in movies:
            rank = rank_weight(movie['index'], 249)
            imdb = imdb_weight(float(movie['rating']))
            genre = genre_score(movie['genre'], genres)
            movie_score = rank + imdb + genre
        
            response_data.append({
                'name': movie['name'],
                'poster': movie['poster'],
                'movie_mania_score': movie_score,
            })

        response_data = sorted(response_data, key=lambda x: x['movie_mania_score'], reverse=True) #sort the dictionary based on the movie_mania_score
        # print(JsonResponse(response_data[:6], status=200, safe=False))
        return JsonResponse(response_data[:6], status=200, safe=False) #return the top 6 movies.
     
        

def search(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        search_query = data.get('search_query')
        response_data = []
        ratio= []

        for movie in movies:
            similarity_ratio = process.extractOne(search_query.lower(), [movie['name'].lower()])[1]  #using the process module of fuzzywuzzy
            ratio.append(similarity_ratio) #appends the calcualed ratio to list 'ratio'

        max_index = ratio.index(max(ratio)) # max(ratio) will give the maximum ratio. The index method will index of the element with the maximum index.
        response_data.append({
            'name': movies[max_index]['name'], 
        })
        return JsonResponse(response_data, status=200, safe=False) #here we are returning a non JSON objects, so we do safe=True.

def movie(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        movie_name = data.get('movie_name')
        movie_obj = Movie.objects.get(movie_name=movie_name) #use the get method to get the movie_mania_rating from the Movie model.

        response_data = []
        for movie in movies:
            if movie['name'] == movie_name:
                response_data.append({
                    'index': movie['index'],
                    'name': movie['name'],
                    'duration': movie['duration'],
                    'rating': movie['rating'],
                    'movie_mania_rating': movie_obj.movie_mania_rating,
                    'release_year': movie['release_year'],
                    'poster': movie['poster'],
                    'summary': movie['summary'],
                    'genre': movie['genre'],
                    'directors': movie['directors'],
                    'writers': movie['writers'],
                    'languages': movie['languages'],
                    'cast': movie['cast'],
                    'metascore': movie['metascore'],
                    'imdb_page': movie['imdb_page'],
                    'trailer': movie['trailer'],
                    'reviews': movie['reviews'],
                    'reviewers': movie['reviewer'],
                })
                return JsonResponse(response_data, status=200, safe=False)
        
        response_data.append({
            'name': 'Movie not found',
        })
        return JsonResponse(response_data, status=404, safe=False)

def rating(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        movie_name = data.get('movie_name')
        user_name = data.get('username')
        rating = data.get('rating')
        
        movie_obj = Movie.objects.get(movie_name=movie_name)
        user_obj = user.objects.get(user_name=user_name)

        counter = 0
        sum_rating = 0

        for rating_obj in Rating.objects.all():
            if rating_obj.movie == movie_obj:
                if rating_obj.user == user_obj:
                    continue
                prev_rating = rating_obj.rating
                sum_rating = sum_rating + prev_rating
                counter += 1
                rating_obj.save()
        sum_rating = sum_rating + rating
        counter += 1
        movie_obj.movie_mania_rating = round(sum_rating / counter,2) 
        movie_obj.save()       
        
        try:
            new_rating = Rating.objects.get(user=user_obj, movie=movie_obj)
            new_rating.rating = rating
            new_rating.save()
        except:    
            new_rating = Rating.objects.create(user=user_obj, movie=movie_obj, rating=rating)
            new_rating.save()
        
        #  Calculate the genre rating
        for movie in movies:
            if movie['name'] == movie_name:
                genres = movie['genre']
                break
        

        for genre in genres:
            try:
                genre_rating_obj = genreRating.objects.get(user=user_obj, genre=genre, gmovie_name=movie_name)
                genre_rating_obj.rating = rating
                genre_rating_obj.save()
            except:
                genre_rating_obj = genreRating.objects.create(user=user_obj, genre=genre, rating=rating, gmovie_name=movie_name)
                genre_rating_obj.save()
            


        response_data = {'data': 'done'}
        return JsonResponse(response_data, status=200)


        




    
    
