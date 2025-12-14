import { Star, MapPin, DollarSign, Heart } from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export function RestaurantCard({ restaurant, onClick, isFavorite = false, onToggleFavorite }: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group relative"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onToggleFavorite?.(e);
             }}
             className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
           >
             <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
           </button>
           <div className="bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg h-8">
             <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
             <span className="text-sm font-medium">{restaurant.rating}</span>
           </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2">{restaurant.name}</h3>
        
        <div className="flex items-center gap-4 mb-3">
          <span className="px-3 py-1 bg-[var(--color-neutral-light)] text-[var(--color-dark)] rounded-full text-sm">
            {restaurant.cuisine}
          </span>
          <span className="text-[var(--color-primary)]">{restaurant.priceRange}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{restaurant.address}</span>
        </div>
      </div>
    </div>
  );
}
