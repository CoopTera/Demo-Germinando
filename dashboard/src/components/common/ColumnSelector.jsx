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
        className="flex items-center gap-2 bg-white border border-borde rounded-xl text-sm font-semibold text-pizarra hover:text-primario hover:bg-canvas transition-all card-elevated"
        title="Mostrar/Ocultar Columnas"
        style={{ padding: '10px 16px' }}
      >
        <List size={16} />
        <span className="hidden sm:inline">Columnas</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-borde z-50" style={{ padding: '8px 0' }}>
          <div className="border-b border-borde flex items-center justify-between" style={{ padding: '8px 16px', marginBottom: '8px' }}>
            <span className="text-xs font-bold text-pizarra uppercase tracking-wider">Columnas Visibles</span>
          </div>
          <div className="flex flex-col" style={{ gap: '4px', padding: '0 8px' }}>
            {columns.map((col, idx) => (
              <label 
                key={col.id} 
                draggable={!!setColumns}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={() => setDraggedItem(null)}
                className={`flex items-center rounded-lg hover:bg-canvas cursor-pointer transition-colors ${draggedItem === idx ? 'opacity-50 bg-canvas' : ''}`}
                style={{ padding: '8px 12px', gap: '12px' }}
              >
              <input 
                type="checkbox" 
                checked={visibleColumns[col.id] !== false}
                onChange={() => toggleColumn(col.id)}
                className="w-4 h-4 text-primario focus:ring-primario/20 rounded border-gray-300"
                style={{ accentColor: '#6B1330' }}
              />
              <span className="text-sm font-medium text-texto">{col.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
