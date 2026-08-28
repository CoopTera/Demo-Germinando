import React, { useState } from 'react';
import { Calendar, UserPlus, BookOpen, Activity, BookmarkSimple, PencilSimple, Trash, Check, X } from '@phosphor-icons/react';

const getIcon = (tipo) => {
  switch (tipo) {
    case 'ingreso': return <UserPlus className="w-4 h-4 text-primario" />;
    case 'taller': return <BookOpen className="w-4 h-4 text-naranja" />;
    case 'seguimiento': return <Activity className="w-4 h-4 text-exito" />;
    case 'convenio': return <BookmarkSimple className="w-4 h-4 text-pizarra" />;
    default: return <Calendar className="w-4 h-4 text-pizarra/50" />;
  }
};

const getIconBg = (tipo) => {
  switch (tipo) {
    case 'ingreso': return 'bg-primario/10';
    case 'taller': return 'bg-naranja/10';
    case 'seguimiento': return 'bg-exito/10';
    case 'convenio': return 'bg-pizarra/10';
    default: return 'bg-canvas';
  }
};

export default function EntityTimeline({ historial, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editDesc, setEditDesc] = useState('');

  if (!historial || historial.length === 0) {
    return (
      <div className="text-sm text-pizarra/50 italic text-center" style={{ padding: '16px' }}>
        No hay eventos registrados en el historial.
      </div>
    );
  }

  const startEdit = (evento) => {
    setEditingId(evento.id);
    setEditDesc(evento.descripcion);
  };

  const saveEdit = (evento) => {
    if (onEdit) {
      onEdit({ ...evento, descripcion: editDesc });
    }
    setEditingId(null);
  };

  return (
    <div className="relative" style={{ paddingLeft: '12px', marginTop: '16px' }}>
      {/* Vertical line */}
      <div className="absolute bg-borde" style={{ left: '28px', top: '16px', bottom: '16px', width: '1px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {historial.map((evento, idx) => (
          <div key={evento.id || idx} className="relative flex group" style={{ gap: '16px' }}>
            {/* Icon Circle */}
            <div className={`relative z-10 rounded-full border-2 border-white flex items-center justify-center shrink-0 ${getIconBg(evento.tipo)}`} style={{ width: '36px', height: '36px' }}>
              {getIcon(evento.tipo)}
            </div>

            {/* Content */}
            <div className="flex-1" style={{ paddingBottom: '4px' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <span className="text-xs font-bold text-pizarra/50">{evento.fecha}</span>
                  <span className="rounded-full bg-borde" style={{ width: '4px', height: '4px' }} />
                  <h4 className="text-sm font-bold text-texto">{evento.titulo}</h4>
                </div>
                
                {/* Actions (visible on hover) */}
                {editingId !== evento.id && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    {onEdit && (
                      <button onClick={() => startEdit(evento)} className="p-1 text-pizarra/40 hover:text-primario hover:bg-primario/10 rounded transition-colors cursor-pointer" title="Editar">
                        <PencilSimple style={{ width: '14px', height: '14px' }} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(evento.id)} className="p-1 text-pizarra/40 hover:text-critico hover:bg-critico/10 rounded transition-colors cursor-pointer" title="Eliminar">
                        <Trash style={{ width: '14px', height: '14px' }} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Box Content */}
              <div className="bg-white rounded-lg border border-borde shadow-sm" style={{ padding: '12px', marginTop: '8px' }}>
                {editingId === evento.id ? (
                  <div className="flex flex-col gap-2">
                    <textarea 
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full text-sm text-texto bg-canvas border border-borde rounded p-2 focus:outline-none focus:border-primario resize-none"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingId(null)} className="flex items-center text-xs font-bold text-pizarra border border-borde px-2 py-1 rounded hover:bg-canvas cursor-pointer">
                        <X style={{ width: '12px', height: '12px', marginRight: '4px' }} /> Cancelar
                      </button>
                      <button onClick={() => saveEdit(evento)} className="flex items-center text-xs font-bold text-white bg-primario px-2 py-1 rounded hover:bg-primario/90 cursor-pointer">
                        <Check style={{ width: '12px', height: '12px', marginRight: '4px' }} /> Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-pizarra/80">
                    {evento.descripcion}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

