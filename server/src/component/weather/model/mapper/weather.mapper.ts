import { WeatherSearch } from '../client/weather-search.interface';
import { WeatherDto } from '../weather.dto';
import moment from 'moment';

export class WeatherMapper {
  public static translate(value: WeatherSearch): WeatherDto {
    return <WeatherDto>{
      units: {
        temperature: value.hourly_units.temperature_2m,
        windspeed: value.hourly_units.windspeed_10m,
        humidity: value.hourly_units.relativehumidity_2m,
      },
      forecast: [...Array(value.daily.time.length).keys()]
        .map((idx) => {
          return {
            date: moment(value.daily.time[idx])
              .utcOffset(0, true)
              .toDate()
              .toISOString(),
            day: {
              temperatureMax: value.daily.temperature_2m_max[idx],
              temperatureMin: value.daily.temperature_2m_min[idx],
              weathercode: value.daily.weathercode[idx],
            },
            hourly: [...Array(24).keys()]
              .map(() => {
                return {
                  time: moment(value.hourly.time.splice(0, 1)[0])
                    .utcOffset(0, true)
                    .toDate()
                    .toISOString(),
                  temperature: value.hourly.temperature_2m.splice(0, 1)[0],
                  windspeed: value.hourly.windspeed_10m.splice(0, 1)[0],
                  humidity: value.hourly.relativehumidity_2m.splice(0, 1)[0],
                };
              })
              .filter((data) => {
                return (
                  data.time &&
                  data.temperature &&
                  data.windspeed &&
                  data.humidity
                );
              }),
          };
        })
        .filter((forecast) => {
          return (
            forecast.day.temperatureMax &&
            forecast.day.temperatureMin &&
            forecast.day.weathercode
          );
        }),
    };
  }
}
