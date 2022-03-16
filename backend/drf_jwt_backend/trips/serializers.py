from rest_framework import serializers
from django.contrib.auth.models import User
# from drf_jwt_backend.cars.serializers import CarSerializer
from .models import Trip, TripPassenger


class UserSerializer(serializers.ModelSerializer):
  class Meta:
     model = User
     fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number']


class TripPassengerSerializer(serializers.ModelSerializer):
    passenger = UserSerializer(many=False, read_only=True)

    class Meta:
     model = TripPassenger
     fields = ['id', 'passenger']


class TripSerializer(serializers.ModelSerializer):
    driver = UserSerializer(many=False, read_only=True)
    # car = CarSerializer(many=False, read_only=True)
    passengers = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id', 'driver', 'departure_date', 'arrival_date', 'departure_time', 'departure_city', 'arrival_city', 'available_seats', 'seat_price', 'car', 'passengers']

    def get_passengers(self, passenger):
        passengers = TripPassenger.objects.filter(passenger=passenger)
        return TripPassengerSerializer(passengers, many=True).data
