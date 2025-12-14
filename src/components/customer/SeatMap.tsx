import { useState } from 'react';
import { Table } from '../../types';
import { Check } from 'lucide-react';

interface SeatMapProps {
  tables: Table[];
  selectedTable: string | null;
  onSelectTable: (tableId: string) => void;
  isCustomerView?: boolean;
}

export function SeatMap({ tables, selectedTable, onSelectTable, isCustomerView = false }: SeatMapProps) {
  const getTableColor = (table: Table) => {
    if (selectedTable === table.id) {
      return '#F59E0B'; // Orange for selected
    }
    
    if (isCustomerView) {
      // Customer view only shows available/occupied
      return table.status === 'available' ? '#10B981' : '#9CA3AF';
    }
    
    // Admin view shows all statuses
    switch (table.status) {
      case 'available':
        return '#10B981'; // Green
      case 'occupied':
        return '#9CA3AF'; // Grey
      case 'reserved':
        return '#3B82F6'; // Blue
      case 'cleaning':
        return '#EF4444'; // Red
      default:
        return '#9CA3AF';
    }
  };

  const getTableStyle = (table: Table) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${table.x}px`,
      top: `${table.y}px`,
      backgroundColor: getTableColor(table),
      color: 'white',
      cursor: table.status === 'available' || !isCustomerView ? 'pointer' : 'not-allowed',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
    };

    switch (table.shape) {
      case 'round':
        return {
          ...baseStyle,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
        };
      case 'square':
        return {
          ...baseStyle,
          width: '100px',
          height: '100px',
          borderRadius: '8px',
        };
      case 'rectangle':
        return {
          ...baseStyle,
          width: '140px',
          height: '80px',
          borderRadius: '8px',
        };
      default:
        return baseStyle;
    }
  };

  const handleTableClick = (table: Table) => {
    if (isCustomerView && table.status !== 'available') return;
    onSelectTable(table.id);
  };

  return (
    <div className="bg-[var(--color-neutral-light)] rounded-xl p-8 relative" style={{ minHeight: '500px' }}>
      {/* Legend */}
      <div className="flex gap-6 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#10B981]" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#9CA3AF]" />
          <span className="text-sm">Occupied</span>
        </div>
        {!isCustomerView && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3B82F6]" />
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#EF4444]" />
              <span className="text-sm">Needs Cleaning</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#F59E0B]" />
          <span className="text-sm">Selected</span>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="relative bg-white rounded-lg shadow-inner" style={{ height: '450px' }}>
        {tables.map((table) => (
          <div
            key={table.id}
            style={getTableStyle(table)}
            onClick={() => handleTableClick(table)}
            className="hover:scale-110 shadow-lg"
          >
            <div className="text-center">
              {selectedTable === table.id && (
                <Check className="w-5 h-5 mb-1 mx-auto" />
              )}
              <div className="font-semibold">T{table.number}</div>
              <div className="text-xs opacity-90">{table.seats} seats</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
