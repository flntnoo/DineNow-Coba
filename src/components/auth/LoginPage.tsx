import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ShieldCheck, Mail, Lock, ArrowRight, ChefHat } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'customer' | 'admin') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(activeTab);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary)] rounded-full mb-4 shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-dark)] mb-2">DineNow</h1>
          <p className="text-gray-500">Pengalaman bersantap terbaik Anda</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'customer'
                  ? 'text-[var(--color-primary)]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Pelanggan
              </div>
              {activeTab === 'customer' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'admin'
                  ? 'text-[var(--color-primary)]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Admin
              </div>
              {activeTab === 'admin' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                />
              )}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[var(--color-dark)] mb-1">
                    {activeTab === 'customer' ? 'Selamat Datang Kembali' : 'Admin Restoran'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeTab === 'customer'
                      ? 'Masuk untuk mengelola reservasi Anda'
                      : 'Masuk untuk mengakses dashboard'}
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                        placeholder={activeTab === 'customer' ? "budi@contoh.com" : "admin@restoran.com"}
                        defaultValue={activeTab === 'admin' ? "admin@dinenow.com" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Kata Sandi
                      </label>
                      <a href="#" className="text-xs text-[var(--color-primary)] hover:underline">
                        Lupa?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                        placeholder="••••••••"
                        defaultValue="password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Masuk
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Belum punya akun?{' '}
                    <a href="#" className="text-[var(--color-primary)] font-medium hover:underline">
                      Buat akun
                    </a>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
