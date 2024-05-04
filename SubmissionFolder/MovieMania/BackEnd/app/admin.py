from django.contrib import admin
from .models import user, Movie, Rating, genreRating

admin.site.register(user)
admin.site.register(Movie)
admin.site.register(Rating)
admin.site.register(genreRating)
# Register your models here.
