from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
  description = models.CharField(max_length=200)
  owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')

  def __str__(self):
    return self.owner.username + " | " + self.description
