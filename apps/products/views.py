from rest_framework import viewsets
from .models import Products
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint que permite visualizar os produtos do MSSQL.
    """
    queryset = Products.objects.filter(is_active=True).order_by('sort_order')
    serializer_class = ProductSerializer