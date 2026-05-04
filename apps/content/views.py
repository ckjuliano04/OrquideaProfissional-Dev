from rest_framework import generics
from .models import Stores
from .serializers import StoreListSerializer

class StoreListView(generics.ListAPIView):
    """
    Lista todos os pontos de venda ativos para exibição no mapa.
    """
    queryset = Stores.objects.filter(is_active=True).order_by('sort_order')
    serializer_class = StoreListSerializer
    permission_classes = [] # Público
