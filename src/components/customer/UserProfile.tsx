import { User, CreditCard, Bell, Settings, Edit, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ProfileInfo } from './profile/ProfileInfo';
import { PaymentMethods } from './profile/PaymentMethods';
import { Notifications } from './profile/Notifications';
import { AccountSettings } from './profile/AccountSettings';

interface UserProfileProps {
  onBack: () => void;
}

type ProfileTab = 'info' | 'payment' | 'notifications' | 'settings';

export function UserProfile({ onBack }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('info');
  
  // Lifted state for user data so updates reflect immediately
  const [user, setUser] = useState({
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta Selatan, DKI Jakarta",
    memberSince: "Januari 2024",
    preferences: ['Halal', 'Vegetarian Friendly', 'Pedas', 'Outdoor Seating', 'Live Music'],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmF0YXIlMjBtYW58ZW58MXx8fHwxNzY1NjMwMDAwfDA&ixlib=rb-4.1.0&q=80&w=400",
    stats: {
      reservations: 12,
      reviews: 8,
      favorites: 5
    }
  });

  const handleUpdateUser = (newData: any) => {
    setUser({ ...user, ...newData });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <ProfileInfo user={user} onUpdateUser={handleUpdateUser} />;
      case 'payment':
        return <PaymentMethods />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <ProfileInfo user={user} onUpdateUser={handleUpdateUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-transparent hover:text-[var(--color-primary)] p-0"
        >
          ← Kembali ke Beranda
        </Button>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Info */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="relative inline-block mb-4 group cursor-pointer">
                <div className="relative overflow-hidden rounded-full border-4 border-orange-50 w-32 h-32 mx-auto">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                    </div>
                </div>
                <button 
                    onClick={() => setActiveTab('info')}
                    className="absolute bottom-0 right-0 bg-[var(--color-primary)] text-white p-2 rounded-full hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-4">Member sejak {user.memberSince}</p>
              
              <div className="flex justify-center gap-4 border-t pt-4">
                <div className="text-center">
                  <div className="font-bold text-gray-900">{user.stats.reservations}</div>
                  <div className="text-xs text-gray-500">Reservasi</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{user.stats.reviews}</div>
                  <div className="text-xs text-gray-500">Ulasan</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{user.stats.favorites}</div>
                  <div className="text-xs text-gray-500">Favorit</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Menu Profil</h3>
              </div>
              <div className="divide-y">
                <button 
                  onClick={() => setActiveTab('info')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                    activeTab === 'info' 
                      ? 'text-[var(--color-primary)] bg-orange-50 border-l-4 border-l-[var(--color-primary)]' 
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Informasi Pribadi</span>
                </button>
                <button 
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                    activeTab === 'payment' 
                      ? 'text-[var(--color-primary)] bg-orange-50 border-l-4 border-l-[var(--color-primary)]' 
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Metode Pembayaran</span>
                </button>
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                    activeTab === 'notifications' 
                      ? 'text-[var(--color-primary)] bg-orange-50 border-l-4 border-l-[var(--color-primary)]' 
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifikasi</span>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                    activeTab === 'settings' 
                      ? 'text-[var(--color-primary)] bg-orange-50 border-l-4 border-l-[var(--color-primary)]' 
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Pengaturan Akun</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}