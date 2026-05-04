from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def check_constraint():
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT definition FROM sys.check_constraints WHERE name = 'CK_users_user_type'")
            row = cursor.fetchone()
            if row:
                print(f"CONSTRAINT: {row[0]}")
            else:
                print("Constraint 'CK_users_user_type' not found.")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    check_constraint()
