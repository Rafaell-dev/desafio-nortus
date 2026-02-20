export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
}

export interface LocationResponse {
  data: {
    locations: Location[];
  };
}
