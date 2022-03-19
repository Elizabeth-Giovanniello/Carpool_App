from django.urls import path, include
from reviews import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<int:user_id>/', views.get_all_user_reviews),
    path('submit/', views.submit_review),
]
