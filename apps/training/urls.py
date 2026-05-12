from django.urls import path

from .views import TrainingDetailView, TrainingListView

urlpatterns = [
    path("", TrainingListView.as_view(), name="training_list"),
    path("<int:pk>/", TrainingDetailView.as_view(), name="training_detail"),
]
