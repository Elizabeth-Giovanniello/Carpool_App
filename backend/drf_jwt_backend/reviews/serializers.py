from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Review



class UserSerializer(serializers.ModelSerializer):

    rating = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'first_name', 'avatar_color']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'trip', 'review_recipient', 'is_driver', 'rating', 'comment']

