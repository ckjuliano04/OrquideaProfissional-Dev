from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Products, ProductCategories
from .serializers import ProductsListSerializer, ProductsDetailSerializer, ProductCategoriesSerializer, PortalProductDetailSerializer

class CategoryListView(generics.ListAPIView):
    queryset = ProductCategories.objects.filter(is_active=True).order_by('sort_order')
    serializer_class = ProductCategoriesSerializer
    permission_classes = [AllowAny]

class ProductListView(generics.ListAPIView):
    serializer_class = ProductsListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Products.objects.filter(is_active=True).order_by('sort_order')
        
        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
            
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Products.objects.filter(is_active=True)
    serializer_class = ProductsDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

from apps.users.permissions import IsClienteOrAbove

class PortalProductDetailView(generics.RetrieveAPIView):
    """
    Retorna os detalhes do produto para usuários logados.
    """
    queryset = Products.objects.filter(is_active=True)
    serializer_class = PortalProductDetailSerializer
    permission_classes = [IsClienteOrAbove]
    lookup_field = 'slug'