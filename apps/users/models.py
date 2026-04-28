from django.db import models

class Roles(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=510, blank=True, null=True)
    access_area = models.CharField(max_length=60) # Técnico, Vendedor, etc
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'

class Users(models.Model):
    full_name = models.CharField(max_length=300)
    email = models.EmailField(max_length=300, unique=True)
    password_hash = models.CharField(max_length=510)
    phone = models.CharField(max_length=60, blank=True, null=True)
    document_number = models.CharField(max_length=60, blank=True, null=True)
    user_type = models.CharField(max_length=60)
    status = models.CharField(max_length=40)
    is_active = models.BooleanField()
    last_login_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    must_change_password = models.BooleanField()
    
    class Meta:
        managed = False
        db_table = 'users'

class UserRoles(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING)
    role = models.ForeignKey(Roles, models.DO_NOTHING)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = '[dbo].[users]'