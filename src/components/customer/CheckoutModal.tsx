import { X, Calendar, Clock, Users, CreditCard, Check, QrCode, Smartphone } from 'lucide-react';
import { Restaurant, MenuItem, Table, Reservation } from '../../types';
import { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
  selectedTable: Table | null;
  date: string;
  time: string;
  guests: number;
  onSuccess?: (reservation: Reservation) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  restaurant,
  selectedTable,
  date,
  time,
  guests,
  onSuccess,
}: CheckoutModalProps) {
  const [selectedPreOrders, setSelectedPreOrders] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qris'>('card');
  
  // Customer info state
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen || !selectedTable) return null;

  const depositAmount = guests * 150000; // Rp 150.000 per person
  const preOrderTotal = selectedPreOrders.reduce((sum, itemId) => {
    const item = restaurant.menuHighlights.find((m) => m.id === itemId);
    return sum + (item?.price || 0);
  }, 0);
  const totalAmount = depositAmount + preOrderTotal;

  const togglePreOrder = (itemId: string) => {
    setSelectedPreOrders((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    
    // Create new reservation object
    const newReservation: Reservation = {
      id: `r${Date.now()}`,
      restaurantId: restaurant.id,
      customerName: customerName || 'Pengguna DineNow', // Fallback if empty
      email: email || 'user@example.com',
      phone: phone || '081234567890',
      date: date,
      time: time,
      guests: guests,
      tableId: selectedTable.id,
      status: 'confirmed',
      deposit: totalAmount,
    };

    setTimeout(() => {
      setIsConfirmed(false);
      onSuccess?.(newReservation);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h3>Selesaikan Reservasi Anda</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Reservation Summary */}
          <div className="bg-[var(--color-neutral-light)] rounded-xl p-5">
            <h4 className="mb-4">Detail Reservasi</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tanggal</div>
                  <div>{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Waktu</div>
                  <div>{time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Jumlah Tamu</div>
                  <div>{guests} Orang</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white">
                  T{selectedTable.number}
                </div>
                <div>
                  <div className="text-sm text-gray-600">Meja</div>
                  <div>Meja {selectedTable.number} ({selectedTable.seats} kursi)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-order Items */}
          <div>
            <h4 className="mb-4">Tambah Pesanan Awal (Opsional)</h4>
            <div className="grid grid-cols-1 gap-3">
              {restaurant.menuHighlights.map((item) => (
                <div
                  key={item.id}
                  onClick={() => togglePreOrder(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPreOrders.includes(item.id)
                      ? 'border-[var(--color-primary)] bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
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
                  {selectedPreOrders.includes(item.id) && (
                    <div className="w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Ringkasan Pembayaran
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Deposit Meja</span>
                <span>Rp {depositAmount.toLocaleString()}</span>
              </div>
              {preOrderTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Pesanan Awal</span>
                  <span>Rp {preOrderTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span>Total Biaya</span>
                  <span className="text-2xl text-[var(--color-primary)]">Rp {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-3">
            <h4>Informasi Anda</h4>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Nomor Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>

          {/* Payment Method Selection */}
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

          {/* Payment Details */}
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

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={isConfirmed}
            className={`w-full py-4 rounded-lg text-white transition-all ${
              isConfirmed
                ? 'bg-green-500'
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
            }`}
          >
            {isConfirmed ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Reservasi Terkonfirmasi!
              </span>
            ) : (
              paymentMethod === 'card' 
                ? `Konfirmasi & Bayar Rp ${totalAmount.toLocaleString()}`
                : 'Saya Sudah Membayar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
