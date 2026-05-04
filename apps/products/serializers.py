from rest_framework import serializers
from .models import Products, ProductCategories, ProductImages, ProductFiles, ProductTips


class ProductImagesSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = ProductImages
        fields = ["id", "image_url", "alt_text", "sort_order"]

    def get_image_url(self, obj):
        """
        Converte o caminho relativo do banco (ex: uploads/...) 
        em uma URL absoluta (ex: http://domain.com/media/uploads/...)
        """
        if not obj.image_url:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image_url.url)
        return obj.image_url.url


class ProductFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFiles
        fields = ["id", "title", "file_type", "sort_order", "external_url"]


class ProductCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = ["id", "name", "parent", "description", "sort_order"]


class ProductsListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = [
            "id", "name", "slug", "sku", "short_description",
            "image_url", "category", "category_name", "is_featured",
        ]

    def get_image_url(self, obj):
        """
        Converte o caminho relativo do banco (ex: uploads/...) 
        em uma URL absoluta (ex: http://domain.com/media/uploads/...)
        """
        if not obj.image_url:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image_url.url)
        return obj.image_url.url
class ProductsDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)
    images = ProductImagesSerializer(many=True, read_only=True)
    files = ProductFilesSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = "__all__"

    def get_image_url(self, obj):
        """
        Converte o caminho relativo do banco (ex: uploads/...) 
        em uma URL absoluta (ex: http://domain.com/media/uploads/...)
        """
        if not obj.image_url:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image_url.url)
        return obj.image_url.url


class PortalProductDetailSerializer(ProductsDetailSerializer):
    class Meta(ProductsDetailSerializer.Meta):
        pass