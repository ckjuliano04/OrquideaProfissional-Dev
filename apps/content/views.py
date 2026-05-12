from rest_framework import generics, permissions

from .models import Stores, Tips
from .serializers import StoreListSerializer, TipSerializer


class StoreListView(generics.ListAPIView):
    """
    Lista todos os pontos de venda ativos para exibição no mapa.
    """

    queryset = Stores.objects.filter(is_active=True).order_by("sort_order")
    serializer_class = StoreListSerializer
    permission_classes = [permissions.AllowAny]  # Público


class TipListView(generics.ListAPIView):
    """
    Lista todas as dicas profissionais ativas.
    """

    queryset = Tips.objects.filter(is_active=True).order_by("-published_at")
    serializer_class = TipSerializer
    permission_classes = [permissions.AllowAny]  # Público
