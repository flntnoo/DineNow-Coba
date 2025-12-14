import { Globe, Lock, Trash2, Shield, LogOut } from 'lucide-react';
import { Button } from '../../ui/button';

export function AccountSettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Pengaturan Akun</h3>

      <div className="space-y-6">
        <div className="pb-6 border-b">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-500" />
            Keamanan
          </h4>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div>
                   <div className="text-sm font-medium">Kata Sandi</div>
                   <div className="text-xs text-gray-500">Terakhir diubah 3 bulan lalu</div>
                </div>
                <Button variant="outline" size="sm">Ubah</Button>
             </div>
             <div className="flex items-center justify-between">
                <div>
                   <div className="text-sm font-medium">Verifikasi 2 Langkah (2FA)</div>
                   <div className="text-xs text-gray-500">Nonaktif</div>
                </div>
                <Button variant="outline" size="sm">Aktifkan</Button>
             </div>
          </div>
        </div>

        <div className="pb-6 border-b">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            Bahasa & Wilayah
          </h4>
          <div className="flex items-center justify-between">
            <div>
               <div className="text-sm font-medium">Bahasa</div>
               <div className="text-xs text-gray-500">Bahasa Indonesia</div>
            </div>
            <select className="text-sm border rounded px-2 py-1 bg-white">
               <option>Bahasa Indonesia</option>
               <option>English</option>
            </select>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Zona Bahaya
          </h4>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
             <p className="text-sm text-gray-700 mb-4">
               Menghapus akun Anda bersifat permanen dan tidak dapat dibatalkan. Semua riwayat reservasi dan poin reward akan hilang.
             </p>
             <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
               <Trash2 className="w-4 h-4 mr-2" /> Hapus Akun Saya
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}