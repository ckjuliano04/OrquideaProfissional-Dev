from rest_framework.permissions import BasePermission

class IsClienteOrAbove(BasePermission):
    """
    Permite acesso a qualquer usuário logado. 
    Clientes, Técnicos, Vendedores e Internos.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_active)

class IsTecnicoOrVendedor(BasePermission):
    """
    Acesso restrito apenas para Técnicos, Vendedores e Administradores.
    Usado para materiais de treinamento.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated or not request.user.is_active:
            return False
        return request.user.user_type in ['tecnico', 'vendedor', 'admin', 'interno']

class IsAdmin(BasePermission):
    """
    Acesso apenas para Administradores.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated or not request.user.is_active:
            return False
        return request.user.user_type in ['admin', 'interno']
