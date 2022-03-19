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


@api_view([POST])
@permission_classes([IsAuthenticated])
def send_check_in(request):
  serializer = CheckInSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(sender=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view([PUT, DELETE])
@permission_classes([IsAuthenticated])
def edit_check_in(request, check_in_id):
  check_in = CheckIn.objects.get(pk=check_in_id)
  if request.user == check_in.sender:
    if request.method == PUT:
      serializer = CheckInSerializer(check_in, request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == DELETE:
      check_in.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
  else:
    return Response(status=status.HTTP_401_UNAUTHORIZED)