import { LocationReverseSearch } from '../client/location-reverse-search.interface';
import { LocationDto } from '../location.dto';

export class LocationMapper {
  public static translate(value: LocationReverseSearch): LocationDto {
    return <LocationDto>{
      road: value.address.road,
      suburb: value.address.suburb,
      postcode: value.address.postcode,
      city: value.address.city,
      state: value.address.state,
      region: value.address.region,
      country: value.address.country,
      countryCode: value.address.country_code,
      latitude: Number(value.lat),
      longitude: Number(value.lon),
    };
  }
}
