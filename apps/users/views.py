from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CustomTokenObtainSerializer, UserProfileSerializer


class CustomTokenObtainView(APIView):
    """
    POST /api/token/
    Autentica o usuário via email + senha (BCrypt legado).
    Retorna access + refresh token JWT.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomTokenObtainSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    """
    GET /api/me/
    Retorna os dados do usuário autenticado via JWT.
    Usado pelo Next.js para carregar o perfil após login.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
