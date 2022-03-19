from django.db import models
from django.contrib.auth.models import User


class Review(models.Model):
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Reviewer")
    review_recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Review_Recipient")
    is_driver = models.BooleanField(default=False)
    rating = models.FloatField()
    comment = models.CharField(max_length=750)

