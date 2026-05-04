from rest_framework.permissions import BasePermission

class IsClienteOrAbove(BasePermission):
    """
    Permite acesso a qualquer usuário logado. 
    Clientes, Técnicos, Vendedores e Internos.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_active)

class IsTecnicoOnly(BasePermission):
    """
    Acesso restrito apenas para Técnicos e Administradores.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated or not request.user.is_active:
            return False
        return request.user.user_type in ['tecnico', 'admin', 'interno']

class IsAdmin(BasePermission):
    """
    Acesso apenas para Administradores.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated or not request.user.is_active:
            return False
        return request.user.user_type in ['admin', 'interno']
