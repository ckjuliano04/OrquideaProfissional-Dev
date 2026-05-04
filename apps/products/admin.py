from django.contrib import admin
from .models import Products, ProductCategories, ProductImages, ProductFiles, ProductTips
from django.utils.html import format_html

from django.utils import timezone

class BaseCMSAdmin(admin.ModelAdmin):
    exclude = ('created_at', 'updated_at', 'created_by_user', 'updated_by_user')

    class Media:
        css = {
            'all': ('admin/css/cms_custom.css',)
        }
        js = ('admin/js/cms_custom.js',)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_at = timezone.now()
            if hasattr(obj, 'created_by_user'):
                obj.created_by_user = request.user
            # Garante que sort_order não seja nulo em novos registros
            if hasattr(obj, 'sort_order') and obj.sort_order is None:
                obj.sort_order = 0
        else:
            obj.updated_at = timezone.now()
            if hasattr(obj, 'updated_by_user'):
                obj.updated_by_user = request.user
        super().save_model(request, obj, form, change)

    def ações(self, obj):
        """Renderiza um ícone de lixeira para exclusão rápida."""
        from django.urls import reverse
        from django.utils.safestring import mark_safe
        
        delete_url = reverse(
            f'admin:{obj._meta.app_label}_{obj._meta.model_name}_delete',
            args=[obj.pk]
        )
        return mark_safe(f'<a href="{delete_url}" title="Excluir" style="color: #ba2121;">🗑️</a>')
    ações.short_description = 'Ações'

class ProductImagesInline(admin.TabularInline):
    model = ProductImages
    extra = 1
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        """Gera a miniatura da imagem para exibição dentro do formulário do admin."""
        if obj.image_url:
            return format_html('<img src="{}" style="max-height: 100px;"/>', obj.image_url.url)
        return "-"
    image_preview.short_description = 'Prévia'

class ProductFilesInline(admin.TabularInline):
    model = ProductFiles
    extra = 1

@admin.register(ProductCategories)
class ProductCategoriesAdmin(BaseCMSAdmin):
    list_display = ('name', 'parent', 'is_active', 'ações')
    list_filter = ('parent', 'is_active')
    search_fields = ('name',)
    ordering = ('name',)
    fields = ('parent', 'name', 'description', 'is_active')


class ProductTipsInline(admin.TabularInline):
    model = ProductTips
    extra = 1

@admin.register(Products)
class ProductsAdmin(BaseCMSAdmin):
    list_display = ('sku', 'name', 'category', 'is_active', 'is_featured', 'ações')
    list_filter = ('category', 'is_active', 'is_featured')
    search_fields = ('name', 'sku', 'short_description')
    ordering = ('name',)
    inlines = [ProductImagesInline, ProductFilesInline, ProductTipsInline]
    readonly_fields = ('image_preview',)

    def image_preview_list(self, obj):
        """Gera a miniatura da imagem para a listagem geral de produtos."""
        if obj.image_url:
            return format_html('<img src="{}" style="max-height: 50px;"/>', obj.image_url.url)
        return "-"
    image_preview_list.short_description = 'Capa'

    def image_preview(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" style="max-height: 200px;"/>', obj.image_url.url)
        return "-"
    image_preview.short_description = 'Prévia da Imagem'
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('sku', 'name', 'slug', 'category', 'is_active', 'is_featured')
        }),
        ('Descrições', {
            'fields': ('short_description', 'full_description', 'usage_tips', 'application_text')
        }),
        ('Dados Técnicos e Logísticos', {
            'fields': ('technical_info', 'package_info', 'weight_info', 'shelf_life_info')
        }),
        ('Mídia', {
            'fields': ('image_url', 'image_preview')
        }),
    )
    prepopulated_fields = {"slug": ("name",)}

