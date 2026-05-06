from django.contrib import admin
from .models import (
    RestrictedMaterials,
    RestrictedFiles,
    RestrictedVideos,
    RestrictedMaterialRoles,
)

from django.utils import timezone


class BaseCMSAdmin(admin.ModelAdmin):
    exclude = ("created_at", "updated_at", "created_by_user", "updated_by_user", "audience_type")

    class Media:
        css = {
            'all': ('admin/css/cms_custom.css',)
        }
        js = ('admin/js/cms_custom.js',)

    def save_model(self, request, obj, form, change):
        # Define automaticamente como 'tecnico' para treinamentos
        if hasattr(obj, 'audience_type'):
            obj.audience_type = 'tecnico'
            
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


class RestrictedFilesInline(admin.TabularInline):
    model = RestrictedFiles
    fields = ('title', 'file_upload', 'sort_order')
    extra = 1


class RestrictedVideosInline(admin.TabularInline):
    model = RestrictedVideos
    fields = ('title', 'video_file', 'video_url', 'sort_order')
    extra = 1


@admin.register(RestrictedMaterials)
class RestrictedMaterialsAdmin(BaseCMSAdmin):
    list_display = ("title", "is_active", "published_at", "ações")
    list_filter = ("is_active",)
    search_fields = ("title",)
    inlines = [RestrictedFilesInline, RestrictedVideosInline]
