from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    # Auth API (login, refresh, me)
    path("api/", include("apps.users.urls")),
    # Apps
    path("api/products/", include("apps.products.urls")),
    path("api/portal/training/", include("apps.training.urls")),
]