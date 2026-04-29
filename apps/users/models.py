from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UsersManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        if not email:
            raise ValueError("O usuário deve ter um endereço de e-mail")
        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None):
        user = self.create_user(email, full_name, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser):
    # Mapeamento direto do schema_dump (MSSQL)
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS")
    email = models.CharField(unique=True, max_length=150, db_collation="Latin1_General_CI_AS")
    password_hash = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS")
    phone = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    document_number = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    user_type = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS")
    status = models.CharField(max_length=20, db_collation="Latin1_General_CI_AS")
    is_active = models.BooleanField(default=True)
    last_login_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    must_change_password = models.BooleanField(default=False)
    password_reset_token = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    password_reset_expires_at = models.DateTimeField(blank=True, null=True)

    # Configurações de autenticação Django
    objects = UsersManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    # AbstractBaseUser espera um campo "password"; redirecionamos para password_hash
    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, value):
        self.password_hash = value

    class Meta:
        managed = False  # Mandatório: o Django não deve alterar a tabela legada
        db_table = "users"

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.user_type in ("admin", "vendedor", "tecnico")

    def check_password(self, raw_password):
        import bcrypt

        stored_hash = self.password_hash.strip().encode("utf-8")
        return bcrypt.checkpw(raw_password.encode("utf-8"), stored_hash)
