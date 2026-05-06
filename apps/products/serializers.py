from rest_framework import serializers
from .models import Products, ProductCategories, ProductImages, ProductFiles, ProductNutrition, ProductNutritionRow


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

class ProductNutritionRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductNutritionRow
        fields = ["id", "label", "value_100g", "value_serving", "vd_percentage", "value_4", "value_5", "sort_order"]

class ProductNutritionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductNutrition
        fields = ['serving_size', 'household_measure', 'portions_per_package', 'footer_note', 
                  'column_count', 'col_1_label', 'col_2_label', 'col_3_label', 'col_4_label', 'col_5_label']

class ProductsDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)
    images = ProductImagesSerializer(many=True, read_only=True)
    files = ProductFilesSerializer(many=True, read_only=True)
    nutrition = ProductNutritionSerializer(read_only=True)
    nutrition_rows = ProductNutritionRowSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = [
            "id", "name", "slug", "sku", "short_description", "full_description",
            "usage_tips", "application_text", "technical_info", "package_info",
            "weight_info", "shelf_life_info", "image_url", "is_active", "is_featured",
            "category", "category_name", "images", "files", "nutrition", "nutrition_rows"
        ]

    def get_image_url(self, obj):
        if not obj.image_url:
            return None
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image_url.url)
        return obj.image_url.url


class PortalProductDetailSerializer(ProductsDetailSerializer):
    class Meta(ProductsDetailSerializer.Meta):
        pass