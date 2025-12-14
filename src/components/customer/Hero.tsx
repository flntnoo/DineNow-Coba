import { Search, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { SearchParams } from '../../types';

interface HeroProps {
  onSearch: (params: SearchParams) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch({
      location: formData.get('location') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      guests: parseInt(formData.get('guests') as string),
    });
  };

  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1761095596755-99ba58997720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzY1NTgzMTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Fine dining"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-white mb-4">Temukan Pengalaman Bersantap Anda</h1>
        <p className="text-white/90 text-xl mb-12">
          Reservasi meja terbaik di restoran-restoran pilihan
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                name="location"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none transition-colors appearance-none bg-white"
                defaultValue="Jakarta Pusat"
              >
                <option value="Jakarta Pusat">Jakarta Pusat</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Jakarta Barat">Jakarta Barat</option>
                <option value="Jakarta Timur">Jakarta Timur</option>
                <option value="Jakarta Utara">Jakarta Utara</option>
                <option value="Bogor">Bogor</option>
                <option value="Depok">Depok</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Tangerang Selatan">Tangerang Selatan</option>
                <option value="Bekasi">Bekasi</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="date"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                defaultValue="2025-12-15"
              />
            </div>

            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="time"
                name="time"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                defaultValue="19:00"
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                name="guests"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none transition-colors appearance-none bg-white"
                defaultValue="2"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang</option>
                <option value="5">5 Orang</option>
                <option value="6">6 Orang</option>
                <option value="7">7 Orang</option>
                <option value="8">8+ Orang</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Search className="w-5 h-5" />
            Cari Meja Tersedia
          </button>
        </form>
      </div>
    </div>
  );
}
