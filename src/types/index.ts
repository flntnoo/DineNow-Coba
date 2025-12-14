export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  image: string;
  address: string;
  hours: string;
  description: string;
  gallery: string[];
  menuHighlights: MenuItem[];
  tables: Table[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  x: number;
  y: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  shape: 'round' | 'square' | 'rectangle';
}

export interface Reservation {
  id: string;
  restaurantId: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  preOrders?: MenuItem[];
  deposit?: number;
}

export interface SearchParams {
  location: string;
  date: string;
  time: string;
  guests: number;
}
