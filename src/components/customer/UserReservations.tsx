import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Loader, Utensils } from 'lucide-react';
import { Reservation, Restaurant } from '../../types';
import { ReservationDetailDialog } from './ReservationDetailDialog';
import { MenuSelectionDialog } from './MenuSelectionDialog';

interface UserReservationsProps {
  reservations: Reservation[];
  restaurants: Restaurant[];
  onBack: () => void;
}

export function UserReservations({ reservations, restaurants, onBack }: UserReservationsProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRestaurant = (id: string) => restaurants.find((r) => r.id === id);

  const handleViewDetail = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailOpen(true);
  };

  const handleOrderMenu = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsMenuOpen(true);
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Loader className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const translateStatus = (status: Reservation['status']) => {
     switch (status) {
      case 'confirmed':
        return 'Terkonfirmasi';
      case 'pending':
        return 'Menunggu Konfirmasi';
      case 'cancelled':
        return 'Dibatalkan';
      case 'completed':
        return 'Selesai';
      default:
        return status;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-[var(--color-primary)] mb-4 font-medium"
          >
            ← Kembali ke Beranda
          </button>
          <h1 className="text-3xl text-gray-900">Reservasi Saya</h1>
          <p className="text-gray-500 mt-2">Kelola pesanan dan reservasi restoran Anda</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {reservations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Belum ada reservasi</h3>
            <p className="text-gray-500 mb-6">Mulai jelajahi restoran dan buat reservasi pertama Anda.</p>
            <button 
              onClick={onBack}
              className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Cari Restoran
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => {
              const restaurant = getRestaurant(reservation.restaurantId);
              if (!restaurant) return null;

              return (
                <div 
                  key={reservation.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(reservation.status)}`}>
                        {getStatusIcon(reservation.status)}
                        {translateStatus(reservation.status)}
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                          <span className="text-[var(--color-primary)] font-bold">
                            Rp {reservation.deposit?.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="space-y-3 text-gray-600 mt-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(reservation.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{reservation.time} WIB</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{reservation.guests} Tamu</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="line-clamp-1">{restaurant.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t flex justify-end gap-3">
                        <button 
                          onClick={() => handleViewDetail(reservation)}
                          className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Lihat Detail
                        </button>
                        {reservation.status === 'confirmed' && (
                          <button 
                            onClick={() => handleOrderMenu(reservation)}
                            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Utensils className="w-4 h-4" />
                            Pesan Menu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedReservation && getRestaurant(selectedReservation.restaurantId) && (
        <>
          <ReservationDetailDialog
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            reservation={selectedReservation}
            restaurant={getRestaurant(selectedReservation.restaurantId)!}
          />
          <MenuSelectionDialog
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            reservationId={selectedReservation.id}
            restaurant={getRestaurant(selectedReservation.restaurantId)!}
          />
        </>
      )}
    </div>
  );
}