import { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet';
import { Map } from 'leaflet';

import { getWeather } from '../service/weather.service';
import { getLocationByCoordinates, getLocationByName } from '../service/location.service';
import { setTimezone } from '../service/timezone.service';

import { Weather } from '../model/weather.interface';
import { Coordinates } from '../model/coordinates.interface';
import { Location } from '../model/location.interface';

import Sidebar from '../component/Sidebar';
import Logo from '../component/Logo';
import MapMarker from '../component/MapMarker';
import Chart from '../component/Chart';

import '../style/page/WeatherForecast.css';

import {
  BsThermometerHalf,
  BsThermometerHigh,
  BsThermometerLow,
  BsWind,
  BsCalendarEvent,
  BsSunFill,
  BsCloudSunFill,
  BsCloudFill,
  BsCloudFog2Fill,
  BsFillCloudRainFill,
  BsCloudRainHeavyFill,
  BsCloudSnowFill
} from 'react-icons/bs';

import { IoThunderstorm } from 'react-icons/io5';

import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import { FaMapMarkerAlt } from 'react-icons/fa';

import { BsSearch } from 'react-icons/bs';

import { useAlert } from 'react-alert';

import moment from 'moment';

import blankWeather from '../data/blank-weather';
import blankCoordinates from '../data/blank-coordinates';
import blankLocation from '../data/blank-location';
import { ChartDataset } from 'chart.js';

function WeatherForecast() {
  const [map, setMap] = useState<Map>();
  const [weather, setWeather] = useState<Weather>(blankWeather);
  const [position, setPosition] = useState<Coordinates>(blankCoordinates);
  const [location, setLocation] = useState<Location>(blankLocation);
  const [locationDescription, setLocationDescription] = useState<string>('');
  const [dayIndex, setDayIndex] = useState<number>(0);
  const hourIndex = new Date().getHours();

  const alert = useAlert();

  useEffect(() => {
    alert.info('Double click on the map to load a location forecast');
  }, [alert]);

  useEffect(() => {
    async function fetch() {
      try {
        setDayIndex(0);
        setLocationDescription('');
        setWeather(await getWeather(position));
        setLocation(await getLocationByCoordinates(position.latitude, position.longitude));
      } catch (ex: any) {
        alert.error(ex.message);
      }
    }

    fetch();
  }, [position, alert]);

  useEffect(() => {
    if (!location.city && !location.state && !location.country) {
      setLocationDescription(`Somewhere around the globe`);
    } else if (!location.city && !location.state) {
      setLocationDescription(`Somewhere in ${location.country}`);
    } else if (!!location.city && !location.state) {
      setLocationDescription(`City of ${location.city} - ${location.country}`);
    } else if (!location.city && !!location.state) {
      setLocationDescription(`Somewhere around ${location.state} - ${location.country}`);
    } else {
      setLocationDescription(`${location.city}, ${location.state} - ${location.country}`);
    }

  }, [location]);

  useEffect(() => {
    map?.locate();
  }, [map]);

  const handleLocationSearch = useCallback(async (event) => {
    try {
      event.preventDefault();

      const locationSearch = event.target[0].value;

      if (!locationSearch) {
        throw new Error('You must provide a location');
      }

      const foundLocation = await getLocationByName(locationSearch);
      setLocation(foundLocation);
      map?.flyTo([foundLocation.latitude, foundLocation.longitude], 10);

      const foundPosition = { latitude: foundLocation.latitude, longitude: foundLocation.longitude };
      setPosition(foundPosition);
    } catch (ex: any) {
      alert.error(ex.message);
    }
  }, [alert, map]);

  function handlePreviousDayForecast() {
    if (dayIndex > 0) {
      setDayIndex(dayIndex - 1);
    }
  }

  function handleNextDayForecast() {
    if (dayIndex < weather.forecast.length - 1) {
      setDayIndex(dayIndex + 1);
    }
  }

  function handleMapCreate(map: Map) {
    setMap(map);
  }

  function handlePositionChange(position: Coordinates) {
    setPosition(position);
  }

  function handleFindLocation(position: Coordinates) {
    setTimezone(position);
  }

  function shouldShowSun() {
    return [0, 1].includes(weather.forecast[dayIndex].day.weathercode);
  }

  function shouldShowSunnyCloud() {
    return (weather.forecast[dayIndex].day.weathercode === 2);
  }

  function shouldShowCloud() {
    return (weather.forecast[dayIndex].day.weathercode === 3);
  }

  function shouldShowFog() {
    return [45, 48].includes(weather.forecast[dayIndex].day.weathercode);
  }

  function shouldShowDrizzle() {
    return [51, 53, 55, 56, 57].includes(weather.forecast[dayIndex].day.weathercode);
  }

  function shouldShowRain() {
    return [61, 63, 65, 66, 67, 80, 81, 82].includes(weather.forecast[dayIndex].day.weathercode);
  }

  function shouldShowSnow() {
    return [71, 73, 75, 77, 85, 86].includes(weather.forecast[dayIndex].day.weathercode);
  }

  function shouldShowThunderstorm() {
    return [95, 96, 99].includes(weather.forecast[dayIndex].day.weathercode);
  }

  function getWeatherDescription() {
    return {
      "0": "Clear sky",
      "1": "Mainly clear",
      "2": "Partly cloudy",
      "3": "Overcast",
      "45": "Fog",
      "48": "Depositing rime fog",
      "51": "Light drizzle",
      "53": "Moderate drizzle",
      "55": "Dense intensity drizzle",
      "56": "Light freezing drizzle",
      "57": "Dense intensity freezing drizzle",
      "61": "Slight rain",
      "63": "Moderate rain",
      "65": "Heavy intensity rain",
      "66": "Light freezing rain",
      "67": "Heavy intensity freezing rain",
      "71": "Slight snow fall",
      "73": "Moderate snow fall",
      "75": "Heavy intensity snow fall",
      "77": "Snow grains",
      "80": "Slight rain showers",
      "81": "Moderate rain showers",
      "82": "Violent rain showers",
      "85": "Slight snow showers",
      "86": "Heavy snow showers",
      "95": "Slight/Moderate thunderstorm",
      "96": "Thunderstorm with slight hail",
      "99": "Thunderstorm with heavy hail"
    }[weather.forecast[dayIndex].day.weathercode];
  }

  function getChartLabels(): string[] {
    return weather.forecast[dayIndex].hourly
      .filter((forecast) => moment(forecast.time).utcOffset(0).hours() % 3 === 0)
      .map((forecast) => moment(forecast.time).utcOffset(0).format('HH:mm'));
  }

  function getChartDatasets(): ChartDataset[] {
    const data = weather.forecast[dayIndex].hourly.filter(forecast => moment(forecast.time).utcOffset(0).hours() % 3 === 0);

    return [
      {
        label: 'Temperature',
        data: data.map(forecast => forecast.temperature),
        backgroundColor: 'lightcoral',
        borderColor: 'lightcoral'
      },
      {
        label: 'Windspeed',
        data: data.map(forecast => forecast.windspeed),
        backgroundColor: 'lightgreen',
        borderColor: 'lightgreen'
      },
      {
        label: 'Humidity',
        data: data.map(forecast => forecast.humidity),
        backgroundColor: 'lightskyblue',
        borderColor: 'lightskyblue'
      }
    ]
  }

  return (
    <main>
      <MapContainer
        id='map'
        maxBounds={[[90, -180], [-90, 180]]}
        maxBoundsViscosity={1}
        minZoom={3}
        zoom={3}
        center={[position.latitude, position.longitude]}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='Map data & imagery &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors <br /> Weather data by <a href="https://open-meteo.com/">Open-Meteo.com</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <AttributionControl position={'bottomleft'}></AttributionControl>
        <MapMarker
          onMapCreate={handleMapCreate}
          onPositionChange={handlePositionChange}
          onFindLocation={handleFindLocation}
          position={position}
          popupContent={locationDescription}
        ></MapMarker>
      </MapContainer>

      <Sidebar>
        <header>
          <Logo></Logo>
        </header>
        <main>
          <form id="location-search-form" onSubmit={handleLocationSearch}>
            <div className="info-content">
              <input
                id="input-location"
                type="text" size={40}
                placeholder='Search for any place'
                title='You can search for districts, cities, countries, islands, monuments, squares, buildings, mountains, rivers, beaches, etc.'
              />
              <button>
                <BsSearch size={20}></BsSearch>
              </button>
            </div>
          </form>
          <div className="info-content">
            <div id='location-content' title='Current forecast place'>
              <FaMapMarkerAlt size={20}></FaMapMarkerAlt>
              <span>
                {locationDescription}
              </span>
            </div>
          </div>
          <div id='date-content'>
            <button onClick={handlePreviousDayForecast} disabled={dayIndex === 0} title='Previous day forecast'>
              <MdArrowBackIos size={30}></MdArrowBackIos>
            </button>
            <BsCalendarEvent size={40} title='Current forecast date' style={{ color: 'grey' }}></BsCalendarEvent>
            <span title='Current forecast date'>
              {moment(weather.forecast[dayIndex].date).utcOffset(0).format('DD/MM/YYYY')}
            </span>
            <button onClick={handleNextDayForecast} disabled={dayIndex === weather.forecast.length - 1} title='Next day forecast'>
              <MdArrowForwardIos size={30}></MdArrowForwardIos>
            </button>
          </div>
          <div className='info-content'>
            <div className='weather-info' title='Current temperature'>
              <BsThermometerHalf size={40}></BsThermometerHalf>
              <span>
                {weather.forecast[dayIndex].hourly[hourIndex]?.temperature} {weather.units.temperature}
              </span>
            </div>

            <div className='weather-info' title='Current windspeed'>
              <BsWind size={40}></BsWind>
              <span>
                {weather.forecast[dayIndex].hourly[hourIndex]?.windspeed} {weather.units.windspeed}
              </span>
            </div>
          </div>
          <div className='info-content'>
            <div className='weather-info' title='Min temperature'>
              <BsThermometerLow size={40} style={{ color: 'lightskyblue' }}></BsThermometerLow>
              <span>
                {weather.forecast[dayIndex].day.temperatureMin} {weather.units.temperature}
              </span>
            </div>
            <div className='weather-info' title='Max temperature'>
              <BsThermometerHigh size={40} style={{ color: 'lightcoral' }}></BsThermometerHigh>
              <span>
                {weather.forecast[dayIndex].day.temperatureMax} {weather.units.temperature}
              </span>
            </div>
          </div>
          <div className="info-content" title={getWeatherDescription()}>
            <div className='weather-info'>
              {shouldShowSun() && <BsSunFill size={40}></BsSunFill>}
              {shouldShowSunnyCloud() && <BsCloudSunFill size={40}></BsCloudSunFill>}
              {shouldShowCloud() && <BsCloudFill size={40}></BsCloudFill>}
              {shouldShowFog() && <BsCloudFog2Fill size={40}></BsCloudFog2Fill>}
              {shouldShowDrizzle() && <BsFillCloudRainFill size={40}></BsFillCloudRainFill>}
              {shouldShowRain() && <BsCloudRainHeavyFill size={40}></BsCloudRainHeavyFill>}
              {shouldShowSnow() && <BsCloudSnowFill size={40}></BsCloudSnowFill>}
              {shouldShowThunderstorm() && <IoThunderstorm size={40}></IoThunderstorm>}
              <span>
                {getWeatherDescription()}
              </span>
            </div>
          </div>
        </main>
        <footer id='forecast-chart'>
          <Chart
            width={350}
            height={200}
            labels={getChartLabels()}
            datasets={getChartDatasets()}
            afterTooltipLabel={weather.units}
          ></Chart>
        </footer>
      </Sidebar>
    </main>
  );
}

export default WeatherForecast;