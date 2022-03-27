from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Car(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    license_plate = models.CharField(max_length=10)
    color = models.CharField(max_length=50)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    name = models.CharField(max_length=20, null=True, blank=True)
