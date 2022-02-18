import { Coordinates } from '../model/coordinates.interface';
import api from './api';

async function setTimezone(coordinates: Coordinates): Promise<void> {
  try {
    const response = await api.post(`/v1/timezone`, coordinates);
    return response.data;
  } catch (ex: any) {
    throw new Error(ex.response.data.message);
  }
}

export { setTimezone };