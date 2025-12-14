import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, X } from 'lucide-react';
import { Button } from '../../ui/button';

interface ProfileInfoProps {
  user: any;
  onUpdateUser: (data: any) => void;
}

export function ProfileInfo({ user, onUpdateUser }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const [newPreference, setNewPreference] = useState('');
  const [showPrefInput, setShowPrefInput] = useState(false);

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
    setShowPrefInput(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
    setShowPrefInput(false);
  };

  const addPreference = () => {
    if (newPreference.trim()) {
      setFormData({
        ...formData,
        preferences: [...(formData.preferences || []), newPreference.trim()]
      });
      setNewPreference('');
      setShowPrefInput(false);
    }
  };

  const removePreference = (index: number) => {
    const newPrefs = [...(formData.preferences || [])];
    newPrefs.splice(index, 1);
    setFormData({ ...formData, preferences: newPrefs });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Informasi Pribadi</h3>
        {!isEditing ? (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-orange-50"
          >
            Edit Profil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleCancel} className="text-gray-500">
              <X className="w-4 h-4 mr-2" /> Batal
            </Button>
            <Button onClick={handleSave} className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]">
              <Save className="w-4 h-4 mr-2" /> Simpan
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
            {isEditing ? (
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-900 border border-transparent">
                <User className="w-5 h-5 text-gray-400" />
                {user.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Email</label>
            {isEditing ? (
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-900 border border-transparent">
                <Mail className="w-5 h-5 text-gray-400" />
                {user.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Nomor Telepon</label>
            {isEditing ? (
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-900 border border-transparent">
                <Phone className="w-5 h-5 text-gray-400" />
                {user.phone}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Lokasi</label>
            {isEditing ? (
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-900 border border-transparent">
                <MapPin className="w-5 h-5 text-gray-400" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t">
          <h4 className="font-semibold text-gray-900 mb-4">Preferensi Makan</h4>
          <div className="flex flex-wrap gap-2">
            {(isEditing ? (formData.preferences || []) : (user.preferences || [])).map((pref: string, i: number) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                isEditing ? 'bg-white border border-[var(--color-primary)] text-[var(--color-primary)]' : 'bg-orange-50 text-[var(--color-primary)]'
              }`}>
                {pref}
                {isEditing && (
                  <button onClick={() => removePreference(i)} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            
            {isEditing && (
              showPrefInput ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addPreference()}
                    autoFocus
                    className="px-3 py-1 border rounded-full text-sm outline-none focus:border-[var(--color-primary)] w-32"
                    placeholder="Contoh: Manis"
                  />
                  <Button size="sm" onClick={addPreference} className="h-7 px-2 bg-[var(--color-primary)] text-white">OK</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowPrefInput(false)} className="h-7 px-2"><X className="w-3 h-3" /></Button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowPrefInput(true)}
                  className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-400 rounded-full text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  + Tambah
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}