from django.urls import path, include
from trips import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('/', views.get_all_trips),
    path('<int:trip_id>/', views.get_trip),
    path('create/', views.create_trip),
    path('edit/<int:trip_id>/', views.edit_trip),
]
