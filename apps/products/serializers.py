from rest_framework import serializers
from .models import Products, ProductCategories

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Products
        fields = [
            'id', 'name', 'slug', 'sku', 'short_description', 
            'image_url', 'is_featured', 'category_name'
        ]