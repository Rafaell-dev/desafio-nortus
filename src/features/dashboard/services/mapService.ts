import { LocationResponse } from '../types/location.types';

export class MapService {
  async getLocations(): Promise<LocationResponse> {
    const response = await fetch('/api/map');

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao buscar localizações.');
    }

    return response.json();
  }
}

export const mapService = new MapService();
