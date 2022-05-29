from django.db import models


# Create your models here.
class Item(models.Model):
    label = models.CharField(max_length=40)
    value = models.CharField(max_length=40, blank=True, null=True)
    description = models.CharField(max_length=255)
    color = models.CharField(max_length=7)
    link = models.URLField(max_length=200, blank=True, null=True)
    contributor = models.CharField(max_length=40)
    related_items = models.ManyToManyField("Item", blank=True, symmetrical=False)

    def __str__(self) -> str:
        return self.label

    def save(self, *args, **kwargs):
        self.value = self.label.lower()
        super(Item, self).save(*args, **kwargs)
