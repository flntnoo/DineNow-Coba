import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Restaurant } from "../../types";
import { CreditCard, Lock, Loader, Check, QrCode, Smartphone } from "lucide-react";
import { OrderSuccessDialog } from "./OrderSuccessDialog";

interface MenuPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
  orders: Record<string, number>;
  totalPrice: number;
  onPaymentSuccess: () => void;
}

export function MenuPaymentDialog({
  isOpen,
  onClose,
  restaurant,
  orders,
  totalPrice,
  onPaymentSuccess,
}: MenuPaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'review' | 'processing' | 'success'>('review');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qris'>('card');

  const handlePay = () => {
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setTimeout(() => {
        onPaymentSuccess();
        onClose(); // Close this modal to let parent show the success modal if needed
      }, 500);
    }, 2000);
  };

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setStep('review');
      setIsProcessing(false);
      setPaymentMethod('card');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Pembayaran Pesanan</DialogTitle>
          <DialogDescription>
            Selesaikan pembayaran untuk pesanan menu Anda
          </DialogDescription>
        </DialogHeader>

        {step === 'review' && (
          <div className="space-y-6 py-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-sm text-gray-700">Ringkasan Pesanan</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {Object.entries(orders).map(([itemId, qty]) => {
                  const item = restaurant.menuHighlights.find(m => m.id === itemId);
                  if (!item) return null;
                  return (
                    <div key={itemId} className="flex justify-between text-sm">
                      <span className="text-gray-600">{qty}x {item.name}</span>
                      <span className="font-medium">Rp {(item.price * qty).toLocaleString('id-ID')}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Pembayaran</span>
                <span className="font-bold text-lg text-[var(--color-primary)]">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`border rounded-lg p-3 flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-[var(--color-primary)] bg-orange-50 text-[var(--color-primary)]' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                   <CreditCard className="w-4 h-4" />
                   <span className="text-sm font-medium">Kartu Kredit/Debit</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('qris')}
                  className={`border rounded-lg p-3 flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'qris' 
                      ? 'border-[var(--color-primary)] bg-orange-50 text-[var(--color-primary)]' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                   <QrCode className="w-4 h-4" />
                   <span className="text-sm font-medium">QRIS / E-Wallet</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                 <div className="relative">
                    <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Nomor Kartu"
                      className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      defaultValue="4242 4242 4242 4242"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      defaultValue="12/28"
                    />
                    <input 
                      type="text" 
                      placeholder="CVC"
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      defaultValue="123"
                    />
                 </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-40 h-40 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Scan QRIS untuk membayar</p>
                  <p className="text-xs text-gray-500">Mendukung GoPay, OVO, Dana, ShopeePay, dll.</p>
                </div>
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm">Menunggu pembayaran...</span>
                </div>
              </div>
            )}

            <button
              onClick={handlePay}
              className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium flex items-center justify-center gap-2"
            >
               <Lock className="w-4 h-4" />
               {paymentMethod === 'card' ? `Bayar Rp ${totalPrice.toLocaleString('id-ID')}` : 'Saya Sudah Membayar'}
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
             <Loader className="w-10 h-10 text-[var(--color-primary)] animate-spin" />
             <p className="text-gray-600 font-medium">Memproses pembayaran Anda...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
             </div>
             <p className="text-green-600 font-bold text-lg">Pembayaran Berhasil!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}