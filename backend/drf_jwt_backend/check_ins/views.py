from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import CheckIn
from .serializers import CheckInSerializer
from django.contrib.auth.models import User

GET = 'GET'
POST = 'POST'
PUT = 'PUT'
DELETE = 'DELETE'


@api_view([GET])
@permission_classes([IsAuthenticated])
def get_all_check_ins(request, trip_id):
  check_ins = CheckIn.objects.filter(trip=trip_id)
  serializer = CheckInSerializer(check_ins, many=True)
  return Response(serializer.data)


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