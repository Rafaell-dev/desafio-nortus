'use client';

import { useEffect, useRef, useState } from 'react';
import { MapBrowserEvent } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import { Location } from '../types/location.types';
import { ChevronDown } from 'lucide-react';
import { useMapLocations } from '../hooks/useMapLocations';
import { MapProvider, useMap } from '@/src/features/common/contexts/MapContext';
import { useTranslations } from 'next-intl';

function MapMarkers({ locations }: { locations: Location[] }) {
  const { map } = useMap();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const popupElement = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<Overlay | null>(null);

  useEffect(() => {
    if (!map) return;

    // init overlay
    if (!overlayRef.current && popupElement.current) {
      const overlay = new Overlay({
        element: popupElement.current,
        autoPan: {
          animation: { duration: 250 },
        },
        positioning: 'bottom-center',
        offset: [0, -10],
      });
      map.addOverlay(overlay);
      overlayRef.current = overlay;
    }

    // click handler
    const clickHandler = (evt: MapBrowserEvent) => {
      const feature = map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => feature
      );
      if (feature) {
        const loc = feature.get('locationData');
        setSelectedLocation(loc);
        overlayRef.current?.setPosition(evt.coordinate);
      } else {
        setSelectedLocation(null);
        overlayRef.current?.setPosition(undefined);
      }
    };

    // pointer move handler
    const pointerMoveHandler = (e: MapBrowserEvent) => {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    };

    map.on('click', clickHandler);
    map.on('pointermove', pointerMoveHandler);

    return () => {
      map.un('click', clickHandler);
      map.un('pointermove', pointerMoveHandler);
      if (overlayRef.current) {
        map.removeOverlay(overlayRef.current);
        overlayRef.current = null;
      }
    };
  }, [map]);

  // Update Markers
  useEffect(() => {
    if (!map) return;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10,
    });

    map.addLayer(vectorLayer);

    const features = locations.map((loc) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(loc.coordinates)),
      });
      feature.set('locationData', loc);
      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: loc.color }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
        })
      );
      return feature;
    });

    vectorSource.addFeatures(features);

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, locations]);

  return (
    <div
      ref={popupElement}
      className="bg-dark-surface min-w-[200px] rounded-lg border border-gray-700 p-3 shadow-xl"
    >
      {selectedLocation && (
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: selectedLocation.color }}
            />
            <h4 className="text-sm font-bold text-white">
              {selectedLocation.name}
            </h4>
          </div>
          <p className="mb-2 text-xs text-gray-400">
            {selectedLocation.description}
          </p>
          <div className="flex flex-col gap-0.5 text-[10px] text-gray-500">
            <span>{selectedLocation.category.toUpperCase()}</span>
            <span>{selectedLocation.address}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ClientMap() {
  const { locations, isLoading, error } = useMapLocations();
  const t = useTranslations();

  return (
    <div className="bg-dark-surface relative w-full overflow-hidden rounded-2xl p-1">
      {/* Filters Header */}
      <div className="pointer-events-none absolute top-4 left-4 z-10 flex w-[calc(100%-2rem)] flex-col gap-2 sm:flex-row sm:justify-between sm:gap-4">
        <h3 className="pointer-events-auto text-base font-semibold text-white sm:text-lg">
          {t('dashboard.clientMap')}
        </h3>
        <div className="pointer-events-auto flex flex-wrap gap-2">
          <button className="bg-dark-surface/90 flex items-center gap-2 rounded-full border border-gray-700/50 px-3 py-1 text-[10px] text-gray-300 backdrop-blur-sm transition-colors hover:text-white sm:px-4 sm:py-1.5 sm:text-xs">
            {t('dashboard.allLocations')} <ChevronDown size={14} />
          </button>
          <button className="bg-dark-surface/90 flex items-center gap-2 rounded-full border border-gray-700/50 px-3 py-1 text-[10px] text-gray-300 backdrop-blur-sm transition-colors hover:text-white sm:px-4 sm:py-1.5 sm:text-xs">
            {t('dashboard.allTypes')} <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <MapProvider>
        <MapMarkers locations={locations} />
      </MapProvider>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-dark-surface/50 absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm">
          <p className="text-white">{t('dashboard.loadingMap')}</p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="bg-dark-surface/50 absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
