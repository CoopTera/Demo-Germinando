import React from 'react';
import { CaretUp, CaretDown, ArrowsVertical } from '@carbon/icons-react';

export default function SortableHeader({ label, sortKey, sortConfig, requestSort, customSort = null }) {
  const isSorted = sortConfig && sortConfig.key === sortKey;
  const direction = isSorted ? sortConfig.direction : null;

  return (
    <div 
      className="flex items-center gap-1 cursor-pointer hover:text-primario transition-colors select-none group"
      onClick={() => requestSort(sortKey, customSort)}
    >
      <span className="truncate">{label}</span>
      <span className={`flex flex-col opacity-50 group-hover:opacity-100 ${isSorted ? 'opacity-100 text-primario' : ''}`}>
        {direction === 'asc' ? (
          <CaretUp size={12} />
        ) : direction === 'desc' ? (
          <CaretDown size={12} />
        ) : (
          <ArrowsVertical size={12} />
        )}
      </span>
    </div>
  );
}
