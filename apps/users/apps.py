from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.users' # Crucial para o namespace
    verbose_name = "Gestão de Acessos"