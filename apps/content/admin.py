from django.contrib import admin
from .models import Pages, Brands, Stores, Tips

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
            obj.created_by_user = request.user
        else:
            obj.updated_at = timezone.now()
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

@admin.register(Pages)
class PagesAdmin(BaseCMSAdmin):
    list_display = ('title', 'slug', 'is_active', 'sort_order', 'ações')
    search_fields = ('title', 'slug')

@admin.register(Brands)
class BrandsAdmin(BaseCMSAdmin):
    list_display = ('name', 'is_active', 'sort_order', 'ações')

@admin.register(Stores)
class StoresAdmin(BaseCMSAdmin):
    list_display = ('title', 'city', 'state', 'email', 'is_active', 'sort_order')
    list_filter = ('state', 'is_active')
    search_fields = ('title', 'city', 'address_text', 'email')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'is_active', 'sort_order')
        }),
        ('Localização', {
            'fields': ('city', 'state', 'address_text', 'latitude', 'longitude')
        }),
        ('Contato', {
            'fields': ('contact_info', 'email')
        }),
    )

@admin.register(Tips)
class TipsAdmin(BaseCMSAdmin):
    list_display = ('title', 'slug', 'is_active', 'published_at', 'ações')
