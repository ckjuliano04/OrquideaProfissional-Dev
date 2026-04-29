from django.contrib import admin
from .models import Products, ProductCategories, ProductImages, ProductFiles, ProductRoleContents, ProductTips

from django.utils import timezone

class BaseCMSAdmin(admin.ModelAdmin):
    exclude = ('created_at', 'updated_at', 'created_by_user', 'updated_by_user')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_at = timezone.now()
            if hasattr(obj, 'created_by_user'):
                obj.created_by_user = request.user
        else:
            obj.updated_at = timezone.now()
            if hasattr(obj, 'updated_by_user'):
                obj.updated_by_user = request.user
        super().save_model(request, obj, form, change)

class ProductImagesInline(admin.TabularInline):
    model = ProductImages
    extra = 1

class ProductFilesInline(admin.TabularInline):
    model = ProductFiles
    extra = 1

@admin.register(ProductCategories)
class ProductCategoriesAdmin(BaseCMSAdmin):
    list_display = ('name', 'sort_order', 'is_active')

class ProductRoleContentsInline(admin.StackedInline):
    model = ProductRoleContents
    extra = 1

class ProductTipsInline(admin.TabularInline):
    model = ProductTips
    extra = 1

@admin.register(Products)
class ProductsAdmin(BaseCMSAdmin):
    list_display = ('sku', 'name', 'category', 'is_active', 'is_featured')
    list_filter = ('category', 'is_active', 'is_featured')
    search_fields = ('sku', 'name')
    inlines = [ProductImagesInline, ProductFilesInline, ProductRoleContentsInline, ProductTipsInline]
