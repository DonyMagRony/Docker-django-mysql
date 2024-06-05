from django.db import models
from django.contrib.auth.models import User as AuthUser  # Renaming for clarity

class Region(models.Model):
    name = models.CharField(max_length=100)
    location = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        location_str = f" ({self.location.name})" if self.location else ""
        return f"{self.name}{location_str}"

class Store(models.Model):
    name = models.CharField(max_length=100)
    location = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.location.name})"

class User(models.Model):  # Renamed to avoid conflict with Django's built-in User model
    name = models.CharField(max_length=100)
    location = models.ForeignKey(Region, on_delete=models.CASCADE)
    stores = models.ManyToManyField(Store)

    def __str__(self):
        stores_str = ", ".join([store.name for store in self.stores.all()])
        return f"{self.name} ({self.location.name}) (Stores: {stores_str})"
