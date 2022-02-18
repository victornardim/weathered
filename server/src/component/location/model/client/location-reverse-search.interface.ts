export interface LocationReverseSearch {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

interface Address {
  road: string;
  suburb: string;
  city_district: string;
  city: string;
  municipality: string;
  state_district: string;
  state: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}
