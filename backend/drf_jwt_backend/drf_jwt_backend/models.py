from django.db import models
from django.contrib.auth.models import User


class Car(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    license_plate = models.CharField(max_length=10)
    color = models.CharField(max_length=50)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    name = models.CharField(null=True, void=True)

class Trip(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)
    departure_date = models.DateField()
    arrival_date = models.DateField()
    departure_time = models.DateTimeField(auto_now_add=True)
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    available_seats = models.IntegerField()
    seat_price = models.FloatField()
    car = models.ForeignKey(Car, on_delete=models.CASCADE)

    class Meta:
        abstract = True

class TripPassenger(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        abstract = True

class CheckIn(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        abstract = True

class Review(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    is_reviewer = models.BooleanField(default=False)
    rating = models.FloatField()
    comment = models.CharField(max_length=750)

    class Meta:
        abstract = True


