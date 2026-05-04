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
    full_name = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS", verbose_name="Nome Completo")
    email = models.CharField(unique=True, max_length=150, db_collation="Latin1_General_CI_AS", verbose_name="E-mail")
    password = models.CharField(max_length=255, db_column="password_hash", verbose_name="Senha (Hash)")
    phone = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Telefone")
    document_number = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="CPF/CNPJ")
    # Definição completa de tipos (Suportada após atualização da constraint no DB)
    USER_TYPE_CHOICES = [
        ("admin", "Administrador"),
        ("interno", "Equipe Interna (Marketing)"),
        ("vendedor", "Vendedor"),
        ("tecnico", "Técnico"),
        ("cliente", "Cliente"),
    ]
    user_type = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS", choices=USER_TYPE_CHOICES, verbose_name="Tipo de Usuário")
    status = models.CharField(max_length=20, db_collation="Latin1_General_CI_AS", verbose_name="Status")
    is_active = models.BooleanField(default=True, verbose_name="Conta Ativa")
    last_login = models.DateTimeField(db_column="last_login_at", blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    must_change_password = models.BooleanField(default=False)
    password_reset_token = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    password_reset_expires_at = models.DateTimeField(blank=True, null=True)

    # Configurações de autenticação Django
    objects = UsersManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    class Meta:
        managed = False  # Mandatório: o Django não deve alterar a tabela legada
        db_table = "users"
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        """
        Define quem pode entrar no Django Admin (CMS).
        """
        return self.user_type in ['admin', 'interno']

    @property
    def is_superuser(self):
        return self.user_type == "admin"

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff

    @property
    def role(self):
        """Retorna o user_type como role para o JWT claim."""
        return self.user_type

    def set_password(self, raw_password):
        import bcrypt
        if raw_password:
            hashed = bcrypt.hashpw(raw_password.encode("utf-8"), bcrypt.gensalt())
            self.password = hashed.decode("utf-8")
        else:
            self.password = None

    def check_password(self, raw_password):
        import bcrypt

        stored_hash = self.password.strip().encode("utf-8")
        return bcrypt.checkpw(raw_password.encode("utf-8"), stored_hash)


class Roles(models.Model):
    name = models.CharField(unique=True, max_length=50, db_collation="Latin1_General_CI_AS")
    description = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    access_area = models.CharField(max_length=30, db_collation="Latin1_General_CI_AS")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "roles"

    def __str__(self):
        return self.name


class UserRoles(models.Model):
    user = models.ForeignKey("Users", models.DO_NOTHING)
    role = models.ForeignKey(Roles, models.DO_NOTHING)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "user_roles"
        verbose_name = "Vínculo de Perfil"
        verbose_name_plural = "Vínculos de Perfis"
        unique_together = (("user", "role"),)
