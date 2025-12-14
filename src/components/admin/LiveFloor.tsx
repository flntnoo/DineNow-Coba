import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Table } from '../../types';
import { GripVertical } from 'lucide-react';

interface DraggableTableProps {
  table: Table;
  onMove: (tableId: string, x: number, y: number) => void;
  onStatusChange: (tableId: string, status: Table['status']) => void;
}

function DraggableTable({ table, onMove, onStatusChange }: DraggableTableProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'table',
    item: { id: table.id, x: table.x, y: table.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getTableColor = () => {
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

  const getTableStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${table.x}px`,
      top: `${table.y}px`,
      backgroundColor: getTableColor(),
      color: 'white',
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      transition: isDragging ? 'none' : 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column' as const,
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

  return (
    <div ref={drag} style={getTableStyle()} className="shadow-lg group">
      <GripVertical className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute top-1 transition-opacity" />
      <div className="font-semibold">T{table.number}</div>
      <div className="text-xs opacity-90">{table.seats} seats</div>
      <div className="text-xs capitalize mt-1">{table.status}</div>
      
      {/* Quick Status Change */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <select
          value={table.status}
          onChange={(e) => onStatusChange(table.id, e.target.value as Table['status'])}
          className="text-xs px-2 py-1 rounded bg-white text-gray-800 border border-gray-300"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
          <option value="cleaning">Cleaning</option>
        </select>
      </div>
    </div>
  );
}

interface FloorDropZoneProps {
  children: React.ReactNode;
  onDrop: (tableId: string, x: number, y: number) => void;
}

function FloorDropZone({ children, onDrop }: FloorDropZoneProps) {
  const [, drop] = useDrop({
    accept: 'table',
    drop: (item: { id: string; x: number; y: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = Math.round(item.x + delta.x);
        const newY = Math.round(item.y + delta.y);
        onDrop(item.id, newX, newY);
      }
    },
  });

  return (
    <div ref={drop} className="relative bg-white rounded-lg shadow-inner" style={{ height: '600px' }}>
      {children}
    </div>
  );
}

interface LiveFloorProps {
  tables: Table[];
  onUpdateTable: (tableId: string, updates: Partial<Table>) => void;
}

export function LiveFloor({ tables, onUpdateTable }: LiveFloorProps) {
  const handleMove = (tableId: string, x: number, y: number) => {
    onUpdateTable(tableId, { x, y });
  };

  const handleStatusChange = (tableId: string, status: Table['status']) => {
    onUpdateTable(tableId, { status });
  };

  const statusCounts = tables.reduce((acc, table) => {
    acc[table.status] = (acc[table.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="mb-6">
          <h3 className="mb-4">Live Floor Management</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="text-3xl text-green-600 mb-1">{statusCounts.available || 0}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="text-3xl text-blue-600 mb-1">{statusCounts.reserved || 0}</div>
              <div className="text-sm text-gray-600">Reserved</div>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div className="text-3xl text-gray-600 mb-1">{statusCounts.occupied || 0}</div>
              <div className="text-sm text-gray-600">Occupied</div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="text-3xl text-red-600 mb-1">{statusCounts.cleaning || 0}</div>
              <div className="text-sm text-gray-600">Needs Cleaning</div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-neutral-light)] rounded-xl p-8">
          <div className="mb-4 flex items-center justify-between">
            <h4>Restaurant Floor Plan</h4>
            <div className="text-sm text-gray-600">Drag tables to rearrange</div>
          </div>
          
          {/* Legend */}
          <div className="flex gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#10B981]" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3B82F6]" />
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#9CA3AF]" />
              <span className="text-sm">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#EF4444]" />
              <span className="text-sm">Needs Cleaning</span>
            </div>
          </div>

          <FloorDropZone onDrop={handleMove}>
            {tables.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                onMove={handleMove}
                onStatusChange={handleStatusChange}
              />
            ))}
          </FloorDropZone>
        </div>
      </div>
    </DndProvider>
  );
}
