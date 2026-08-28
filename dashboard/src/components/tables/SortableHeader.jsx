import React from 'react';
import { CaretUp, CaretDown, ArrowsDownUp } from '@phosphor-icons/react';

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
          <CaretUp weight="fill" style={{ width: '12px', height: '12px' }} />
        ) : direction === 'desc' ? (
          <CaretDown weight="fill" style={{ width: '12px', height: '12px' }} />
        ) : (
          <ArrowsDownUp style={{ width: '12px', height: '12px' }} />
        )}
      </span>
    </div>
  );
}
