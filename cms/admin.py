from django.contrib import admin
from .models import HomePageSettings, Tip, Brand

@admin.register(HomePageSettings)
class HomePageSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Permite adicionar apenas se não existir nenhuma configuração ainda
        return not HomePageSettings.objects.exists()

@admin.register(Tip)
class TipAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title',)

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'sort_order', 'is_active')
    list_filter = ('is_active',)
    list_editable = ('sort_order', 'is_active')
