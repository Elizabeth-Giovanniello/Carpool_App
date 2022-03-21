from django.db import models
from django.contrib.auth.models import User

class CheckIn(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

