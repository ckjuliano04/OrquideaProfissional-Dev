import bcrypt
from django.contrib.auth.backends import ModelBackend
from .models import Users

class LegacyMSSQLBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Localiza o usuário pelo e-mail (username no login)
            user = Users.objects.get(email=username, is_active=True)
            
            # O hash do banco geralmente vem como string; convertemos para bytes
            stored_hash = user.password_hash.encode('utf-8')
            password_bytes = password.encode('utf-8')

            # Verifica se a senha digitada corresponde ao hash BCrypt
            if bcrypt.checkpw(password_bytes, stored_hash):
                return user
                
        except Users.DoesNotExist:
            return None
        except Exception as e:
            # Log de erro para debug em desenvolvimento
            print(f"Erro na validação BCrypt: {e}")
            return None
        return None