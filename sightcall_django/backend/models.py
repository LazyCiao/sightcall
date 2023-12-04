from django.db import models

class WeatherData(models.Model):
    city = models.CharField(max_length=25)
    temperature = models.FloatField()
    description = models.CharField(max_length=50)  
    humidity = models.FloatField()
    wind_speed = models.FloatField()
    cloudiness = models.FloatField()
    sunrise = models.IntegerField()
    sunset = models.IntegerField()
