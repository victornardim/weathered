import { Icon, LeafletMouseEvent, LocationEvent, PointExpression } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

function MapMarker({ onMapCreate, onPositionChange, onFindLocation, position, popupContent }) {
  const offset: PointExpression = [0, -35];
  const anchor: PointExpression = [12, 41];

  const [popupReady, setPopupReady] = useState(false);
  let popupRef: any = useRef();

  const map = useMapEvents({
    dblclick(event: LeafletMouseEvent) {
      const { lat, lng } = event.latlng;
      onPositionChange({ latitude: lat, longitude: lng });
    },

    locationfound(event: LocationEvent) {
      const { lat, lng } = event.latlng;
      onPositionChange({ latitude: lat, longitude: lng });
      onFindLocation({ latitude: lat, longitude: lng });
      map.flyTo(event.latlng, 10);
    },
  });

  useEffect(() => {
    onMapCreate(map);
  }, [map, onMapCreate]);

  useEffect(() => {
    if (popupReady && popupContent) {
      popupRef.openOn(map);
    }
  }, [popupReady, map, popupContent]);

  return (
    <Marker
      icon={new Icon({ iconUrl: icon, shadowUrl: shadow, iconAnchor: anchor })}
      position={[position.latitude, position.longitude]}
    >
      <Popup ref={(ref: any) => {
        popupRef = ref;
        setPopupReady(true);
      }}
        offset={offset}
      >
        {popupContent}
      </Popup>
    </Marker>
  );
}

export default MapMarker;