from django.db import models

class Pages(models.Model):
    slug = models.CharField(unique=True, max_length=100, db_collation='Latin1_General_CI_AS', verbose_name="Slug (URL)")
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS', verbose_name="Título")
    summary = models.CharField(max_length=500, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Resumo")
    content = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Conteúdo")
    banner_image_url = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="URL da Imagem do Banner")
    is_active = models.BooleanField(verbose_name="Ativo")
    sort_order = models.IntegerField(verbose_name="Ordem de Exibição")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='pages_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='pages_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pages'
        verbose_name = "Página Institucional"
        verbose_name_plural = "Páginas Institucionais"

    def __str__(self):
        return self.title

class Brands(models.Model):
    name = models.CharField(max_length=120, db_collation='Latin1_General_CI_AS', verbose_name="Nome da Marca")
    description = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Descrição")
    external_link = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Link Externo")
    image_url = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="URL da Logomarca")
    is_active = models.BooleanField(verbose_name="Ativo")
    sort_order = models.IntegerField(verbose_name="Ordem de Exibição")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='brands_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='brands_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'brands'
        verbose_name = "Marca Parceira"
        verbose_name_plural = "Marcas Parceiras"

    def __str__(self):
        return self.name

class Stores(models.Model):
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS', verbose_name="Nome da Loja")
    description = models.TextField(db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Descrição")
    city = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Cidade")
    state = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Estado (UF)")
    address_text = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Endereço Completo")
    latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True, verbose_name="Latitude")
    longitude = models.DecimalField(max_digits=11, decimal_places=8, blank=True, null=True, verbose_name="Longitude")
    contact_info = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Informações de Contato")
    email = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="E-mail")
    is_active = models.BooleanField(verbose_name="Ativo")
    sort_order = models.IntegerField(verbose_name="Ordem de Exibição")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='stores_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='stores_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stores'
        verbose_name = "Ponto de Venda / Loja"
        verbose_name_plural = "Pontos de Venda / Lojas"

    def __str__(self):
        return self.title

class Tips(models.Model):
    title = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS', verbose_name="Título da Dica")
    slug = models.CharField(unique=True, max_length=160, db_collation='Latin1_General_CI_AS', verbose_name="Slug (URL)")
    summary = models.CharField(max_length=500, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="Resumo")
    content = models.TextField(db_collation='Latin1_General_CI_AS', verbose_name="Conteúdo Completo")
    image_url = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True, verbose_name="URL da Imagem")
    is_active = models.BooleanField(verbose_name="Ativo")
    published_at = models.DateTimeField(blank=True, null=True, verbose_name="Data de Publicação")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='tips_created', blank=True, null=True)
    updated_by_user = models.ForeignKey('users.Users', models.DO_NOTHING, related_name='tips_updated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tips'
        verbose_name = "Dica Profissional"
        verbose_name_plural = "Dicas Profissionais"

    def __str__(self):
        return self.title
