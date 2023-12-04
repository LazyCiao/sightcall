import requests
from rest_framework import generics
from .serializers import WeatherDataSerializer
from .secrets import OPENWEATHERMAP_API_KEY

class WeatherDataListCreateView(generics.ListCreateAPIView):
    serializer_class = WeatherDataSerializer

    def get_queryset(self):
        # Get parameters from URL
        city = self.kwargs.get('city')
        lat = self.request.query_params.get('lat')
        lon = self.request.query_params.get('lon')

        if city:
            # If city is provided, get weather data by city name
            return self.get_weather_data_by_city(city)
        elif lat and lon:
            # If latitude and longitude are provided, get weather data by coordinates
            return self.get_weather_data_by_coordinates(lat, lon)
        else:
            # Return an empty list if no valid parameters are provided
            return []

    def get_weather_data_by_city(self, city):
        # Create URL for weather data by city
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHERMAP_API_KEY}'
        return self.make_api_call(url, city)

    def get_weather_data_by_coordinates(self, lat, lon):
        # Create URL for weather data by coordinates
        url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}'
        return self.make_api_call(url, f'{lat},{lon}')

    def make_api_call(self, url, identifier):
        # Make API call to OpenWeatherMap
        response = requests.get(url)

        if response.status_code == 200:
            # If API call is successful, parse and return weather data
            data = response.json()
            return [{
                'city': identifier,
                'temperature': data['main']['temp'],
                'description': data['weather'][0]['description'],
                'humidity': data['main']['humidity'],
                'wind_speed': data['wind']['speed'],
                'cloudiness': data['clouds']['all'],
                'sunrise': data['sys']['sunrise'],
                'sunset': data['sys']['sunset'],
            }]
        else:
            # Return an empty list if API call fails
            return []
