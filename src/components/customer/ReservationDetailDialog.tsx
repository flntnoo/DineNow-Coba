import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Reservation, Restaurant } from "../../types";
import { Calendar, Clock, MapPin, Users, Receipt, Phone, Mail } from "lucide-react";

interface ReservationDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
  restaurant: Restaurant;
}

export function ReservationDetailDialog({
  isOpen,
  onClose,
  reservation,
  restaurant,
}: ReservationDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Detail Reservasi</DialogTitle>
          <DialogDescription>
            ID Reservasi: #{reservation.id.toUpperCase()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
             <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">TANGGAL</label>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{new Date(reservation.date).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">WAKTU</label>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{reservation.time} WIB</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">TAMU</label>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{reservation.guests} Orang</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">MEJA</label>
              <div className="flex items-center gap-2 text-sm">
                <Receipt className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{reservation.tableId ? `Meja ${reservation.tableId.replace('t', '')}` : 'Belum ditentukan'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
             <label className="text-xs text-gray-500 font-medium">LOKASI</label>
             <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                <span>{restaurant.address}</span>
             </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h4 className="font-medium text-sm">Informasi Kontak</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
               <div className="flex items-center gap-2">
                 <Users className="w-4 h-4" />
                 <span>{reservation.customerName}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Mail className="w-4 h-4" />
                 <span>{reservation.email}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Phone className="w-4 h-4" />
                 <span>{reservation.phone}</span>
               </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium text-sm">Deposit Dibayar</span>
            <span className="font-bold text-[var(--color-primary)]">
              Rp {reservation.deposit?.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}