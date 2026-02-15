import { authService } from '@/src/features/auth/services/authService';
import { MapApi } from './mapApi';
import { LocationResponse } from '../types/location.types';

export class MapService {
  constructor(private api: MapApi) {}

  async getLocations(): Promise<LocationResponse> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    return this.api.getLocations(token);
  }
}

export const mapService = new MapService(new MapApi());
