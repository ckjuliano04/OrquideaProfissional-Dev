from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Users


class OrquideaTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Adicionamos Claims customizadas para o Front usar sem precisar de outra query
        token["name"] = user.full_name
        token["role"] = user.role
        return token


class CustomTokenObtainSerializer(serializers.Serializer):
    """
    Serializer de login customizado.
    Valida email + senha contra o hash BCrypt armazenado no MSSQL.
    Retorna tokens JWT com dados do usuário no payload.
    """

    email = serializers.EmailField(
        error_messages={"invalid": "Por favor, insira um endereço de e-mail válido."}
    )
    password = serializers.CharField(
        write_only=True,
        min_length=6,
        error_messages={"min_length": "A senha deve ter pelo menos 6 caracteres."},
    )

    def validate(self, attrs):
        email = attrs.get("email").strip().lower()
        password = attrs.get("password")

        # Mensagem de erro genérica para evitar enumeração de contas
        error_msg = "E-mail ou senha incorretos."

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            # Usuário não existe: executamos um check_password "fantasma"
            # para que o tempo de resposta seja similar ao de um usuário real.
            # Usamos um hash fixo e inválido para isso.
            import bcrypt

            dummy_hash = b"$2b$12$K8M8vR5kXf4v.u.7p9.A.O.Y.O.Y.O.Y.O.Y.O.Y.O.Y.O.Y.O.Y."
            bcrypt.checkpw(password.encode("utf-8"), dummy_hash)
            raise serializers.ValidationError(error_msg)

        # Mesmo para usuários inativos, fazemos a checagem de senha primeiro
        # para manter o tempo de resposta e depois falhamos com a mesma mensagem genérica.
        is_password_valid = user.check_password(password)

        if not user.is_active or not is_password_valid:
            raise serializers.ValidationError(error_msg)

        # Gerar tokens JWT
        refresh = RefreshToken.for_user(user)

        # Adicionar claims customizados ao token de acesso (Sincronizado com AuthContext.js)
        refresh["email"] = user.email
        refresh["name"] = user.full_name
        refresh["role"] = user.user_type

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.full_name,
                "role": user.user_type,
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
