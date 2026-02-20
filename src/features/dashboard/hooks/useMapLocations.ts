'use client';

import { useEffect, useRef, useState } from 'react';
import { mapService } from '../services/mapService';
import { Location } from '../types/location.types';

export function useMapLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await mapService.getLocations();
        setLocations(response.data.locations);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar localizações'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, isLoading, error };
}
