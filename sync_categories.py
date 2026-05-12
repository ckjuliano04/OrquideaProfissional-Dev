import os
import django
from django.db import connection

# Configuração do ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def sync_parent_categories():
    with connection.cursor() as cursor:
        try:
            print("Sincronizando categorias mãe...")
            # Marca como is_main_category = 1 todas as categorias que têm parent_id NULL
            cursor.execute("UPDATE product_categories SET is_main_category = 1 WHERE parent_id IS NULL")
            print(f"Sincronização concluída: {cursor.rowcount} categorias marcadas como mãe.")
        except Exception as e:
            print(f"Erro ao sincronizar: {e}")

if __name__ == "__main__":
    sync_parent_categories()
