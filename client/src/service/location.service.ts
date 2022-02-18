import { Location } from '../model/location.interface';
import api from './api';

import blankLocation from '../data/blank-location';

async function getLocationByCoordinates(latitude: number, longitude: number): Promise<Location> {
  try {
    const response = await api.get(`/v1/location/${latitude}/${longitude}`);
    return response.data;
  } catch (ex) {
    return blankLocation;
  }
}

async function getLocationByName(name: string): Promise<Location> {
  try {
    const response = await api.get(`/v1/location/${name}`);
    return response.data;
  } catch (ex: any) {
    throw new Error(ex.response.data.message);
  }
}

export { getLocationByCoordinates, getLocationByName }