from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Trip, TripPassenger
from .serializers import TripPassengerSerializer, TripSerializer
from django.contrib.auth.models import User

GET = 'GET'
POST = 'POST'
PUT = 'PUT'
DELETE = 'DELETE'


#TRIPS

@api_view([GET])
@permission_classes([AllowAny])
def get_all_trips(request, departure_city, arrival_city, departure_date):
  trips = Trip.objects.filter(arrival_city = arrival_city, departure_city = departure_city, departure_date = departure_date)
  serializer = TripSerializer(trips, many=True)
  return Response(serializer.data)

@api_view([GET])
@permission_classes([AllowAny])
def get_trip(request, trip_id):
  trip = Trip.objects.get(pk=trip_id)
  serializer = TripSerializer(trip, many=False)
  return Response(serializer.data)

@api_view([POST])
@permission_classes([IsAuthenticated])
def create_trip(request):
  serializer = TripSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(driver=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view([PUT, DELETE])
@permission_classes([IsAuthenticated])
def edit_trip(request, trip_id):
  trip = Trip.objects.get(pk=trip_id)
  if request.user == trip.driver:
    if request.method == PUT:
      serializer = TripSerializer(trip, request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == DELETE:
      trip.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
  else:
    return Response(status=status.HTTP_401_UNAUTHORIZED)


#PASSENGERS

@api_view([POST])
@permission_classes([IsAuthenticated])
def book_trip(request):
  serializer = TripPassengerSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(passenger=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view([PUT, DELETE])
@permission_classes([IsAuthenticated])
def edit_booking(request, pk):
  trip_passenger = TripPassenger.objects.get(pk=pk)
  if request.user == trip_passenger.passenger:
    if request.method == PUT:
      serializer = TripPassengerSerializer(trip_passenger, request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == DELETE:
      trip_passenger.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
  else:
    return Response(status=status.HTTP_401_UNAUTHORIZED)