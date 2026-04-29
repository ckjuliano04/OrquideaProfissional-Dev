from django.urls import path
from .views import TrainingListView, TrainingDetailView

urlpatterns = [
    path('', TrainingListView.as_view(), name='training_list'),
    path('<int:pk>/', TrainingDetailView.as_view(), name='training_detail'),
]
