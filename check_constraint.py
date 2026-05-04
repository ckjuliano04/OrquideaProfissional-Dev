import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from django.db import connection

cursor = connection.cursor()
cursor.execute("SELECT definition FROM sys.check_constraints WHERE name = 'CK_users_user_type'")
row = cursor.fetchone()
if row:
    print(f"VALORES PERMITIDOS: {row[0]}")
else:
    print("Constraint não encontrada. Verificando valores atuais...")
    cursor.execute("SELECT DISTINCT user_type FROM users")
    print(f"VALORES ATUAIS NO BANCO: {[r[0] for r in cursor.fetchall()]}")
