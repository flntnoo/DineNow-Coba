import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

interface AnalyticsProps {
  dailyRevenue: Array<{ date: string; revenue: number }>;
  peakHours: Array<{ hour: string; bookings: number }>;
}

export function Analytics({ dailyRevenue, peakHours }: AnalyticsProps) {
  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.revenue, 0);
  const avgRevenue = totalRevenue / dailyRevenue.length;
  const totalBookings = peakHours.reduce((sum, hour) => sum + hour.bookings, 0);

  return (
    <div>
      <h3 className="mb-6">Dashboard Analitik</h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl mb-1">Rp {totalRevenue.toLocaleString('id-ID')}</div>
          <div className="text-sm opacity-90">Pendapatan Mingguan</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl mb-1">{totalBookings}</div>
          <div className="text-sm opacity-90">Total Reservasi</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl mb-1">Rp {avgRevenue.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</div>
          <div className="text-sm opacity-90">Rata-rata Pendapatan Harian</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl mb-1">89%</div>
          <div className="text-sm opacity-90">Tingkat Okupansi</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="mb-6">Pendapatan Harian</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}jt`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pendapatan']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#D2691E"
                strokeWidth={3}
                dot={{ fill: '#D2691E', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Hours Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="mb-6">Jam Sibuk</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}`, 'Reservasi']}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#DC143C"
                strokeWidth={3}
                dot={{ fill: '#DC143C', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
