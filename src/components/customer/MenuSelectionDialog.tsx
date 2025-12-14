import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Restaurant } from "../../types";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { MenuPaymentDialog } from "./MenuPaymentDialog";
import { OrderSuccessDialog } from "./OrderSuccessDialog";

interface MenuSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
  reservationId: string;
}

export function MenuSelectionDialog({
  isOpen,
  onClose,
  restaurant,
  reservationId,
}: MenuSelectionDialogProps) {
  const [orders, setOrders] = useState<Record<string, number>>({});
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setOrders(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const totalItems = Object.values(orders).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(orders).reduce((sum, [itemId, qty]) => {
    const item = restaurant.menuHighlights.find(m => m.id === itemId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
    setOrders({});
    // onClose(); // Don't close immediately, let user see success dialog
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showPayment && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg bg-white max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Pesan Menu</DialogTitle>
            <DialogDescription>
              Pilih hidangan untuk disajikan saat Anda tiba di {restaurant.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
            {restaurant.menuHighlights.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 border rounded-lg hover:border-[var(--color-primary)] transition-colors bg-white">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover bg-gray-100"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-semibold text-[var(--color-primary)]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all disabled:opacity-50"
                        disabled={!orders[item.id]}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-4 text-center font-medium">{orders[item.id] || 0}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="border-t pt-4">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Pesanan</span>
                <span className="font-bold text-lg text-[var(--color-primary)]">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={handleProceedToPayment}
                disabled={totalItems === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <ShoppingBag className="w-4 h-4" />
                Pesan Sekarang
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MenuPaymentDialog 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        restaurant={restaurant}
        orders={orders}
        totalPrice={totalPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <OrderSuccessDialog 
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
      />
    </>
  );
}