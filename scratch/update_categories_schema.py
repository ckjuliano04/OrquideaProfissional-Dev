from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def update_categories_schema():
    with connection.cursor() as cursor:
        try:
            print("Adicionando coluna 'parent_id' na tabela product_categories...")
            cursor.execute("ALTER TABLE product_categories ADD parent_id INT NULL")
            cursor.execute("ALTER TABLE product_categories ADD CONSTRAINT FK_product_categories_parent FOREIGN KEY (parent_id) REFERENCES product_categories(id)")
            print("Sucesso! Coluna e restrição adicionadas.")
        except Exception as e:
            print(f"Erro ou coluna já existe: {e}")

if __name__ == "__main__":
    update_categories_schema()
