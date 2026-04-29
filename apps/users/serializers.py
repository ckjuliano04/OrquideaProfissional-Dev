from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Users


class CustomTokenObtainSerializer(serializers.Serializer):
    """
    Serializer de login customizado.
    Valida email + senha contra o hash BCrypt armazenado no MSSQL.
    Retorna tokens JWT com dados do usuário no payload.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            raise serializers.ValidationError("Credenciais inválidas.")

        if not user.is_active:
            raise serializers.ValidationError("Conta desativada.")

        if not user.check_password(password):
            raise serializers.ValidationError("Credenciais inválidas.")

        # Gerar tokens JWT
        refresh = RefreshToken.for_user(user)

        # Adicionar claims customizados ao token de acesso
        refresh["email"] = user.email
        refresh["full_name"] = user.full_name
        refresh["user_type"] = user.user_type

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "user_type": user.user_type,
            },
        }


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer para o endpoint /api/me/ — dados do usuário logado."""

    class Meta:
        model = Users
        fields = [
            "id",
            "email",
            "full_name",
            "phone",
            "document_number",
            "user_type",
            "status",
            "is_active",
            "created_at",
        ]
        read_only_fields = fields
