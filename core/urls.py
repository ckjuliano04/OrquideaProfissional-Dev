from django.contrib import admin
from django.urls import path, include
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
]
