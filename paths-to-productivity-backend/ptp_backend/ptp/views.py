from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import ItemSerializer
from .models import Item


# Create your views here.
class ItemView(viewsets.ViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def list(self, request):
        queryset = Item.objects.all()
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        item = Item.objects.get(pk=pk)
        queryset = Item.objects.filter(related_items__pk=pk)
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)
