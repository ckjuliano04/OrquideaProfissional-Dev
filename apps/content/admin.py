from django.contrib import admin
from .models import Pages, Brands, Stores, Tips

class BaseReadOnlyAdmin(admin.ModelAdmin):
    # Impedir escrita via Admin por enquanto, já que managed=False
    def has_add_permission(self, request): return False
    def has_delete_permission(self, request, obj=None): return False
    def has_change_permission(self, request, obj=None): return False

@admin.register(Pages)
class PagesAdmin(BaseReadOnlyAdmin):
    list_display = ('title', 'slug', 'is_active', 'sort_order')
    search_fields = ('title', 'slug')

@admin.register(Brands)
class BrandsAdmin(BaseReadOnlyAdmin):
    list_display = ('name', 'is_active', 'sort_order')

@admin.register(Stores)
class StoresAdmin(BaseReadOnlyAdmin):
    list_display = ('title', 'city', 'state', 'is_active')
    list_filter = ('state', 'is_active')

@admin.register(Tips)
class TipsAdmin(BaseReadOnlyAdmin):
    list_display = ('title', 'slug', 'is_active', 'published_at')
