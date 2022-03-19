from rest_framework import serializers
from django.contrib.auth.models import User

# from drf_jwt_backend.reviews.models import Review
# from drf_jwt_backend.cars.serializers import CarSerializer
from .models import Trip, TripPassenger
from django.db.models import Avg



class UserSerializer(serializers.ModelSerializer):

    rating = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'overall_rating']
    
    # def get_user_rating(self):
    #     rating = Review.objects.filter(driver=self.id, is_reviewer=False).aggregate(Avg('rating'))['rating_avg']
    #     return RatingSerializer(rating)


# class RatingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = ['rating']

    


class TripPassengerSerializer(serializers.ModelSerializer):
    passenger = UserSerializer(many=False, read_only=True)

    class Meta:
     model = TripPassenger
     fields = ['id', 'passenger']


class TripSerializer(serializers.ModelSerializer):
    driver = UserSerializer(many=False, read_only=True)
    # car = CarSerializer(many=False, read_only=True)
    # passengers = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id', 'driver', 'departure_date', 'departure_time', 'departure_city', 'arrival_city', 'available_seats', 'seat_price']

    def get_passengers(self, passenger):
        passengers = TripPassenger.objects.filter(passenger=passenger)
        return TripPassengerSerializer(passengers, many=True).data

