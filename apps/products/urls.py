from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, PortalProductDetailView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('', ProductListView.as_view(), name='product_list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
    path('portal/<slug:slug>/', PortalProductDetailView.as_view(), name='portal_product_detail'),
]