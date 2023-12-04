from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class WeatherDataTests(APITestCase):
    def test_api_response(self):
        # Test that the API returns a successful response for a specific city
        url = reverse('backend:weather-list-create', kwargs={'city': 'London'})
        response = self.client.get(url)

        # Check if the response status code is HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_response_with_valid_city(self):
        # Test API response with a valid city, checking data format
        url = reverse('api:weather-list-create', kwargs={'city': 'London'})
        response = self.client.get(url)

        # Check if the response status code is HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response data is a list
        self.assertIsInstance(response.data, list)

        # Check if the response data is not empty
        self.assertTrue(response.data, "Response data is empty")

        # Iterate over each data dictionary in the response data
        for data_dict in response.data:
            # Check if 'city', 'temperature', and 'description' keys are present in each dictionary
            self.assertIn('city', data_dict)
            self.assertIn('temperature', data_dict)
            self.assertIn('description', data_dict)
