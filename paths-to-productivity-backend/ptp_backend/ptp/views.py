from django.shortcuts import render

from rest_framework import viewsets, status
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
    
    def create(self, request):
        print(request.data)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            emessage=serializer.errors
            return Response({
                'status': 'Bad request',
                'message': emessage,
            }, status=status.HTTP_400_BAD_REQUEST)

