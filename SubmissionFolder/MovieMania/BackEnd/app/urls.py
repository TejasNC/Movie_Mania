from django.urls import path
from . import views #import views from the current directory.

urlpatterns = [
    path('', views.home, name= 'index'),  #so even if there is not path specified after domain.com/, the HOME page opens.
    path('login/', views.login, name= 'login'),
    path('home/', views.home, name= 'home'),
    path('search/', views.search, name= 'search'),
    path('movie/', views.movie, name= 'movie'),
    path('rating/', views.rating, name= 'rating'),
]