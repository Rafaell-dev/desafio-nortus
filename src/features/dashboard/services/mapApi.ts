import { LocationResponse } from '../types/location.types';

export class MapApi {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? '') {
    this.baseUrl = baseUrl;
  }

  async getLocations(token: string): Promise<LocationResponse> {
    const response = await fetch(`${this.baseUrl}/map/locations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch map locations');
    }

    return response.json();
  }
}
