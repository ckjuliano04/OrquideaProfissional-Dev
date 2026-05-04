from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def add_geo_columns():
    with connection.cursor() as cursor:
        try:
            print("Adicionando colunas de latitude e longitude na tabela stores...")
            cursor.execute("ALTER TABLE stores ADD latitude DECIMAL(10, 8) NULL")
            cursor.execute("ALTER TABLE stores ADD longitude DECIMAL(11, 8) NULL")
            print("Sucesso! Colunas adicionadas.")
        except Exception as e:
            print(f"Erro ao adicionar colunas: {e}")

if __name__ == "__main__":
    add_geo_columns()
