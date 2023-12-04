from rest_framework import serializers

class WeatherDataSerializer(serializers.Serializer):
    city = serializers.CharField()
    temperature = serializers.FloatField()
    description = serializers.CharField()
    humidity = serializers.FloatField()
    wind_speed = serializers.FloatField()
    cloudiness = serializers.FloatField()
    sunrise = serializers.IntegerField()
    sunset = serializers.IntegerField()