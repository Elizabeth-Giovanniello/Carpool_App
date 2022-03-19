from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Review



class UserSerializer(serializers.ModelSerializer):

    rating = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'trip', 'review_recipient', 'is_driver', 'rating', 'comment']

