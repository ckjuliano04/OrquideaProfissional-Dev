import bcrypt
from django.contrib.auth.backends import BaseBackend
from .models import Users


class LegacyMSSQLBackend(BaseBackend):
    """
    Backend de autenticação para validar senhas BCrypt
    armazenadas no SQL Server legado.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return None

        try:
            user = Users.objects.get(email=username, is_active=True)

            # Remove espaços que o MSSQL pode adicionar em campos NVARCHAR
            stored_hash = user.password_hash.strip().encode("utf-8")
            password_bytes = password.encode("utf-8")

            if bcrypt.checkpw(password_bytes, stored_hash):
                return user

        except Users.DoesNotExist:
            return None
        except (ValueError, TypeError) as e:
            # Hash inválido ou mal formatado no banco
            import logging
            logger = logging.getLogger(__name__)
            logger.warning("Erro na validação BCrypt para %s: %s", username, e)
            return None

        return None

    def get_user(self, user_id):
        """Necessário para que o Django consiga recuperar o usuário da sessão."""
        try:
            return Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            return None