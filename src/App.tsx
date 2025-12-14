import { useState, useEffect } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/customer/Navbar';
import { Hero } from './components/customer/Hero';
import { RestaurantCard } from './components/customer/RestaurantCard';
import { RestaurantDetail } from './components/customer/RestaurantDetail';
import { UserReservations } from './components/customer/UserReservations';
import { Sidebar } from './components/admin/Sidebar';
import { LiveFloor } from './components/admin/LiveFloor';
import { ReservationList } from './components/admin/ReservationList';
import { Analytics } from './components/admin/Analytics';
import { analyticsData } from './data/mockData';
import { SearchParams, Restaurant, Table, Reservation } from './types';
import { Star, TrendingUp } from 'lucide-react';
import { fetchRestaurants, fetchReservations, createReservation, fetchFavorites, saveFavorites } from './utils/api';

import { UserProfile } from './components/customer/UserProfile';
import { UserFavorites } from './components/customer/UserFavorites';

type View = 'auth' | 'customer' | 'admin';
type CustomerView = 'home' | 'details' | 'reservations' | 'profile' | 'favorites';

const DEMO_USER_ID = 'user_123';

function App() {
  const [view, setView] = useState<View>('customer');
  const [customerView, setCustomerView] = useState<CustomerView>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Jakarta Pusat',
    date: '2025-12-15',
    time: '19:00',
    guests: 2,
  });
  const [adminTab, setAdminTab] = useState('dashboard');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const initData = async () => {
      try {
        const [restaurantsData, reservationsData] = await Promise.all([
          fetchRestaurants(),
          fetchReservations()
        ]);
        setRestaurants(restaurantsData);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // Fetch favorites when authenticated
  useEffect(() => {
    if (isAuthenticated && userId) {
      const loadFavorites = async () => {
        try {
          const favs = await fetchFavorites(userId);
          setFavorites(favs);
        } catch (error) {
          console.error("Failed to fetch favorites", error);
        }
      };
      loadFavorites();
    }
  }, [isAuthenticated, userId]);

  const toggleFavorite = async (restaurantId: string) => {
    // Optimistic update
    const newFavorites = favorites.includes(restaurantId) 
        ? favorites.filter(id => id !== restaurantId) 
        : [...favorites, restaurantId];
    
    setFavorites(newFavorites);

    if (isAuthenticated && userId) {
      try {
        await saveFavorites(userId, newFavorites);
      } catch (error) {
        console.error("Failed to save favorites", error);
        // Revert on error (optional, skipping for simplicity)
      }
    }
  };

  const displayedRestaurants = restaurants.filter(restaurant => {
    // Filter by location (case insensitive)
    const locationMatch = restaurant.address.toLowerCase().includes(searchParams.location.toLowerCase());
    
    // Filter by capacity: check if any table can accommodate the guests
    // OR if the restaurant generally accepts that many guests (assuming tables data is complete)
    const capacityMatch = restaurant.tables.some(table => table.seats >= searchParams.guests);

    return locationMatch && capacityMatch;
  });

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setSelectedRestaurant(null);
    setCustomerView('home');
  };

  const handleUpdateTable = (restaurantId: string, tableId: string, updates: Partial<Table>) => {
    setRestaurants((prev) =>
      prev.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return {
            ...restaurant,
            tables: restaurant.tables.map((table) =>
              table.id === tableId ? { ...table, ...updates } : table
            ),
          };
        }
        return restaurant;
      })
    );
  };

  const handleUpdateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

  const handleLogin = (role: 'customer' | 'admin') => {
    setIsAuthenticated(true);
    setUserId(DEMO_USER_ID); // Set demo user
    if (role === 'admin') {
      setView('admin');
    } else {
      setView('customer');
      setCustomerView('home');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setFavorites([]); // Clear favorites on logout
    setView('customer'); // Redirect to landing page on logout
    setCustomerView('home');
    setSelectedRestaurant(null);
    setSelectedTable(null);
  };

  const handleBookTable = () => {
    if (!isAuthenticated) {
      setView('auth');
    } else {
      // Logic handled in RestaurantDetail to show CheckoutModal
      // We don't need to do anything here except potentially update state if needed
      // But the alert was blocking the flow, so removing it.
    }
  };

  const handleReservationsClick = () => {
    if (!isAuthenticated) {
      setView('auth');
    } else {
      setCustomerView('reservations');
      setSelectedRestaurant(null);
    }
  };

  const handleProfileClick = () => {
    setCustomerView('profile');
    setSelectedRestaurant(null);
  };

  const handleFavoritesClick = () => {
    setCustomerView('favorites');
    setSelectedRestaurant(null);
  };

  const handleAddReservation = async (reservation: Reservation) => {
    try {
      const newReservation = await createReservation(reservation);
      setReservations(prev => [newReservation, ...prev]);
    } catch (error) {
      console.error("Failed to create reservation", error);
      // Handle error (show toast etc)
    }
  };

  // Auth View
  if (view === 'auth') {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Customer View (Landing & Details)
  if (view === 'customer') {
    if (customerView === 'profile') {
      return (
        <>
          <Navbar 
            isLoggedIn={isAuthenticated}
            onLogout={handleLogout} 
            onLogin={() => setView('auth')}
            onReservationsClick={handleReservationsClick}
            onFavoritesClick={handleFavoritesClick}
            onProfileClick={handleProfileClick}
          />
          <UserProfile onBack={() => setCustomerView('home')} />
        </>
      );
    }

    if (customerView === 'favorites') {
      return (
        <>
          <Navbar 
            isLoggedIn={isAuthenticated}
            onLogout={handleLogout} 
            onLogin={() => setView('auth')}
            onReservationsClick={handleReservationsClick}
            onFavoritesClick={handleFavoritesClick}
            onProfileClick={handleProfileClick}
          />
          <UserFavorites 
            restaurants={restaurants}
            favoriteIds={favorites}
            onBack={() => setCustomerView('home')}
            onRestaurantClick={(restaurant) => {
              setSelectedRestaurant(restaurant);
              setCustomerView('details');
            }}
            onToggleFavorite={toggleFavorite}
          />
        </>
      );
    }

    if (customerView === 'reservations') {
      return (
        <>
          <Navbar 
            isLoggedIn={isAuthenticated}
            onLogout={handleLogout} 
            onLogin={() => setView('auth')}
            onReservationsClick={handleReservationsClick}
            onFavoritesClick={handleFavoritesClick}
            onProfileClick={handleProfileClick}
          />
          <UserReservations 
            reservations={reservations} 
            restaurants={restaurants}
            onBack={() => setCustomerView('home')} 
          />
        </>
      );
    }

    if (selectedRestaurant) {
      return (
        <>
          <Navbar 
            isLoggedIn={isAuthenticated}
            onLogout={handleLogout} 
            onLogin={() => setView('auth')}
            onReservationsClick={handleReservationsClick}
            onFavoritesClick={handleFavoritesClick}
            onProfileClick={handleProfileClick}
          />
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onBack={() => {
              setSelectedRestaurant(null);
              setSelectedTable(null);
              setCustomerView('home');
            }}
            searchParams={searchParams}
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
            onBook={handleBookTable}
            isFavorite={favorites.includes(selectedRestaurant.id)}
            onToggleFavorite={() => toggleFavorite(selectedRestaurant.id)}
            onReservationComplete={handleAddReservation}
          />
        </>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <Navbar 
          isLoggedIn={isAuthenticated}
          onLogout={handleLogout} 
          onLogin={() => setView('auth')}
          onReservationsClick={handleReservationsClick}
          onFavoritesClick={handleFavoritesClick}
          onProfileClick={handleProfileClick}
        />
        
        <Hero onSearch={handleSearch} />

        {/* Trending Restaurants */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-[var(--color-primary)]" />
            <h2>Restoran Populer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedRestaurants.length > 0 ? (
              displayedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setCustomerView('details');
                  }}
                  isFavorite={favorites.includes(restaurant.id)}
                  onToggleFavorite={() => toggleFavorite(restaurant.id)}
                />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Tidak ada restoran yang ditemukan sesuai kriteria pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>

        {/* Why DineNow Section */}
        <div className="bg-[var(--color-neutral-light)] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center mb-12">Mengapa Memilih DineNow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h4 className="mb-3">Pilih Meja Pilihan Anda</h4>
                <p className="text-gray-600">
                  Pilih meja favorit Anda dengan denah interaktif kami untuk pengalaman bersantap yang sempurna.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h4 className="mb-3">Pesan Makanan Favorit</h4>
                <p className="text-gray-600">
                  Lihat menu unggulan dan pesan hidangan favorit Anda sebelumnya untuk pengalaman bersantap yang lancar.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 text-center shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h4 className="mb-3">Konfirmasi Instan</h4>
                <p className="text-gray-600">
                  Dapatkan konfirmasi segera dan amankan meja Anda dengan pembayaran deposit yang mudah.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[var(--color-dark)] text-white py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-[var(--color-primary)] mb-4">DineNow</h3>
            <p className="text-white/70 mb-6">Pintu gerbang Anda menuju pengalaman bersantap yang luar biasa</p>
            <div className="flex justify-center gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Tentang Kami</a>
              <a href="#" className="hover:text-white transition-colors">Bantuan</a>
              <a href="#" className="hover:text-white transition-colors">Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Admin View
  const currentRestaurant = restaurants[0]; // For demo, using first restaurant

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab={adminTab}
        onTabChange={setAdminTab}
        onLogout={handleLogout}
      />

      <div className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {adminTab === 'dashboard' && (
            <Analytics
              dailyRevenue={analyticsData.dailyRevenue}
              peakHours={analyticsData.peakHours}
            />
          )}

          {adminTab === 'floor' && (
            <LiveFloor
              tables={currentRestaurant.tables}
              onUpdateTable={(tableId, updates) =>
                handleUpdateTable(currentRestaurant.id, tableId, updates)
              }
            />
          )}

          {adminTab === 'reservations' && (
            <ReservationList
              reservations={reservations}
              onUpdateStatus={handleUpdateReservationStatus}
            />
          )}

          {adminTab === 'menu' && (
            <div>
              <h3 className="mb-6">Menu Management</h3>
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-600">Menu management interface would go here</p>
              </div>
            </div>
          )}

          {adminTab === 'settings' && (
            <div>
              <h3 className="mb-6">Settings</h3>
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">Restaurant Name</label>
                    <input
                      type="text"
                      defaultValue={currentRestaurant.name}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Address</label>
                    <input
                      type="text"
                      defaultValue={currentRestaurant.address}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Operating Hours</label>
                    <input
                      type="text"
                      defaultValue={currentRestaurant.hours}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                  <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
