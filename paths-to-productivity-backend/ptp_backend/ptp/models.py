from django.db import models


# Create your models here.
class Item(models.Model):
    label = models.CharField(max_length=40, unique=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=7, default='#CD6211')
    link = models.URLField(max_length=200, blank=True, null=True)
    contributor = models.CharField(max_length=40, blank=True, null=True)
    related_items = models.ManyToManyField("Item", blank=True, symmetrical=False)

    def __str__(self) -> str:
        return self.label
