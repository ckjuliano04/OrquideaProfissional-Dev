from django.db import models


class ProductCategories(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories', verbose_name="Divisão Mãe")
    name = models.CharField(unique=True, max_length=100, db_collation="Latin1_General_CI_AS")
    description = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    is_active = models.BooleanField()
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "product_categories"
        verbose_name = "Categoria de Produto"
        verbose_name_plural = "Categorias de Produtos"

    def __str__(self):
        return self.name


class Products(models.Model):
    """
    Representa o cadastro principal de produtos.
    Mapeado para a tabela legada 'products' no SQL Server.
    """
    category = models.ForeignKey(ProductCategories, models.DO_NOTHING, blank=True, null=True, verbose_name="Categoria")
    name = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS", verbose_name="Nome do Produto")
    slug = models.CharField(unique=True, max_length=160, db_collation="Latin1_General_CI_AS", verbose_name="Slug (URL)")
    sku = models.CharField(max_length=50, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="SKU/Código")
    short_description = models.CharField(max_length=500, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Descrição Curta")
    full_description = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Descrição Completa")
    usage_tips = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Dicas de Uso")
    application_text = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Aplicação")
    technical_info = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Informações Técnicas")
    package_info = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Embalagem")
    weight_info = models.CharField(max_length=100, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Peso")
    shelf_life_info = models.CharField(max_length=100, db_collation="Latin1_General_CI_AS", blank=True, null=True, verbose_name="Validade")
    # Campo de imagem principal com suporte a upload.
    # Salva arquivos físicos em media/uploads/products/ e guarda o caminho no banco.
    image_url = models.ImageField(upload_to='uploads/products/', max_length=255, blank=True, null=True, verbose_name="Imagem Principal")
    is_active = models.BooleanField(verbose_name="Ativo", default=True)
    is_featured = models.BooleanField(verbose_name="Destaque", default=False)
    sort_order = models.IntegerField(verbose_name="Ordem de Exibição", default=0)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by_user = models.ForeignKey(
        "users.Users", models.DO_NOTHING, db_column="created_by_user_id",
        related_name="products_created", blank=True, null=True
    )
    updated_by_user = models.ForeignKey(
        "users.Users", models.DO_NOTHING, db_column="updated_by_user_id",
        related_name="products_updated", blank=True, null=True
    )

    class Meta:
        managed = False
        db_table = "products"
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"

    def __str__(self):
        return f"{self.sku} - {self.name}" if self.sku else self.name


class ProductImages(models.Model):
    product = models.ForeignKey(Products, models.CASCADE, related_name="images")
    image_url = models.ImageField(upload_to='uploads/products/', max_length=255, verbose_name="Imagem")
    alt_text = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "product_images"
        verbose_name = "Imagem do Produto"
        verbose_name_plural = "Imagens do Produto"

    def __str__(self):
        return f"Imagem de {self.product.name}"


class ProductFiles(models.Model):
    product = models.ForeignKey(Products, models.CASCADE, related_name="files")
    upload = models.ForeignKey("core_media.Uploads", models.DO_NOTHING, blank=True, null=True)
    role = models.ForeignKey("users.Roles", models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS")
    file_type = models.CharField(max_length=50, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()
    external_url = models.CharField(max_length=500, db_collation="Latin1_General_CI_AS", blank=True, null=True)

    class Meta:
        managed = False
        db_table = "product_files"
        verbose_name = "Arquivo do Produto"
        verbose_name_plural = "Arquivos do Produto"

    def __str__(self):
        return self.title




class ProductTips(models.Model):
    product = models.ForeignKey(Products, models.CASCADE, related_name="product_tips")
    tip = models.ForeignKey("content.Tips", models.CASCADE)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "product_tips"
        verbose_name = "Dica Vinculada"
        verbose_name_plural = "Dicas Vinculadas"

    def __str__(self):
        return f"Dica: {self.tip.title}"
        unique_together = (("product", "tip"),)


class ProductRoleContents(models.Model):
    """
    Tabela legada que causava erro de integridade na exclusão.
    Mapeada aqui para permitir que o Django limpe os registros ao excluir um produto.
    """
    product = models.ForeignKey(Products, on_delete=models.CASCADE, db_column='product_id')
    role = models.ForeignKey("users.Roles", on_delete=models.CASCADE, db_column='role_id')
    title = models.CharField(max_length=255, db_column='title', blank=True, null=True)
    content = models.TextField(db_column='content', blank=True, null=True)
    created_at = models.DateTimeField(db_column='created_at', blank=True, null=True)
    updated_at = models.DateTimeField(db_column='updated_at', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_role_contents'
        verbose_name = "Permissão de Conteúdo"
        verbose_name_plural = "Permissões de Conteúdo"

    def __str__(self):
        return f"Regra para {self.product.name}"