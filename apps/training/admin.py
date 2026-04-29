from django.contrib import admin
from .models import (
    RestrictedMaterials,
    RestrictedFiles,
    RestrictedVideos,
    RestrictedMaterialRoles,
)

from django.utils import timezone


class BaseCMSAdmin(admin.ModelAdmin):
    exclude = ("created_at", "updated_at", "created_by_user", "updated_by_user")

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_at = timezone.now()
            obj.created_by_user = request.user
        else:
            obj.updated_at = timezone.now()
            obj.updated_by_user = request.user
        super().save_model(request, obj, form, change)


class RestrictedFilesInline(admin.TabularInline):
    model = RestrictedFiles
    extra = 1


class RestrictedVideosInline(admin.TabularInline):
    model = RestrictedVideos
    extra = 1


@admin.register(RestrictedMaterials)
class RestrictedMaterialsAdmin(BaseCMSAdmin):
    list_display = ("title", "audience_type", "is_active", "published_at")
    list_filter = ("audience_type", "is_active")
    search_fields = ("title",)
    inlines = [RestrictedFilesInline, RestrictedVideosInline]
