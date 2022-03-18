from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CheckIn





class UserSerializer(serializers.ModelSerializer):
  class Meta:
     model = User
     fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number']

class CheckInSerializer(serializers.ModelSerializer):
    sender = UserSerializer(many=False, read_only=True)
    # trip = TripSerializer(many=False, read_only=True)

    class Meta:
     model = CheckIn
     fields = ['id', 'sender', 'trip', 'description', 'latitude', 'longitude']