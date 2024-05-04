from django.db import models


# Create your models here.

#Movie model which is used for storing movie_mania rating of the movie
class Movie(models.Model):
    movie_name = models.CharField(max_length=200) #Column for Name of the movie
    movie_mania_rating = models.FloatField() #Column for the rating of the movie
    def __str__(self):
        return self.movie_name


class user(models.Model):
    user_name = models.CharField(max_length=200, unique=True) #Column for the User Name, userrname should be unique
    user_password = models.CharField(max_length=200) #Column for the password of the user
    def __str__(self):
        return self.user_name

class Rating(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE) #This is inked with Foriengn Key to 'user' model
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE) #This column is linked wit Foreign Key to 'Movie' model
    rating = models.IntegerField()
    def __str__(self):
        return self.rating

class genreRating(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE) 
    genre = models.CharField(max_length=200)
    rating = models.FloatField()
    gmovie_name = models.CharField(max_length=200)
    def __str__(self):
        return self.genre