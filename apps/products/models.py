from django.db import models


class ProductCategories(models.Model):
    name = models.CharField(unique=True, max_length=100, db_collation="Latin1_General_CI_AS")
    description = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    is_active = models.BooleanField()
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "product_categories"

    def __str__(self):
        return self.name


class Products(models.Model):
    category = models.ForeignKey(ProductCategories, models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS")
    slug = models.CharField(unique=True, max_length=160, db_collation="Latin1_General_CI_AS")
    sku = models.CharField(max_length=50, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    short_description = models.CharField(max_length=500, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    full_description = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True)
    usage_tips = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True)
    application_text = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True)
    technical_info = models.TextField(db_collation="Latin1_General_CI_AS", blank=True, null=True)
    package_info = models.CharField(max_length=150, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    weight_info = models.CharField(max_length=100, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    shelf_life_info = models.CharField(max_length=100, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    image_url = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    is_active = models.BooleanField()
    is_featured = models.BooleanField()
    sort_order = models.IntegerField()
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

    def __str__(self):
        return f"{self.sku} - {self.name}" if self.sku else self.name


class ProductImages(models.Model):
    product = models.ForeignKey(Products, models.DO_NOTHING, related_name="images")
    image_url = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS")
    alt_text = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "product_images"


class ProductFiles(models.Model):
    product = models.ForeignKey(Products, models.DO_NOTHING, related_name="files")
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


class ProductRoleContents(models.Model):
    product = models.ForeignKey(Products, models.DO_NOTHING, related_name="role_contents")
    role = models.ForeignKey("users.Roles", models.DO_NOTHING)
    title = models.CharField(max_length=255, db_collation="Latin1_General_CI_AS", blank=True, null=True)
    content = models.TextField(db_collation="Latin1_General_CI_AS")
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "product_role_contents"
        unique_together = (("product", "role"),)


class ProductTips(models.Model):
    product = models.ForeignKey(Products, models.DO_NOTHING, related_name="product_tips")
    tip = models.ForeignKey("content.Tips", models.DO_NOTHING)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "product_tips"
        unique_together = (("product", "tip"),)