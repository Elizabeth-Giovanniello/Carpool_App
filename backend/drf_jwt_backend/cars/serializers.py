from rest_framework import serializers
from .models import Car
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
  class Meta:
     model = User
     fields = ['id', 'username', 'first_name', 'last_name', 'email']

class CarSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Car
        fields = ['id', 'owner', 'license_plate', 'color', 'make', 'model', 'year', 'name']






# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


# class CarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Car
#         fields = ['id', 'make', 'model', 'year', 'user_id']
#         depth = 1
