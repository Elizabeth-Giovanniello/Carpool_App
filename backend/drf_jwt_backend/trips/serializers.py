from rest_framework import serializers
from django.contrib.auth.models import User

from reviews.models import Review
# from drf_jwt_backend.cars.serializers import CarSerializer
from .models import Trip, TripPassenger
from django.db.models import Avg
from django.http import JsonResponse


# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = ['rating']

class UserSerializer(serializers.ModelSerializer):

    # rating = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name']
    
#     def get_rating(self, driver):
#         rating = Review.objects.filter(review_recipient=driver).aggregate(Avg('rating')).values()
#         rating = JsonResponse({"models_to_return": list(rating)})
#         return ReviewSerializer(rating).data


# def get_rating(driver):
#     rating = Review.objects.filter(review_recipient=driver).aggregate(Avg('rating')).values()
    
# rating = get_rating(6)
# print(rating)

class TripPassengerSerializer(serializers.ModelSerializer):
    passenger = UserSerializer(many=False, read_only=True)

    class Meta:
     model = TripPassenger
     fields = ['id', 'trip', 'passenger', 'seats_booked']


class TripSerializer(serializers.ModelSerializer):
    driver = UserSerializer(many=False, read_only=True)
    # car = CarSerializer(many=False, read_only=True)
    passengers = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id', 'driver', 'departure_date', 'departure_time', 'departure_city', 'arrival_city', 'total_passenger_seats', 'seat_price', 'passengers']

    def get_passengers(self, id):
        passengers = TripPassenger.objects.filter(trip=id)
        return TripPassengerSerializer(passengers, many=True).data

