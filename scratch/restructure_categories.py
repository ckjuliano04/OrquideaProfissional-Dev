import os
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.products.models import ProductCategories

def restructure_categories():
    # 1. Identificar Divisões Mães
    divisions_names = ["Farinhas Profissionais", "Misturas", "Extrusados"]
    divisions = {cat.name: cat for cat in ProductCategories.objects.filter(name__in=divisions_names)}
    
    # Garantir que as divisões existem (caso tenham sido apagadas ou nome mudado)
    for name in divisions_names:
        if name not in divisions:
            cat = ProductCategories.objects.create(
                name=name, is_active=True, sort_order=0, created_at=timezone.now()
            )
            divisions[name] = cat

    # 2. Apagar categorias que não são divisões e não serão as novas subcategorias
    # Para segurança, vamos primeiro criar as novas e depois apagar o resto
    
    structure = {
        "Farinhas Profissionais": [
            "Farinhas Especiais 5kg",
            "Farinhas Panificação"
        ],
        "Misturas": [
            "MISTURA PARA PÃO FRANCÊS",
            "MISTURA PARA CAKES",
            "MISTURA PARA BOLOS 5KG",
            "RECHEIOS E COBERTURAS",
            "MISTURA PARA PÃES ESPECIAIS"
        ],
        "Extrusados": [
            "FARINHA PANKO",
            "FARINHA DE ROSCA"
        ]
    }

    new_subcat_names = []
    for subs in structure.values():
        new_subcat_names.extend(subs)

    # Criar subcategorias
    for div_name, subs in structure.items():
        parent = divisions[div_name]
        for i, sub_name in enumerate(subs):
            cat, created = ProductCategories.objects.get_or_create(
                name=sub_name,
                defaults={
                    'parent': parent,
                    'is_active': True,
                    'sort_order': i,
                    'created_at': timezone.now()
                }
            )
            if not created:
                cat.parent = parent
                cat.save()
            print(f"Subcategoria '{sub_name}' pronta sob '{div_name}'.")

    # 3. Apagar o que sobrou (que não é divisão e não está na lista de novas subcategorias)
    all_allowed = divisions_names + new_subcat_names
    deleted_count, _ = ProductCategories.objects.exclude(name__in=all_allowed).delete()
    print(f"Limpeza concluída: {deleted_count} categorias antigas removidas.")

if __name__ == "__main__":
    restructure_categories()
