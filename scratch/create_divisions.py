import os
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.products.models import ProductCategories

def create_main_divisions():
    divisions = ["Farinhas Profissionais", "Misturas", "Extrusados"]
    for i, name in enumerate(divisions):
        cat, created = ProductCategories.objects.get_or_create(
            name=name,
            defaults={
                'is_active': True,
                'sort_order': i,
                'created_at': timezone.now()
            }
        )
        if created:
            print(f"Divisão '{name}' criada com sucesso.")
        else:
            print(f"Divisão '{name}' já existia.")

if __name__ == "__main__":
    create_main_divisions()
