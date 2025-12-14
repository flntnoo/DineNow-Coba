import { Calendar, Clock, Users, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Reservation } from '../../types';

interface ReservationListProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: Reservation['status']) => void;
}

export function ReservationList({ reservations, onUpdateStatus }: ReservationListProps) {
  const getStatusBadge = (status: Reservation['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      seated: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const icons = {
      pending: AlertCircle,
      confirmed: CheckCircle,
      seated: Users,
      completed: CheckCircle,
      cancelled: XCircle,
    };

    const Icon = icons[status];

    const statusText = {
        pending: 'Menunggu',
        confirmed: 'Terkonfirmasi',
        seated: 'Duduk',
        completed: 'Selesai',
        cancelled: 'Dibatalkan'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${styles[status]}`}>
        <Icon className="w-4 h-4" />
        {statusText[status]}
      </span>
    );
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    return new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime();
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3>Daftar Reservasi</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors">
            Hari Ini
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Minggu Ini
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Pelanggan</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Tanggal & Waktu</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Jumlah Tamu</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Meja</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Kontak</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{reservation.customerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(reservation.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {reservation.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{reservation.guests}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm">
                      Meja {reservation.tableId.replace('t', '')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {reservation.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {reservation.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(reservation.status)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={reservation.status}
                      onChange={(e) => onUpdateStatus(reservation.id, e.target.value as Reservation['status'])}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    >
                      <option value="pending">Menunggu</option>
                      <option value="confirmed">Konfirmasi</option>
                      <option value="seated">Duduk</option>
                      <option value="completed">Selesai</option>
                      <option value="cancelled">Batal</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sortedReservations.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Tidak ada reservasi ditemukan</p>
        </div>
      )}
    </div>
  );
}
