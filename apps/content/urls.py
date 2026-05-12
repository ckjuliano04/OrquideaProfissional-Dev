from django.urls import path

from .views import StoreListView, TipListView

urlpatterns = [
    path("stores/", StoreListView.as_view(), name="store_list"),
    path("tips/", TipListView.as_view(), name="tip_list"),
]
