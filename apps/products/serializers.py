from rest_framework import serializers
from .models import Products, ProductCategories, ProductImages, ProductFiles, ProductTips, ProductRoleContents

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['id', 'image_url', 'is_main', 'sort_order']

class ProductFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFiles
        fields = ['id', 'title', 'sort_order']

class ProductCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = ['id', 'name', 'description', 'sort_order']

class ProductsListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    images = ProductImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = [
            'id', 'name', 'slug', 'sku', 'short_description', 
            'image_url', 'category', 'category_name', 'is_featured', 
            'images'
        ]

class ProductsDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    images = ProductImagesSerializer(many=True, read_only=True)
    files = ProductFilesSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = '__all__'

class ProductRoleContentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRoleContents
        fields = ['exclusive_content', 'role']

class PortalProductDetailSerializer(ProductsDetailSerializer):
    role_contents = serializers.SerializerMethodField()

    class Meta(ProductsDetailSerializer.Meta):
        pass

    def get_role_contents(self, obj):
        user = self.context['request'].user
        if not user or not user.is_authenticated:
            return []
        
        # Filtra os conteúdos restritos baseados nas roles que o usuário possui
        user_role_ids = user.userroles_set.values_list('role_id', flat=True)
        contents = obj.role_contents.filter(role_id__in=user_role_ids)
        return ProductRoleContentsSerializer(contents, many=True).data