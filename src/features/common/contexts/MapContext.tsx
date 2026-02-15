'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

interface MapContextType {
  map: Map | null;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: React.ReactNode;
  center?: [number, number];
  zoom?: number;
}

export function MapProvider({
  children,
  center = [-34.8717, -8.0631], // Recife, Brazil
  zoom = 8,
}: MapProviderProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapElement.current || map) return;

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          className: 'dark-map-layer',
        }),
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: zoom,
      }),
      controls: [],
    });

    setMap(initialMap);

    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  return (
    <MapContext.Provider value={{ map }}>
      <div className="relative h-[400px] min-h-[400px] w-full overflow-hidden rounded-xl bg-[#1A253A]">
        <div ref={mapElement} className="absolute inset-0 h-full w-full" />
        {children}
      </div>
      <style jsx global>{`
        .dark-map-layer {
          filter: invert(1) hue-rotate(180deg) brightness(0.6) contrast(1.2)
            grayscale(0.2);
        }
        .ol-control {
          display: none;
        }
      `}</style>
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
