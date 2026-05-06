import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { Box, CircularProgress } from '@mui/material';
import 'leaflet/dist/leaflet.css';

// Leaflet's default marker icons break under bundlers (webpack rewrites the
// asset URLs). Re-point them at the CDN-hosted versions so markers render
// without consumers having to configure asset loaders.
const DEFAULT_ICON = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DEFAULT_ICON;

export interface GeoPoint {
  id: string | number;
  lat: number;
  lng: number;
  label?: string;
  description?: React.ReactNode;
  color?: string;
}

export interface GeoPointsProps {
  points: GeoPoint[];
  center?: [number, number];
  zoom?: number;
  height?: number | string;
  width?: number | string;
  variant?: 'marker' | 'circle';
  fitBounds?: boolean;
  tileUrl?: string;
  tileAttribution?: string;
  loading?: boolean;
}

const DEFAULT_TILE_URL =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const FitBoundsOnPoints: React.FC<{ points: GeoPoint[]; enabled: boolean }> = ({
  points,
  enabled,
}) => {
  const map = useMap();
  React.useEffect(() => {
    if (!enabled || points.length === 0) return;
    const bounds: LatLngBoundsExpression = points.map(
      (p) => [p.lat, p.lng] as [number, number]
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, enabled, map]);
  return null;
};

const GeoPoints: React.FC<GeoPointsProps> = ({
  points,
  center,
  zoom = 5,
  height = 500,
  width = '100%',
  variant = 'marker',
  fitBounds = true,
  tileUrl = DEFAULT_TILE_URL,
  tileAttribution = DEFAULT_TILE_ATTRIBUTION,
  loading = false,
}) => {
  const resolvedCenter: LatLngExpression =
    center ??
    (points.length > 0 ? [points[0].lat, points[0].lng] : [20.5937, 78.9629]);

  return (
    <Box
      sx={{
        position: 'relative',
        height,
        width,
        '& .leaflet-container': { height: '100%', width: '100%' },
      }}
    >
      <MapContainer center={resolvedCenter} zoom={zoom} scrollWheelZoom>
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        <FitBoundsOnPoints points={points} enabled={fitBounds} />
        {points.map((p) =>
          variant === 'circle' ? (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={8}
              pathOptions={{
                color: p.color ?? '#1976d2',
                fillColor: p.color ?? '#1976d2',
                fillOpacity: 0.7,
              }}
            >
              {(p.label || p.description) && (
                <Popup>
                  {p.label && <strong>{p.label}</strong>}
                  {p.description && (
                    <Box mt={p.label ? 0.5 : 0}>{p.description}</Box>
                  )}
                </Popup>
              )}
            </CircleMarker>
          ) : (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              {(p.label || p.description) && (
                <Popup>
                  {p.label && <strong>{p.label}</strong>}
                  {p.description && (
                    <Box mt={p.label ? 0.5 : 0}>{p.description}</Box>
                  )}
                </Popup>
              )}
            </Marker>
          )
        )}
      </MapContainer>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.6)',
            zIndex: 500,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default GeoPoints;
