from django.contrib import admin
from .models import Pages, Brands, Stores, Tips

from django.utils import timezone

class BaseCMSAdmin(admin.ModelAdmin):
    exclude = ('created_at', 'updated_at', 'created_by_user', 'updated_by_user')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_at = timezone.now()
            obj.created_by_user = request.user
        else:
            obj.updated_at = timezone.now()
            obj.updated_by_user = request.user
        super().save_model(request, obj, form, change)

@admin.register(Pages)
class PagesAdmin(BaseCMSAdmin):
    list_display = ('title', 'slug', 'is_active', 'sort_order')
    search_fields = ('title', 'slug')

@admin.register(Brands)
class BrandsAdmin(BaseCMSAdmin):
    list_display = ('name', 'is_active', 'sort_order')

@admin.register(Stores)
class StoresAdmin(BaseCMSAdmin):
    list_display = ('title', 'city', 'state', 'is_active')
    list_filter = ('state', 'is_active')

@admin.register(Tips)
class TipsAdmin(BaseCMSAdmin):
    list_display = ('title', 'slug', 'is_active', 'published_at')
