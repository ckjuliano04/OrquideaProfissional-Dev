from django.contrib import admin
from .models import RestrictedMaterials, RestrictedFiles, RestrictedVideos, RestrictedMaterialRoles

class BaseReadOnlyAdmin(admin.ModelAdmin):
    # Impedir escrita via Admin por enquanto, já que managed=False
    def has_add_permission(self, request): return False
    def has_delete_permission(self, request, obj=None): return False
    def has_change_permission(self, request, obj=None): return False

class RestrictedFilesInline(admin.TabularInline):
    model = RestrictedFiles
    extra = 0
    def has_add_permission(self, request, obj): return False
    def has_delete_permission(self, request, obj=None): return False
    def has_change_permission(self, request, obj=None): return False

class RestrictedVideosInline(admin.TabularInline):
    model = RestrictedVideos
    extra = 0
    def has_add_permission(self, request, obj): return False
    def has_delete_permission(self, request, obj=None): return False
    def has_change_permission(self, request, obj=None): return False

@admin.register(RestrictedMaterials)
class RestrictedMaterialsAdmin(BaseReadOnlyAdmin):
    list_display = ('title', 'audience_type', 'is_active', 'published_at')
    list_filter = ('audience_type', 'is_active')
    search_fields = ('title',)
    inlines = [RestrictedFilesInline, RestrictedVideosInline]
