from rest_framework import serializers
from .models import Stores

class StoreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stores
        fields = [
            'id', 'title', 'description', 'city', 'state', 
            'address_text', 'latitude', 'longitude', 'contact_info', 'email'
        ]
