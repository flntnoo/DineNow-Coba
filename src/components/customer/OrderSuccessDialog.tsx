import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Check, ShoppingBag } from "lucide-react";

interface OrderSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderSuccessDialog({ isOpen, onClose }: OrderSuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white text-center flex flex-col items-center justify-center p-8">
        <DialogHeader>
           <DialogTitle className="sr-only">Pesanan Berhasil</DialogTitle>
        </DialogHeader>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Makanan Berhasil Dipesan!
        </h2>
        <DialogDescription className="text-gray-500 mb-8 text-center max-w-xs">
          Pesanan Anda telah kami terima dan akan disiapkan sesuai waktu reservasi Anda.
        </DialogDescription>
        <button
          onClick={onClose}
          className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-semibold"
        >
          Lihat Reservasi Saya
        </button>
      </DialogContent>
    </Dialog>
  );
}