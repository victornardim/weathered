import { Weather } from '../model/weather.interface';

const blankWeather: Weather = {
  units: {
    temperature: '',
    windspeed: '',
    humidity: ''
  },
  forecast: [
    {
      date: '',
      day: {
        temperatureMax: 0,
        temperatureMin: 0,
        weathercode: 0
      },
      hourly: [
        {
          time: '',
          temperature: 0,
          windspeed: 0,
          humidity: 0
        }
      ]
    }
  ]
};

export default blankWeather;