# Weather App

A simple weather application built with React (frontend) and Django with Django Rest Framework (backend). The app fetches weather data from the OpenWeatherMap API.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [License](#license)

## Installation

### Backend (Django/DRF)

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo/sightcall_django
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:
    ```bash
    python manage.py migrate
    ```

4. Obtain an OpenWeatherMap API key and add it to `secrets.py` in the `backend` folder:
    ```python
    # backend/secrets.py
    OPENWEATHERMAP_API_KEY = 'your-api-key-here'
    ```

5. Run the development server:
    ```bash
    python manage.py runserver
    ```

### Frontend (React)

1. Navigate to the React app directory:
    ```bash
    cd ../sightcall_react
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

The app should now be running at http://localhost:3000.

## Usage

1. Open your browser and go to http://localhost:3000.

2. Enter the name of the city in the search bar and click "Search."

3. View the weather information displayed on the page.

## API Endpoints

- **GET /api/weather/{city}/:** Retrieve weather data for a specific city.

## Testing

To run backend tests:

```bash
python manage.py test
Frontend tests are not included in this template, but you can add them based on your testing framework (e.g., Jest).

Folder Structure
backend/: Django backend code.
frontend/: React frontend code.
secrets.py: Store your API keys here.
