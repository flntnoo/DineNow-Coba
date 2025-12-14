import { projectId, publicAnonKey } from './supabase/info';
import { Restaurant, Reservation } from '../types';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-f6b7100b`;

const headers = {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json',
};

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${BASE_URL}/restaurants`, { headers });
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return response.json();
}

export async function fetchReservations(): Promise<Reservation[]> {
  const response = await fetch(`${BASE_URL}/reservations`, { headers });
  if (!response.ok) throw new Error('Failed to fetch reservations');
  return response.json();
}

export async function createReservation(reservation: Reservation): Promise<Reservation> {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: 'POST',
    headers,
    body: JSON.stringify(reservation),
  });
  if (!response.ok) throw new Error('Failed to create reservation');
  const data = await response.json();
  return data.reservation;
}

export async function fetchFavorites(userId: string): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/favorites/${userId}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
}

export async function saveFavorites(userId: string, favorites: string[]): Promise<void> {
  const response = await fetch(`${BASE_URL}/favorites/${userId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(favorites),
  });
  if (!response.ok) throw new Error('Failed to save favorites');
}
