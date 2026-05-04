from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def check_columns():
    with connection.cursor() as cursor:
        cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'users'")
        columns = [row[0] for row in cursor.fetchall()]
        print(f"COLUMNS: {columns}")

if __name__ == "__main__":
    check_columns()
