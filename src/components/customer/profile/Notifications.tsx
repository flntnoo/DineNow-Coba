import { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { Switch } from '../../ui/switch';

export function Notifications() {
  const [preferences, setPreferences] = useState({
    emailReservations: true,
    emailPromos: false,
    pushStatus: true,
    smsReminders: true,
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Pengaturan Notifikasi</h3>

      <div className="space-y-6">
        <div className="flex items-start justify-between pb-6 border-b">
          <div className="flex gap-4">
            <div className="p-2 bg-orange-50 rounded-lg h-fit">
              <Mail className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Email Reservasi</h4>
              <p className="text-sm text-gray-500">Terima konfirmasi dan update status reservasi via email.</p>
            </div>
          </div>
          <Switch 
            checked={preferences.emailReservations} 
            onCheckedChange={() => toggle('emailReservations')}
          />
        </div>

        <div className="flex items-start justify-between pb-6 border-b">
          <div className="flex gap-4">
            <div className="p-2 bg-blue-50 rounded-lg h-fit">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-500">Dapatkan notifikasi real-time di perangkat Anda.</p>
            </div>
          </div>
          <Switch 
            checked={preferences.pushStatus} 
            onCheckedChange={() => toggle('pushStatus')}
          />
        </div>

        <div className="flex items-start justify-between pb-6 border-b">
          <div className="flex gap-4">
            <div className="p-2 bg-green-50 rounded-lg h-fit">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">SMS Pengingat</h4>
              <p className="text-sm text-gray-500">Kami akan mengirim SMS 1 jam sebelum waktu reservasi.</p>
            </div>
          </div>
          <Switch 
            checked={preferences.smsReminders} 
            onCheckedChange={() => toggle('smsReminders')}
          />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="p-2 bg-purple-50 rounded-lg h-fit">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Promo & Penawaran</h4>
              <p className="text-sm text-gray-500">Jadilah yang pertama tahu tentang menu baru dan diskon spesial.</p>
            </div>
          </div>
          <Switch 
            checked={preferences.emailPromos} 
            onCheckedChange={() => toggle('emailPromos')}
          />
        </div>
      </div>
    </div>
  );
}