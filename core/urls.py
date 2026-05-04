from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from apps.users.views import LoginView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    # Auth
    path("api/token/", LoginView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/users/me/", UserProfileView.as_view(), name="user_profile"),
    # Apps
    path("api/products/", include("apps.products.urls")),
    path("api/portal/training/", include("apps.training.urls")),
    path("api/content/", include("apps.content.urls")),
    path("api/cms/", include("cms.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Personalização do Admin para o Marketing
admin.site.site_header = "Orquídea Profissional | CMS"
admin.site.site_title = "Painel de Controle"
admin.site.index_title = "Gestão de Conteúdo e Produtos"

