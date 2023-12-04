from django.urls import path
from .views import WeatherDataListCreateView

app_name = 'backend'

urlpatterns = [
    path('weather/<str:city>/', WeatherDataListCreateView.as_view(), name='weather-list-create'),
]