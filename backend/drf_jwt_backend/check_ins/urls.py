from django.urls import path, include
from check_ins import views



urlpatterns = [
    path('view/<int:trip_id>/', views.get_all_check_ins),
    path('send/', views.send_check_in),
    path('edit/<int:check_in_id>/', views.edit_check_in),
]
