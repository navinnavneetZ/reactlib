import React from 'react';
import { render, screen } from '@testing-library/react';
import GeoPoints, { GeoPoint } from './GeoPoints';

jest.mock('react-leaflet', () => {
  const React = require('react');
  return {
    MapContainer: ({
      children,
      center,
      zoom,
    }: {
      children: React.ReactNode;
      center: [number, number];
      zoom: number;
    }) => (
      <div
        data-testid="map-container"
        data-center={center.join(',')}
        data-zoom={zoom}
      >
        {children}
      </div>
    ),
    TileLayer: ({ url }: { url: string }) => (
      <div data-testid="tile-layer" data-url={url} />
    ),
    Marker: ({
      children,
      position,
    }: {
      children?: React.ReactNode;
      position: [number, number];
    }) => (
      <div data-testid="marker" data-position={position.join(',')}>
        {children}
      </div>
    ),
    CircleMarker: ({
      children,
      center,
      pathOptions,
    }: {
      children?: React.ReactNode;
      center: [number, number];
      pathOptions: { color?: string };
    }) => (
      <div
        data-testid="circle-marker"
        data-center={center.join(',')}
        data-color={pathOptions?.color}
      >
        {children}
      </div>
    ),
    Popup: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="popup">{children}</div>
    ),
    useMap: () => ({ fitBounds: jest.fn() }),
  };
});

jest.mock('leaflet', () => ({
  __esModule: true,
  default: {
    icon: () => ({}),
    Marker: { prototype: { options: {} } },
  },
  icon: () => ({}),
  Marker: { prototype: { options: {} } },
}));

jest.mock('leaflet/dist/leaflet.css', () => ({}), { virtual: true });

const points: GeoPoint[] = [
  { id: 1, lat: 19.076, lng: 72.8777, label: 'Mumbai', description: '420 beds' },
  { id: 2, lat: 28.6139, lng: 77.209, label: 'Delhi' },
  { id: 3, lat: 12.9716, lng: 77.5946 },
];

describe('GeoPoints', () => {
  it('renders a map container with a tile layer', () => {
    render(<GeoPoints points={points} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
  });

  it('renders one marker per point by default', () => {
    render(<GeoPoints points={points} />);
    expect(screen.getAllByTestId('marker')).toHaveLength(3);
    expect(screen.queryByTestId('circle-marker')).not.toBeInTheDocument();
  });

  it('renders circle markers when variant is "circle"', () => {
    render(<GeoPoints points={points} variant="circle" />);
    expect(screen.getAllByTestId('circle-marker')).toHaveLength(3);
    expect(screen.queryByTestId('marker')).not.toBeInTheDocument();
  });

  it('renders popup with label and description', () => {
    render(<GeoPoints points={[points[0]]} />);
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByText('Mumbai')).toBeInTheDocument();
    expect(screen.getByText('420 beds')).toBeInTheDocument();
  });

  it('does not render a popup for points with no label or description', () => {
    render(<GeoPoints points={[points[2]]} />);
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  it('passes point lat/lng to markers', () => {
    render(<GeoPoints points={[points[0]]} />);
    expect(screen.getByTestId('marker')).toHaveAttribute(
      'data-position',
      '19.076,72.8777'
    );
  });

  it('uses first point as center when no center prop is given', () => {
    render(<GeoPoints points={points} />);
    expect(screen.getByTestId('map-container')).toHaveAttribute(
      'data-center',
      '19.076,72.8777'
    );
  });

  it('uses provided center when given', () => {
    render(<GeoPoints points={points} center={[22, 78]} zoom={4} />);
    const map = screen.getByTestId('map-container');
    expect(map).toHaveAttribute('data-center', '22,78');
    expect(map).toHaveAttribute('data-zoom', '4');
  });

  it('falls back to India center when points are empty', () => {
    render(<GeoPoints points={[]} />);
    expect(screen.getByTestId('map-container')).toHaveAttribute(
      'data-center',
      '20.5937,78.9629'
    );
  });

  it('applies custom color to circle markers', () => {
    render(
      <GeoPoints
        points={[{ ...points[0], color: '#ff0000' }]}
        variant="circle"
      />
    );
    expect(screen.getByTestId('circle-marker')).toHaveAttribute(
      'data-color',
      '#ff0000'
    );
  });
});
