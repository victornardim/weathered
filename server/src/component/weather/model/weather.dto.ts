export interface WeatherDto {
  units: Units;
  forecast: Forecast[];
}

interface Units {
  temperature: string;
  windspeed: string;
  humidity: string;
}

interface Forecast {
  date: string;
  day: Day;
  hourly: Hourly[];
}

interface Day {
  temperatureMax: number;
  temperatureMin: number;
  weathercode: number;
}

interface Hourly {
  time: string;
  temperature: number;
  windspeed: number;
  humidity: number;
}
