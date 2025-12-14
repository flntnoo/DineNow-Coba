import { LayoutDashboard, Grid3x3, Calendar, UtensilsCrossed, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'floor', label: 'Denah Langsung', icon: Grid3x3 },
    { id: 'reservations', label: 'Reservasi', icon: Calendar },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[var(--color-dark)] text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-[var(--color-primary)]">DineNow</h2>
        <p className="text-sm text-white/60 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
}
