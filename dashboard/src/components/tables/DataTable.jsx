import React from 'react';
import { useTableResize } from '../../hooks/useTableResize';
import { useTableSort } from '../../hooks/useTableSort';
import SortableHeader from './SortableHeader';

export default function DataTable({ 
  data = [], 
  columns = [], 
  orderedColumns = [], 
  visibleCols = {}, 
  onItemClick,
  rowClassName,
  emptyMessage = "No se encontraron registros."
}) {
  // Compute initial widths from columns definition
  const initialWidths = {};
  columns.forEach(col => {
    if (col.width) initialWidths[col.id] = col.width;
  });
  const { widths, startResize } = useTableResize(initialWidths);

  const { sortedData, sortConfig, requestSort } = useTableSort(data);

  // Use orderedColumns if provided (from drag & drop), else fallback to base columns
  const baseOrder = orderedColumns.length > 0 ? orderedColumns : columns;
  
  // Filter active columns
  const activeColumns = baseOrder
    .map(oc => columns.find(c => c.id === oc.id))
    .filter(c => c && visibleCols[c.id] !== false);

  const totalFixedWidth = activeColumns.reduce((acc, col) => acc + (widths[col.id] || 0), 0);

  const thStyle = (width, extra = {}) => ({
    ...(width ? { width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` } : {}),
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    padding: '12px 16px', position: 'relative', userSelect: 'none',
    ...extra
  });

  const cellStyle = (width, extra = {}) => ({
    ...(width ? { width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` } : {}),
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    padding: '16px',
    ...extra
  });

  const Resizer = ({ colKey }) => (
    <div 
      onMouseDown={(e) => startResize(e, colKey)}
      className="group"
      style={{ position: 'absolute', right: -4, top: 0, bottom: 0, width: '8px', cursor: 'col-resize', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="w-[2px] h-4 bg-pizarra/20 group-hover:bg-primario transition-colors rounded-full" />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-borde animate-fade-in-up">
      <div className="overflow-x-auto">
        <table className="text-left border-collapse" style={{ tableLayout: 'fixed', minWidth: '100%', width: totalFixedWidth > 0 ? `${totalFixedWidth}px` : '100%' }}>
          <thead>
            <tr className="bg-superficie-sec text-pizarra text-sm font-semibold uppercase tracking-wider border-b border-borde">
              {activeColumns.map((col, idx) => {
                const isLast = idx === activeColumns.length - 1;
                return (
                  <th key={col.id} scope="col" className={`border-borde ${!isLast ? 'border-r' : ''} ${col.headerClassName || ''}`} style={thStyle(widths[col.id], col.headerStyle)}>
                    {col.sortKey ? (
                      <SortableHeader label={col.label} sortKey={col.sortKey} customSort={col.customSort} sortConfig={sortConfig} requestSort={requestSort} />
                    ) : (
                      <span className="truncate">{col.label}</span>
                    )}
                    {!isLast && <Resizer colKey={col.id} />}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {sortedData && sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  onClick={() => onItemClick && onItemClick(row)}
                  className={`border-b border-borde last:border-0 transition-colors ${onItemClick ? 'cursor-pointer' : ''} ${rowClassName ? rowClassName(row, index) : `hover:bg-canvas ${index % 2 === 0 ? '' : 'bg-canvas/50'}`}`}
                >
                  {activeColumns.map((col, idx) => {
                    const isLast = idx === activeColumns.length - 1;
                    return (
                      <td key={col.id} className={`text-sm text-texto border-borde ${!isLast ? 'border-r' : ''} ${typeof col.cellClassName === 'function' ? col.cellClassName(row) : (col.cellClassName || '')}`} style={cellStyle(widths[col.id], col.cellStyle)}>
                        {col.renderCell ? col.renderCell(row) : row[col.id]}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={activeColumns.length || 1} className="text-center text-sm text-pizarra/70" style={{ padding: '32px 20px' }}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
