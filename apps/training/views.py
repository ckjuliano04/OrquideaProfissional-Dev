from django.db import models
from rest_framework import generics
from apps.users.permissions import IsTecnicoOnly
from .models import RestrictedMaterials
from .serializers import RestrictedMaterialsListSerializer, RestrictedMaterialsDetailSerializer

class TrainingListView(generics.ListAPIView):
    """
    Lista todos os materiais de treinamento que o usuário logado tem acesso,
    baseado nas roles que ele possui.
    """
    serializer_class = RestrictedMaterialsListSerializer
    permission_classes = [IsTecnicoOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = RestrictedMaterials.objects.filter(is_active=True)
        
        # Admins e Equipe Interna veem tudo
        if user.user_type in ['admin', 'interno']:
            return queryset
            
        # Para técnicos, mostramos apenas o que é marcado como 'tecnico'
        return queryset.filter(audience_type__icontains='tecnico').distinct()

class TrainingDetailView(generics.RetrieveAPIView):
    """
    Detalha o material de treinamento, incluindo PDFs e Vídeos,
    desde que o usuário tenha permissão de role.
    """
    serializer_class = RestrictedMaterialsDetailSerializer
    permission_classes = [IsTecnicoOnly]

    def get_queryset(self):
        user = self.request.user
        queryset = RestrictedMaterials.objects.filter(is_active=True)
        if user.user_type in ['admin', 'interno']:
            return queryset
            
        return queryset.filter(audience_type__icontains='tecnico').distinct()
