from django.urls import path
from .views import HomePageDataView

urlpatterns = [
    path('home/', HomePageDataView.as_view(), name='cms_home'),
]
