import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from django.db import connection

cursor = connection.cursor()

tables = ['product_images', 'products', 'product_categories', 'product_files', 'product_role_contents', 'product_tips']
for table in tables:
    cursor.execute(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = %s ORDER BY ORDINAL_POSITION",
        [table]
    )
    cols = [r[0] for r in cursor.fetchall()]
    print(f"{table}: {cols}")
