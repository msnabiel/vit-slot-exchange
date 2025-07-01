// components/RideMap.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type RideRequest = {
  id: string;
  name: string;
  mobile: string;
  to: string;
  notes: string;
  from_lat: number;
  from_lng: number;
  status: string;
};

export default function RideMap({ rides }: { rides: RideRequest[] }) {
  const defaultPosition = [12.8406, 80.1537]; // VIT Chennai approx

  return (
    <MapContainer center={defaultPosition} zoom={12} className="h-[400px] rounded-md z-0">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />
      {rides.map((ride) => (
        <Marker key={ride.id} position={[ride.from_lat, ride.from_lng]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>
            <div>
              <p><strong>To:</strong> {ride.to}</p>
              <p>{ride.notes}</p>
              <p><small>{ride.name || "Anonymous"} - {ride.mobile || "No number"}</small></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
