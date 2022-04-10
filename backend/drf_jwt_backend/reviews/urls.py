from django.urls import path, include
from reviews import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('check/', views.get_reviews_given_by_user),
    path('<int:user_id>/', views.get_reviews_of_user),
    path('submit/', views.submit_review),
]
