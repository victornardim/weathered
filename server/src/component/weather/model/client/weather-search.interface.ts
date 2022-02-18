export interface WeatherSearch {
  daily: Daily;
  daily_units: DailyUnits;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  elevation: number;
  utc_offset_seconds: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
}

interface Daily {
  time: string[];
  weathercode: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
}

interface DailyUnits {
  weathercode: string;
  time: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
  windspeed_10m: number[];
  relativehumidity_2m: number[];
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  windspeed_10m: string;
  relativehumidity_2m: string;
}
