from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Trip(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    departure_date = models.CharField(max_length=50)
    departure_time = models.BigIntegerField()
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    total_passenger_seats = models.IntegerField()
    seat_price = models.FloatField()
    # car = models.ForeignKey('cars.Car', on_delete=models.CASCADE)

class TripPassenger(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    seats_booked = models.IntegerField()
