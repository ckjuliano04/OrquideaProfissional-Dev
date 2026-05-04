from django.apps import AppConfig

class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.products' # DEVE ser exatamente assim
    verbose_name = "Catálogo de Produtos"