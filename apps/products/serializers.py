from django.db.models import Q
from rest_framework import serializers

from apps.users.models import UserRoles

from .models import (
    ProductCategories,
    ProductFiles,
    ProductImages,
    ProductNutrition,
    ProductNutritionRow,
    Products,
)


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
        request = self.context.get("request")
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
        fields = ["id", "name", "parent", "is_main_category", "description", "sort_order"]


class ProductsListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = [
            "id",
            "name",
            "slug",
            "sku",
            "short_description",
            "image_url",
            "category",
            "category_name",
            "is_featured",
        ]

    def get_image_url(self, obj):
        """
        Converte o caminho relativo do banco (ex: uploads/...)
        em uma URL absoluta (ex: http://domain.com/media/uploads/...)
        """
        if not obj.image_url:
            return None
        request = self.context.get("request")
        if request is not None:
            return request.build_absolute_uri(obj.image_url.url)
        return obj.image_url.url


class ProductNutritionRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductNutritionRow
        fields = [
            "id",
            "label",
            "value_100g",
            "value_serving",
            "vd_percentage",
            "value_4",
            "value_5",
            "sort_order",
        ]


class ProductNutritionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductNutrition
        fields = [
            "serving_size",
            "household_measure",
            "portions_per_package",
            "footer_note",
            "column_count",
            "col_1_label",
            "col_2_label",
            "col_3_label",
            "col_4_label",
            "col_5_label",
        ]


class ProductsDetailSerializer(ProductsListSerializer):
    """
    Representação pública do detalhe do produto.
    Limitada a campos seguros para catálogo pois o ProductDetailView permite acesso anônimo.
    """

    class Meta(ProductsListSerializer.Meta):
        fields = ProductsListSerializer.Meta.fields + ["full_description"]


class PortalProductDetailSerializer(ProductsListSerializer):
    """
    Representação completa do produto para o Portal Restrito.
    Inclui dados técnicos, arquivos, nutrição e logística.
    """

    images = ProductImagesSerializer(many=True, read_only=True)
    files = serializers.SerializerMethodField()
    nutrition = ProductNutritionSerializer(read_only=True)
    nutrition_rows = ProductNutritionRowSerializer(many=True, read_only=True)

    class Meta:
        model = Products
        fields = [
            "id",
            "name",
            "slug",
            "sku",
            "short_description",
            "full_description",
            "usage_tips",
            "application_text",
            "technical_info",
            "package_info",
            "weight_info",
            "shelf_life_info",
            "image_url",
            "is_active",
            "is_featured",
            "category",
            "category_name",
            "images",
            "files",
            "nutrition",
            "nutrition_rows",
        ]

    def get_files(self, obj):
        files = obj.files.all().order_by("sort_order")
        request = self.context.get("request")
        user = getattr(request, "user", None)

        if not user or not user.is_authenticated:
            # Visitantes não logados: apenas arquivos públicos (sem papel definido)
            files = files.filter(role__isnull=True)
        elif user.user_type not in ["admin", "interno"]:
            # Usuários comuns: arquivos públicos + arquivos específicos do seu papel
            role_ids = UserRoles.objects.filter(user=user).values_list(
                "role_id", flat=True
            )
            files = files.filter(
                Q(role__isnull=True) | Q(role_id__in=role_ids)
            ).distinct()

        # Se for admin/interno, o filtro acima é ignorado e ele vê todos os arquivos
        return ProductFilesSerializer(files, many=True, context=self.context).data
