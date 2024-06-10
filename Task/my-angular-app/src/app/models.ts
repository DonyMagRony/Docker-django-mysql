export interface Region {
  id: number;
  name: string;
  location: number ; // Location can be a number or null/undefined
}
export interface Store {
    id?: number;
    name: string;
    location: number;
  }

export interface User {
    id?: number;
    name: string;
    location: number;
    stores: number[];
  }