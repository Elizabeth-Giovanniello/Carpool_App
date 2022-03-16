from django.db import models
from django.contrib.auth.models import User

class Review(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    is_reviewer = models.BooleanField(default=False)
    rating = models.FloatField()
    comment = models.CharField(max_length=750)

    class Meta:
        abstract = True
