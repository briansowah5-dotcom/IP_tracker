import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: [number, number];
  zoom: number;
}

function Map({ center, zoom }: MapProps) {
  useEffect(() => {
    const map = L.map('map').setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.marker(center).addTo(map);

    return () => {
      map.remove();
    };
  }, [center, zoom]);

  return <div id="map" className="h-96 w-full z-10"></div>;
}

export default Map;