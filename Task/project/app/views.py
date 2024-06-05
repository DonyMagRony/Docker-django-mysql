from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from app.models import User,Store,Region
from app.serializers import StoreSerializer,UserSerializer,RegionSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.exceptions import NotFound

class StoreListCreate(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class StoreRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class RegionListCreate(generics.ListCreateAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class RegionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class GenericListCreateUser(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class =UserSerializer

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GenericListStoreUser(APIView):
    def get(self, request, pk):
        try:
            obj = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        stores = obj.stores.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)
    
