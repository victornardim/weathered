import { Coordinates } from '../model/coordinates.interface';
import { Weather } from '../model/weather.interface';
import api from './api';

async function getWeather(coordinates: Coordinates): Promise<Weather> {
  try {
    const response = await api.get(`/v1/weather/${coordinates.latitude}/${coordinates.longitude}`);
    return response.data;
  } catch (ex: any) {
    throw new Error(ex.response.data.message);
  }
}

export { getWeather };