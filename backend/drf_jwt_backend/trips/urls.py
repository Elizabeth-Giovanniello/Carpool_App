from django.urls import path, include
from trips import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('search/<str:departure_city>/<str:arrival_city>/<str:departure_date>/', views.get_all_trips),
    path('<int:trip_id>/', views.get_trip),
    path('create/', views.create_trip),
    path('edit/<int:trip_id>/', views.edit_trip),
    path('book/', views.book_trip),
    path('revise-booking/<int:pk>/', views.edit_booking),
]
