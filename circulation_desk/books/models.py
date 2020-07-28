from django.db import models

# Create your models here.
class Book(models.Model):
  title = models.CharField(max_length=100)
  author = models.CharField(max_length=50)
  quantity = models.IntegerField()
  reserved = models.BooleanField(default=False)