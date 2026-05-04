from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def add_email_column():
    with connection.cursor() as cursor:
        try:
            print("Adicionando coluna 'email' na tabela stores...")
            cursor.execute("ALTER TABLE stores ADD email VARCHAR(255) NULL")
            print("Sucesso! Coluna adicionada.")
        except Exception as e:
            print(f"Erro (pode ser que a coluna já exista): {e}")

if __name__ == "__main__":
    add_email_column()
