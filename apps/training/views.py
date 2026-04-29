from rest_framework import generics
from apps.users.permissions import IsTecnicoOrVendedor
from .models import RestrictedMaterials
from .serializers import RestrictedMaterialsListSerializer, RestrictedMaterialsDetailSerializer

class TrainingListView(generics.ListAPIView):
    """
    Lista todos os materiais de treinamento que o usuário logado tem acesso,
    baseado nas roles que ele possui.
    """
    serializer_class = RestrictedMaterialsListSerializer
    permission_classes = [IsTecnicoOrVendedor]

    def get_queryset(self):
        user = self.request.user
        queryset = RestrictedMaterials.objects.filter(is_active=True)
        # Se for admin, pode ver tudo
        if user.user_type in ['admin', 'interno']:
            return queryset
            
        # Filtra baseado na role (UserRoles -> RestrictedMaterialRoles)
        user_role_ids = user.userroles_set.values_list('role_id', flat=True)
        return queryset.filter(restrictedmaterialroles__role_id__in=user_role_ids).distinct()

class TrainingDetailView(generics.RetrieveAPIView):
    """
    Detalha o material de treinamento, incluindo PDFs e Vídeos,
    desde que o usuário tenha permissão de role.
    """
    serializer_class = RestrictedMaterialsDetailSerializer
    permission_classes = [IsTecnicoOrVendedor]

    def get_queryset(self):
        user = self.request.user
        queryset = RestrictedMaterials.objects.filter(is_active=True)
        if user.user_type in ['admin', 'interno']:
            return queryset
            
        user_role_ids = user.userroles_set.values_list('role_id', flat=True)
        return queryset.filter(restrictedmaterialroles__role_id__in=user_role_ids).distinct()
