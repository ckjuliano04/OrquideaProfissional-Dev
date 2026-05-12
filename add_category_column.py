import os
import django
from django.db import connection

# Configuração do ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def add_column():
    table_name = 'product_categories'
    column_name = 'is_main_category'
    
    with connection.cursor() as cursor:
        try:
            # Comando SQL para adicionar a coluna no MS SQL Server
            print(f"Adicionando coluna '{column_name}' na tabela '{table_name}'...")
            cursor.execute(f"ALTER TABLE {table_name} ADD {column_name} BIT NOT NULL DEFAULT 0")
            print("Coluna adicionada com sucesso!")
        except Exception as e:
            if "already has a column" in str(e) or "207" in str(e):
                print("A coluna já parece existir ou houve um erro de permissão.")
            else:
                print(f"Erro ao adicionar coluna: {e}")

if __name__ == "__main__":
    add_column()
