from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def update_constraint():
    with connection.cursor() as cursor:
        try:
            print("Removendo restrição antiga...")
            cursor.execute("ALTER TABLE users DROP CONSTRAINT CK_users_user_type")
            
            print("Adicionando nova restrição com suporte a admin, vendedor e tecnico...")
            cursor.execute("""
                ALTER TABLE users 
                ADD CONSTRAINT CK_users_user_type 
                CHECK (user_type IN ('cliente', 'profissional', 'interno', 'admin', 'vendedor', 'tecnico'))
            """)
            print("Sucesso! Banco de dados atualizado.")
        except Exception as e:
            print(f"Erro ao atualizar banco: {e}")

if __name__ == "__main__":
    update_constraint()
