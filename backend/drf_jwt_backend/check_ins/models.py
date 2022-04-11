from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class CheckIn(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE)
    description = models.CharField(max_length=500, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField(upload_to='images/', null=True)

