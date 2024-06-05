from rest_framework import serializers
from app.models import User,Region,Store

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'name', 'location']

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields=['id','name','location']


class UserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id','name','location','stores']
