from django.contrib import admin # Adicione esta linha
from django.urls import path, include # Adicione 'include' aqui
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Rota de Login para o Next.js
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Apps
    path('api/products/', include('apps.products.urls')),
]