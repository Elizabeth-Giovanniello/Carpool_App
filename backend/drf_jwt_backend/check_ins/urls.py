from django.urls import path, include
from trips import views



urlpatterns = [
    path('edit/<int:trip_id>/', views.edit_trip),
]
