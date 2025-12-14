import { useState } from 'react';
import { X, MapPin, Clock, Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Restaurant, SearchParams } from '../../types';
import { SeatMap } from './SeatMap';
import { CheckoutModal } from './CheckoutModal';

import { Reservation } from '../../types';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  searchParams: SearchParams;
  selectedTable: string | null;
  onSelectTable: (tableId: string | null) => void;
  onBook: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onReservationComplete?: (reservation: Reservation) => void;
}

export function RestaurantDetail({ 
  restaurant, 
  onBack, 
  searchParams, 
  selectedTable, 
  onSelectTable, 
  onBook,
  isFavorite = false,
  onToggleFavorite,
  onReservationComplete
}: RestaurantDetailProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleReserve = () => {
    if (selectedTable) {
      onBook();
      // Only show checkout if we are allowed to proceed (parent component handles login check)
      // This might need adjustment if parent handles the "logged in" check by redirecting.
      // If parent redirects, this component unmounts.
      // If parent doesn't redirect (is logged in), we should show checkout.
      // We'll let the parent pass a prop or we check a prop here?
      // Actually, better to let parent trigger the checkout modal or manage the "isBooking" state.
      // For now, let's assume if onBook returns/doesn't redirect, we can show checkout?
      // No, better to lift showCheckout state OR pass a "canBook" prop.
      // Let's modify the flow: onBook() is called. If user is logged in, parent does nothing special,
      // just lets us proceed?
      // Actually, if we redirect, we unmount.
      // So we can just set showCheckout(true). If parent redirects, we unmount anyway.
      setShowCheckout(true);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % restaurant.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + restaurant.gallery.length) % restaurant.gallery.length);
  };

  const selectedTableData = restaurant.tables.find((t) => t.id === selectedTable);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
            Tutup
          </button>
          <div className="flex items-center gap-4">
             <button 
                onClick={onToggleFavorite}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
             >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
             </button>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Photo Gallery */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 group">
          <img
            src={restaurant.gallery[currentImageIndex]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          
          {restaurant.gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {restaurant.gallery.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="mb-2">{restaurant.name}</h2>
              <span className="inline-block px-4 py-1 bg-[var(--color-neutral-light)] rounded-full">
                {restaurant.cuisine}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Alamat</div>
                  <div>{restaurant.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Jam Buka</div>
                  <div>{restaurant.hours}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2">Tentang</h4>
              <p className="text-gray-600">{restaurant.description}</p>
            </div>

            {/* Menu Highlights */}
            <div>
              <h4 className="mb-4">Menu Favorit</h4>
              <div className="space-y-3">
                {restaurant.menuHighlights.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-[var(--color-neutral-light)] rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-600 mb-1">{item.description}</div>
                      <div className="text-[var(--color-primary)]">Rp {item.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Seat Map & Reservation */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="mb-4">Pilih Meja Anda</h3>
              <SeatMap
                tables={restaurant.tables}
                selectedTable={selectedTable}
                onSelectTable={onSelectTable}
                isCustomerView={true}
              />
            </div>

            {/* Reservation CTA */}
            <div className="sticky bottom-0 bg-white border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600">Pilihan Anda</div>
                  <div>
                    {searchParams.date} pukul {searchParams.time} • {searchParams.guests} orang
                    {selectedTable && selectedTableData && (
                      <span className="text-[var(--color-primary)]"> • Meja {selectedTableData.number}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Deposit</div>
                  <div className="text-2xl text-[var(--color-primary)]">
                    Rp {(searchParams.guests * 150000).toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={handleReserve}
                disabled={!selectedTable}
                className={`w-full py-4 rounded-lg text-white transition-all ${
                  selectedTable
                    ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {selectedTable ? 'Lanjut ke Pembayaran' : 'Pilih Meja untuk Melanjutkan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        restaurant={restaurant}
        selectedTable={selectedTableData || null}
        date={searchParams.date}
        time={searchParams.time}
        guests={searchParams.guests}
        onSuccess={onReservationComplete}
      />
    </div>
  );
}
