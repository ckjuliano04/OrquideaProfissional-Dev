from django.contrib import admin
from .models import Users


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ("email", "full_name", "user_type", "status", "is_active")
    list_filter = ("user_type", "status", "is_active")
    search_fields = ("email", "full_name")
    readonly_fields = ("created_at", "updated_at", "last_login_at")

    # Impede que o admin tente criar/deletar usuários, já que o banco é managed=False
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
