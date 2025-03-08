# Weathered

[![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)](https://leafletjs.com/)
[![Open Street Map](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=OpenStreetMap&logoColor=white)](https://www.openstreetmap.org/)
[![ChartsJS](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![NodeJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)


A simple and free weather forecast app, doesn't even require API keys, just build and enjoy!

## Features

The app starts by taking your position and fetching its forecast, but you can easily change it, by clicking anywhere or search for any place in the searchbox.

Generally the application fetches the forecast for a week, and you can navigate through the days by clicking on the arrows around the date.

You can find all information about the current place forecast, including:

* Current forecast place
* Current forecast date
* Current temperature and windspeed
* Min and max temperature of the day
* Textual weather of the day
* A chart with the daily temperature, windspeed and humidity, displayed in periods of 3 hours

## Resources

Weathered uses two external APIs:
* [OpenMeteo](https://open-meteo.com/), for the weather forecast
* [Nominatim](https://nominatim.openstreetmap.org/), for the place search by coordinates and name
