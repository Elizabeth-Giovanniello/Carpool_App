from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Review
from .serializers import ReviewSerializer
from django.contrib.auth.models import User

GET = 'GET'
POST = 'POST'
PUT = 'PUT'
DELETE = 'DELETE'


@api_view([GET])
@permission_classes([AllowAny])
def get_reviews_of_user(request, user_id):
  reviews = Review.objects.filter(review_recipient=user_id)
  serializer = ReviewSerializer(reviews, many=True)
  return Response(serializer.data)

@api_view([GET])
@permission_classes([IsAuthenticated])
def get_reviews_given_by_user(request):
  reviews = Review.objects.filter(reviewer=request.user)
  serializer = ReviewSerializer(reviews, many=True)
  return Response(serializer.data)

@api_view([POST])
@permission_classes([IsAuthenticated])
def submit_review(request):
  serializer = ReviewSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(reviewer=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



