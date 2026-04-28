from django.db import models

class ProductCategories(models.Model):
    name = models.CharField(unique=True, max_length=100, db_collation='Latin1_General_CI_AS')
    description = models.CharField(max_length=255, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    is_active = models.BooleanField()
    sort_order = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_categories'
    
    def __str__(self):
        return self.name

class Products(models.Model):
    category = models.ForeignKey(ProductCategories, models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=150, db_collation='Latin1_General_CI_AS')
    slug = models.CharField(unique=True, max_length=160, db_collation='Latin1_General_CI_AS')
    sku = models.CharField(max_length=50, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    # ... outros campos mapeados anteriormente ...
    is_active = models.BooleanField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'products'

    def __str__(self):
        return f"{self.sku} - {self.name}"