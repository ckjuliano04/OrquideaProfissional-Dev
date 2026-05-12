from django import forms
from django.contrib import admin
from .models import Users, Roles, UserRoles

class UserChangeForm(forms.ModelForm):
    new_password = forms.CharField(
        label="Nova Senha (deixe em branco para não alterar)",
        required=False,
        widget=forms.PasswordInput,
    )
    
    grupo = forms.ModelChoiceField(
        queryset=Roles.objects.all(),
        required=False,
        label="Grupo de Acesso",
        help_text="Selecione o papel deste usuário no sistema."
    )

    class Meta:
        model = Users
        fields = ("email", "full_name", "status", "is_active")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            current_role = UserRoles.objects.filter(user=self.instance).first()
            if current_role:
                self.fields['grupo'].initial = current_role.role

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    form = UserChangeForm
    list_display = ("full_name", "email", "status", "is_active")
    list_filter = ("status", "is_active")
    search_fields = ("email", "full_name")
    readonly_fields = ("email",)

    fieldsets = (
        ('Dados Pessoais', {
            'fields': ('full_name', 'email', 'phone', 'document_number')
        }),
        ('Acesso e Status', {
            'fields': ('grupo', 'status', 'is_active')
        }),
        ('Segurança', {
            'fields': ('new_password',),
            'description': 'Use este campo apenas se desejar alterar a senha do usuário.'
        }),
    )

    def save_model(self, request, obj, form, change):
        new_password = form.cleaned_data.get("new_password")
        if new_password:
            obj.set_password(new_password)
        
        super().save_model(request, obj, form, change)

        selected_role = form.cleaned_data.get("grupo")
        if selected_role:
            UserRoles.objects.filter(user=obj).delete()
            from django.utils import timezone
            UserRoles.objects.create(
                user=obj,
                role=selected_role,
                created_at=timezone.now()
            )

from django.contrib.auth.models import Group

# Removemos o Grupo padrão do Django para não confundir
admin.site.unregister(Group)

@admin.register(Roles)
class RolesAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'access_area')
    search_fields = ('name',)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
