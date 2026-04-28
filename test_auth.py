import os
import django
from django.db import connection

# Inicialização do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.users.models import Users

def run_deep_diagnostic():
    print(f"--- Diagnóstico de Infraestrutura MSSQL ---")
    
    with connection.cursor() as cursor:
        # 1. Verifica qual o Banco de Dados atual
        cursor.execute("SELECT DB_NAME() AS CurrentDB")
        db_name = cursor.fetchone()[0]
        print(f"🔹 Conectado ao Banco: {db_name}")

        # 2. Lista tabelas no schema dbo para depuração
        print(f"🔹 Buscando tabelas no schema 'dbo'...")
        cursor.execute("SELECT name FROM sys.tables WHERE SCHEMA_NAME(schema_id) = 'dbo'")
        tables = [row[0] for row in cursor.fetchall()]
        print(f"🔹 Tabelas encontradas: {tables}")

    # 3. Tentativa de acesso via ORM
    try:
        if 'users' in tables:
            print("✅ Tabela 'users' localizada. Testando acesso ORM...")
            # Tente buscar qualquer usuário apenas para validar o mapeamento
            user_count = Users.objects.count()
            print(f"✅ Sucesso! Total de usuários no banco: {user_count}")
        else:
            print("❌ ERRO: A tabela 'users' não foi listada nas tabelas do schema dbo.")
            
    except Exception as e:
        print(f"⚠️ FALHA NO ORM: {e}")

if __name__ == "__main__":
    run_deep_diagnostic()