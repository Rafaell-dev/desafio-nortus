'use client';

import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
}

export function OpenLayersMap({
  center = [8.8909, 36.4965],
  zoom = 4,
  height = '400px',
  width = '100%',
}: MapProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
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

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(fromLonLat(center));
    map.getView().setZoom(zoom);
  }, [center, zoom, map]);

  return (
    <div
      ref={mapElement}
      className="overflow-hidden rounded-xl border border-gray-700/50"
      style={{ height, width }}
    />
  );
}
