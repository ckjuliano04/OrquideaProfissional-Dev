from django.contrib import admin
from django import forms
from .models import Products, ProductCategories, ProductTips, ProductNutrition, ProductNutritionRow
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
            if hasattr(obj, 'sort_order') and obj.sort_order is None:
                obj.sort_order = 0
        else:
            obj.updated_at = timezone.now()
            if hasattr(obj, 'updated_by_user'):
                obj.updated_by_user = request.user
        super().save_model(request, obj, form, change)

    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('toggle-active/<int:pk>/', self.admin_site.admin_view(self.toggle_active), name='toggle-active'),
        ]
        return custom_urls + urls

    def toggle_active(self, request, pk):
        """Alterna o status ativo/inativo do objeto em vez de excluir."""
        from django.shortcuts import redirect
        from django.contrib import messages
        obj = self.get_object(request, pk)
        if obj:
            obj.is_active = not obj.is_active
            obj.save()
            status = "ativado" if obj.is_active else "desativado e movido para a lixeira"
            messages.success(request, f"O item '{obj}' foi {status} com sucesso.")
        return redirect(request.META.get('HTTP_REFERER', '..'))

    def ações(self, obj):
        """Ações rápidas: Editar, Ver no Site e Desativar (Lixeira)."""
        from django.urls import reverse
        from django.utils.safestring import mark_safe
        
        edit_url = reverse(f'admin:{obj._meta.app_label}_{obj._meta.model_name}_change', args=[obj.pk])
        # Criamos um link que apenas desativa o produto via URL
        toggle_url = f"toggle-active/{obj.pk}/"
        
        return mark_safe(f'''
            <div style="display: flex; gap: 12px; align-items: center;">
                <a href="{edit_url}" title="Editar" style="text-decoration: none; font-size: 16px;">📝</a>
                <a href="{toggle_url}" title="Desativar/Mover para Lixeira" style="color: #ba2121; text-decoration: none; font-size: 16px;">🗑️</a>
            </div>
        ''')
    ações.short_description = 'Ações'

class ProductNutritionInline(admin.StackedInline):
    model = ProductNutrition
    extra = 0
    can_delete = False
    verbose_name = "Tabela Nutricional (Cabeçalho)"



class ProductNutritionRowForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Se a linha já existe no banco, bloqueamos o nome do nutriente
        if self.instance and self.instance.pk:
            self.fields['label'].disabled = True
            self.fields['label'].required = False

class ProductNutritionRowInline(admin.TabularInline):
    model = ProductNutritionRow
    form = ProductNutritionRowForm
    extra = 0
    fields = ('sort_order', 'label', 'value_100g', 'value_serving', 'vd_percentage', 'value_4', 'value_5')
    verbose_name = "Linha da Tabela Nutricional"
    verbose_name_plural = "Tabela Nutricional (Nutrientes)"

    def get_formset(self, request, obj=None, **kwargs):
        """Muda os títulos das colunas dinamicamente baseado no que foi escrito no cabeçalho."""
        formset = super().get_formset(request, obj, **kwargs)
        # Se estivermos editando um produto e ele já tiver o cabeçalho de nutrição
        if obj and hasattr(obj, 'nutrition'):
            nut = obj.nutrition
            formset.form.base_fields['value_100g'].label = nut.col_1_label
            formset.form.base_fields['value_serving'].label = nut.col_2_label
            formset.form.base_fields['vd_percentage'].label = nut.col_3_label
            formset.form.base_fields['value_4'].label = nut.col_4_label
            formset.form.base_fields['value_5'].label = nut.col_5_label
        return formset

    def has_delete_permission(self, request, obj=None):
        return False

    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/nutrition_dynamic.js',)

@admin.register(ProductNutrition)
class ProductNutritionAdmin(admin.ModelAdmin):
    list_display = ('product', 'serving_size', 'portions_per_package')

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
    list_display = ('image_preview_list', 'name', 'category', 'is_active', 'ver_no_site', 'ações')
    list_filter = ('category', 'is_active', 'is_featured')
    search_fields = ('name', 'short_description')
    ordering = ('name',)
    inlines = [ProductNutritionInline, ProductNutritionRowInline, ProductTipsInline]
    readonly_fields = ('image_preview',)

    def image_preview_list(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" style="height: 40px; width: 40px; border-radius: 8px; object-fit: contain; background: #f8f9fa; border: 1px solid #dee2e6;"/>', obj.image_url.url)
        return "-"
    image_preview_list.short_description = 'Capa'

    def ver_no_site(self, obj):
        url = f"http://localhost:3000/catalogo/{obj.slug}"
        return format_html('<a href="{}" target="_blank" style="background: #1a472a; color: white; padding: 5px 12px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 11px;">👁️ Ver Site</a>', url)
    ver_no_site.short_description = 'Link Externo'

    def image_preview(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" style="max-height: 200px;"/>', obj.image_url.url)
        return "-"
    image_preview.short_description = 'Prévia da Imagem'
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'slug', 'category', 'is_active', 'is_featured')
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

