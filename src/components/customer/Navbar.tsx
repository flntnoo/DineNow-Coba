import { UtensilsCrossed, LogOut, User } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: () => void;
  onReservationsClick: () => void;
  onFavoritesClick: () => void;
  onProfileClick: () => void;
}

export function Navbar({ isLoggedIn, onLogout, onLogin, onReservationsClick, onFavoritesClick, onProfileClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-8 h-8 text-[var(--color-primary)]" />
          <h2 className="text-[var(--color-primary)] cursor-pointer" onClick={() => window.location.reload()}>DineNow</h2>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onReservationsClick}
            className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
          >
            Reservasi
          </button>
          <button 
            onClick={onFavoritesClick}
            className="text-gray-600 hover:text-[var(--color-primary)] transition-colors"
          >
            Favorit
          </button>
          {isLoggedIn ? (
            <>
              <button 
                onClick={onProfileClick}
                className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              Masuk
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
