import { Button } from '../ui/button';
import { RestaurantCard } from './RestaurantCard';
import { Restaurant } from '../../types';
import { Heart } from 'lucide-react';

interface UserFavoritesProps {
  restaurants: Restaurant[];
  favoriteIds: string[];
  onBack: () => void;
  onRestaurantClick: (restaurant: Restaurant) => void;
  onToggleFavorite: (id: string) => void;
}

export function UserFavorites({ restaurants, favoriteIds, onBack, onRestaurantClick, onToggleFavorite }: UserFavoritesProps) {
  // Filter restaurants based on favoriteIds
  const favoriteRestaurants = restaurants.filter(r => favoriteIds.includes(r.id));

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-transparent hover:text-[var(--color-primary)] p-0"
          >
            ← Kembali ke Beranda
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            Restoran Favorit Saya
          </h1>
          <div className="w-[100px]"></div> {/* Spacer for centering if needed, or just layout balance */}
        </div>

        {favoriteRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => onRestaurantClick(restaurant)}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(restaurant.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-gray-400" />
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada favorit</h3>
             <p className="text-gray-500 max-w-md">
               Simpan restoran yang Anda sukai agar mudah ditemukan kembali nanti.
             </p>
             <Button 
               onClick={onBack}
               className="mt-6 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
             >
               Jelajahi Restoran
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}