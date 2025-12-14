import { CreditCard, Plus, Trash2, Smartphone, Check, X, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { useState } from 'react';

export function PaymentMethods() {
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [walletPhone, setWalletPhone] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectWallet = () => {
    if (!walletPhone) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsWalletConnected(true);
      setIsConnectingWallet(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleDisconnectWallet = () => {
    if (confirm('Apakah Anda yakin ingin memutuskan sambungan E-Wallet?')) {
      setIsWalletConnected(false);
      setWalletPhone('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Metode Pembayaran</h3>
        <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]">
          <Plus className="w-4 h-4 mr-2" /> Tambah Kartu
        </Button>
      </div>

      <div className="space-y-4">
        {/* Mastercard (Now Main) */}
        <div className="border rounded-xl p-4 flex items-center justify-between bg-orange-50 border-[var(--color-primary)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold italic">
              MC
            </div>
            <div>
              <div className="font-semibold text-gray-900">Mastercard ending in 8899</div>
              <div className="text-sm text-gray-500">Kadaluarsa 09/26</div>
              <span className="inline-block mt-1 text-xs font-medium text-[var(--color-primary)] bg-white px-2 py-0.5 rounded border border-orange-200">
                Utama
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* E-Wallet Section */}
        <div className={`border rounded-xl p-4 transition-all ${isWalletConnected ? 'bg-green-50 border-green-200' : 'hover:border-gray-300'}`}>
           <div className="flex items-start justify-between">
             <div className="flex items-center gap-4">
               <div className={`w-12 h-8 border rounded flex items-center justify-center ${isWalletConnected ? 'bg-white border-green-200 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Smartphone className="w-5 h-5" />
               </div>
               <div>
                 <div className="font-semibold text-gray-900 flex items-center gap-2">
                   E-Wallet (GoPay, OVO, dll)
                   {isWalletConnected && <Check className="w-4 h-4 text-green-600" />}
                 </div>
                 <div className="text-sm text-gray-500">
                   {isWalletConnected ? `Terhubung: ${walletPhone}` : 'Hubungkan nomor ponsel untuk pembayaran instan'}
                 </div>
               </div>
             </div>
             
             {!isConnectingWallet && !isWalletConnected && (
               <Button variant="ghost" className="text-sm text-[var(--color-primary)]" onClick={() => setIsConnectingWallet(true)}>
                 Hubungkan
               </Button>
             )}

             {isWalletConnected && (
               <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleDisconnectWallet}>
                 Putuskan
               </Button>
             )}
           </div>

           {/* Connection Form */}
           {isConnectingWallet && (
             <div className="mt-4 pt-4 border-t animate-in fade-in slide-in-from-top-2">
               <div className="flex items-end gap-3">
                 <div className="flex-1 space-y-2">
                   <label className="text-sm font-medium text-gray-700">Nomor Ponsel E-Wallet</label>
                   <input 
                      type="tel" 
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      autoFocus
                   />
                 </div>
                 <Button 
                    onClick={handleConnectWallet}
                    disabled={!walletPhone || isLoading}
                    className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                 >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verifikasi'}
                 </Button>
                 <Button 
                    variant="ghost" 
                    onClick={() => setIsConnectingWallet(false)}
                    className="text-gray-500"
                 >
                    Batal
                 </Button>
               </div>
               <p className="text-xs text-gray-500 mt-2">
                 Kami akan mengirimkan kode OTP ke nomor ini untuk verifikasi.
               </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}