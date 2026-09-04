import React, { useState, useEffect, useRef } from 'react';
import { List } from '@carbon/icons-react';

export default function ColumnSelector({ columns, setColumns, visibleColumns, setVisibleColumns, storageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setVisibleColumns(JSON.parse(saved));
      } catch(e) {}
    }
  }, [storageKey, setVisibleColumns]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
  }, [visibleColumns, storageKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleColumn = (colId) => {
    setVisibleColumns(prev => {
      const next = { ...prev, [colId]: !prev[colId] };
      if (Object.values(next).every(v => !v)) return prev;
      return next;
    });
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent drag image
    const dragIcon = document.createElement('div');
    e.dataTransfer.setDragImage(dragIcon, 0, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index || !setColumns) return;
    
    const newCols = [...columns];
    const draggedCol = newCols[draggedItem];
    newCols.splice(draggedItem, 1);
    newCols.splice(index, 0, draggedCol);
    
    setColumns(newCols);
    setDraggedItem(index);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-sm font-semibold rounded-xl transition-all cursor-pointer card-elevated border select-none ${
          isOpen ? 'bg-white text-primario border-primario/30' : 'bg-white text-pizarra hover:text-primario hover:bg-canvas border-borde'
        }`}
        title="Mostrar/Ocultar Columnas"
        style={{ padding: '9px 16px' }}
      >
        <List size={16} />
        <span className="hidden sm:inline font-semibold">Columnas</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-borde z-50" style={{ padding: '8px 0' }}>
          <div className="border-b border-borde flex flex-col justify-center" style={{ padding: '8px 16px', marginBottom: '8px', gap: '2px' }}>
            <span className="text-xs font-bold text-pizarra uppercase tracking-wider">Columnas Visibles</span>
            {!!setColumns && (
              <span className="text-[10px] text-pizarra/60 font-medium">Arrastrá para reordenar</span>
            )}
          </div>
          <div className="flex flex-col" style={{ gap: '4px', padding: '0 8px' }}>
            {columns.map((col, idx) => (
              <label 
                key={col.id} 
                draggable={!!setColumns}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={() => setDraggedItem(null)}
                className={`group flex items-center rounded-lg hover:bg-canvas transition-colors ${!!setColumns ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${draggedItem === idx ? 'opacity-50 bg-canvas' : ''}`}
                style={{ padding: '8px 12px', gap: '8px' }}
              >
                {/* Drag Handle Icon */}
                {!!setColumns && (
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" className="text-pizarra/20 group-hover:text-pizarra/60 transition-colors shrink-0">
                    <circle cx="4" cy="4" r="1.5" />
                    <circle cx="8" cy="4" r="1.5" />
                    <circle cx="4" cy="8" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="8" cy="12" r="1.5" />
                  </svg>
                )}
                <span className="text-sm font-medium text-texto select-none flex-1 truncate">{col.label}</span>
                <input 
                  type="checkbox" 
                  checked={visibleColumns[col.id] !== false}
                  onChange={() => toggleColumn(col.id)}
                  className="w-4 h-4 shrink-0 text-primario focus:ring-primario/20 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor: '#6B1330' }}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
