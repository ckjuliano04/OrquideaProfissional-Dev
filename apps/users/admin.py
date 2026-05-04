from django import forms
from django.contrib import admin
from .models import Users

class UserChangeForm(forms.ModelForm):
    new_password = forms.CharField(
        label="Nova Senha (deixe em branco para não alterar)",
        required=False,
        widget=forms.PasswordInput,
    )

    class Meta:
        model = Users
        fields = ("email", "full_name", "user_type", "status", "is_active")

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    form = UserChangeForm
    list_display = ("full_name", "email", "user_type", "status", "is_active")
    list_filter = ("user_type", "status", "is_active")
    search_fields = ("email", "full_name")
    readonly_fields = ("email",)

    fieldsets = (
        ('Dados Pessoais', {
            'fields': ('full_name', 'email', 'phone', 'document_number')
        }),
        ('Permissões e Status', {
            'fields': ('user_type', 'status', 'is_active')
        }),
        ('Segurança', {
            'fields': ('new_password',),
            'description': 'Use este campo apenas se desejar alterar a senha do usuário.'
        }),
    )

    def save_model(self, request, obj, form, change):
        # Se uma nova senha foi digitada no formulário
        new_password = form.cleaned_data.get("new_password")
        if new_password:
            obj.set_password(new_password)
        super().save_model(request, obj, form, change)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
