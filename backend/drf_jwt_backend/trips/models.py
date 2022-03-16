from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    departure_date = models.DateField()
    arrival_date = models.DateField()
    departure_time = models.DateTimeField(auto_now_add=True)
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    available_seats = models.IntegerField()
    seat_price = models.FloatField()
    car = models.ForeignKey('cars.Car', on_delete=models.CASCADE)

class TripPassenger(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
