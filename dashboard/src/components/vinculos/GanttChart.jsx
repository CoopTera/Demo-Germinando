import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from '@carbon/icons-react';

const GanttChart = ({ vinculos, programas, onItemClick, selectedId }) => {
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (programaId) => {
    setCollapsed(prev => ({ ...prev, [programaId]: !prev[programaId] }));
  };

  const { minDate, maxDate, totalMonths, monthsArr } = useMemo(() => {
    if (!vinculos || vinculos.length === 0) {
      const today = new Date();
      return { minDate: today, maxDate: today, totalMonths: 1, monthsArr: [] };
    }
    
    let min = new Date('2099-01-01');
    let max = new Date('2000-01-01');
    
    vinculos.forEach(v => {
      const start = new Date(v.fechaInicio);
      const end = new Date(v.fechaFin);
      if (start < min) min = start;
      if (end > max) max = end;
    });

    // Add padding to dates
    min = new Date(min.getFullYear(), min.getMonth() - 1, 1);
    max = new Date(max.getFullYear(), max.getMonth() + 2, 0);
    
    const months = (max.getFullYear() - min.getFullYear()) * 12 + (max.getMonth() - min.getMonth()) + 1;
    
    const arr = [];
    for (let i = 0; i < months; i++) {
      const d = new Date(min.getFullYear(), min.getMonth() + i, 1);
      arr.push(d);
    }
    
    return { minDate: min, maxDate: max, totalMonths: months, monthsArr: arr };
  }, [vinculos]);

  const groups = useMemo(() => {
    const grouped = {};
    vinculos.forEach(v => {
      const prog = programas.find(p => p.id === v.programa_id) || { id: v.programa_id, nombre: 'Sin Programa', color: '#888' };
      if (!grouped[prog.id]) {
        grouped[prog.id] = { programa: prog, items: [] };
      }
      grouped[prog.id].items.push(v);
    });
    return Object.values(grouped).sort((a, b) => a.programa.nombre.localeCompare(b.programa.nombre));
  }, [vinculos, programas]);

  const getPosition = (dateStr) => {
    if (!dateStr) return 0;
    const d = new Date(dateStr);
    const totalMs = maxDate - minDate;
    const ms = d - minDate;
    return (ms / totalMs) * 100;
  };

  const today = new Date();
  const todayPos = getPosition(today);
  const showToday = today >= minDate && today <= maxDate;

  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Vigente': return 'text-[#22C55E] bg-[#22C55E]/10';
      case 'En Negociación': return 'text-[#FF7402] bg-[#FF7402]/10';
      case 'Finalizado': return 'text-[#494963] bg-[#494963]/10';
      case 'Suspendido': return 'text-[#E42153] bg-[#E42153]/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null, group: null, ejecucion: 0 });

  const handleMouseMove = (e, v, group, ejecucion) => {
    let x = e.clientX + 15;
    let y = e.clientY + 15;
    if (x + 320 > window.innerWidth) x = e.clientX - 335;
    if (y + 150 > window.innerHeight) y = e.clientY - 165;
    setTooltip({ show: true, x, y, data: v, group, ejecucion });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E4EB] flex flex-col h-full font-sans text-sm overflow-hidden shadow-sm">
      <div className="flex-1 overflow-auto relative custom-scrollbar" data-lenis-prevent>
        <div style={{ minWidth: `calc(280px + ${monthsArr.length * 60}px)` }} className="flex flex-col min-h-full">
          
          {/* Header Row */}
          <div className="flex border-b border-[#E2E4EB] bg-[#F5F6F8] sticky top-0 z-40">
            <div style={{ width: '280px', minWidth: '280px', padding: '12px 20px' }} className="font-bold text-[#494963] text-xs uppercase tracking-wider border-r border-[#E2E4EB] bg-[#F5F6F8] sticky left-0 z-50 flex items-center shadow-[2px_0_8px_-3px_rgba(0,0,0,0.1)]">
              Programa / Vínculo
            </div>
            <div className="flex-1 flex">
              {monthsArr.map((d, i) => {
                const isJanuary = d.getMonth() === 0;
                return (
                  <div key={i} className={`flex-1 border-[#E2E4EB]/80 text-[11px] text-[#494963] font-bold text-center uppercase tracking-wider ${isJanuary ? 'border-r-2 border-[#494963]/30' : 'border-r'}`} style={{ padding: '12px 0' }}>
                    {isJanuary ? `${monthNames[d.getMonth()]} ${d.getFullYear()}` : monthNames[d.getMonth()]}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col relative flex-1 pb-16">
             {/* Global Grid Lines */}
             <div className="absolute top-0 bottom-0 right-0 flex pointer-events-none" style={{ left: '280px' }}>
                {monthsArr.map((d, i) => {
                   const isJanuary = d.getMonth() === 0;
                   return (
                     <div key={i} className={`flex-1 h-full ${isJanuary ? 'border-r-2 border-[#494963]/20' : 'border-r border-[#E2E4EB]/40'}`}></div>
                   );
                })}
                {showToday && (
                  <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-[#E42153]/50 z-10" style={{ left: `${todayPos}%` }}></div>
                )}
             </div>

             {groups.map(group => {
               const isCollapsed = collapsed[group.programa.id];
               return (
                 <div key={group.programa.id} className="flex flex-col w-full relative z-20 hover:z-[60]">
                   {/* Group Header Row */}
                   <div 
                     className="flex w-full border-b border-[#E2E4EB] bg-[#FAFAFC] hover:bg-[#F0F2F5] cursor-pointer transition-colors"
                     onClick={() => toggleGroup(group.programa.id)}
                   >
                     <div style={{ width: '280px', minWidth: '280px', padding: '12px 20px' }} className="border-r border-[#E2E4EB] bg-inherit sticky left-0 z-30 flex items-center font-bold text-[#2D2D3A] shadow-[2px_0_8px_-3px_rgba(0,0,0,0.05)]">
                       <span className="mr-2 text-[#494963]">
                         {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                       </span>
                       <div className="w-3.5 h-3.5 rounded-full mr-2.5 shrink-0" style={{ backgroundColor: group.programa.color }}></div>
                       <span className="truncate">{group.programa.nombre} <span className="text-[#494963]/60 font-medium ml-1">({group.items.length})</span></span>
                     </div>
                     <div className="flex-1 relative"></div>
                   </div>

                   {/* Items */}
                   {!isCollapsed && group.items.map(v => {
                     const left = getPosition(v.fechaInicio);
                     const right = getPosition(v.fechaFin);
                     const width = right - left;
                     const ejecucion = v.presupuestoAsignado ? (v.presupuestoEjecutado / v.presupuestoAsignado) : 0;
                     const isSelected = selectedId === v.id;

                     return (
                       <div 
                         key={v.id} 
                         className={`flex w-full border-b border-[#E2E4EB]/50 hover:bg-[#EBEDF2]/40 cursor-pointer transition-colors relative hover:z-[60] ${isSelected ? 'bg-[#EBEDF2]/60' : ''}`}
                         onClick={() => onItemClick(v)}
                       >
                         <div style={{ width: '280px', minWidth: '280px', padding: '12px 20px 12px 44px' }} className={`border-r border-[#E2E4EB] sticky left-0 z-30 flex items-center shadow-[2px_0_8px_-3px_rgba(0,0,0,0.05)] ${isSelected ? 'bg-[#F2F4F7]' : 'bg-white'}`}>
                           <span className="truncate text-[#494963] font-medium" title={v.titulo}>{v.titulo}</span>
                         </div>
                         <div className="flex-1 relative h-12 group flex items-center hover:z-[60]">
                           
                           {/* Bar */}
                           <div 
                             className="absolute h-6 rounded-md overflow-hidden shadow-sm z-20 group-hover:shadow-md transition-all group-hover:h-7"
                             style={{ left: `${left}%`, width: `${width}%`, backgroundColor: `${group.programa.color}30`, border: `1px solid ${group.programa.color}80` }}
                             onMouseMove={(e) => handleMouseMove(e, v, group, ejecucion)}
                             onMouseLeave={handleMouseLeave}
                           >
                             <div 
                               className="h-full transition-all"
                               style={{ width: `${ejecucion * 100}%`, backgroundColor: group.programa.color }}
                             ></div>
                           </div>
                           
                           {/* Hitos (Checkpoints) */}
                           {v.hitos?.map(hito => {
                             const hitoPos = getPosition(hito.fecha);
                             if (hitoPos < 0 || hitoPos > 100) return null;
                             return (
                               <div
                                 key={hito.id}
                                 className="absolute z-30 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"
                                 style={{ left: `${hitoPos}%`, top: '50%' }}
                                 title={`${hito.titulo} (${hito.fecha})`}
                               >
                                 <div 
                                   className="w-3.5 h-3.5 rounded-full shadow-sm border-2 bg-white flex items-center justify-center"
                                   style={{ 
                                     borderColor: hito.completado ? '#22C55E' : '#A0AABF' 
                                   }}
                                 >
                                   {hito.completado && (
                                     <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22C55E' }}></div>
                                   )}
                                 </div>
                               </div>
                             );
                           })}
                           
                           {/* End Markers (Start/End) */}
                           <div 
                             className="absolute w-3 h-3 bg-white border-2 rounded-full shadow-sm z-30 transition-transform group-hover:scale-110"
                             style={{ left: `calc(${left}% - 6px)`, borderColor: group.programa.color }}
                           ></div>
                           <div 
                             className="absolute w-3 h-3 bg-white border-2 rounded-full shadow-sm z-30 transition-transform group-hover:scale-110"
                             style={{ left: `calc(${right}% - 6px)`, borderColor: group.programa.color, backgroundColor: ejecucion >= 1 ? group.programa.color : 'white' }}
                           ></div>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               );
             })}
          </div>
        </div>
      </div>

      {/* Global Fixed Tooltip */}
      {tooltip.show && tooltip.data && (
        <div 
          className="fixed z-[9999] bg-white border border-[#E2E4EB] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] text-[13px] w-80 flex flex-col gap-1.5 pointer-events-none" 
          style={{ 
            left: `${tooltip.x}px`, 
            top: `${tooltip.y}px`,
            padding: '16px'
          }}
        >
          <div className="font-bold text-[#2D2D3A] text-[14px] leading-tight">{tooltip.data.titulo}</div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className={`inline-flex items-center rounded-md text-[11px] font-bold ${getEstadoColor(tooltip.data.estado)}`} style={{ padding: '2px 8px' }}>{tooltip.data.estado}</div>
            <div className="text-[11px] font-semibold text-[#494963]/60">{tooltip.data.tipo}</div>
          </div>
          
          <div className="flex flex-col gap-1.5 mt-1 text-[#494963]">
            <div className="flex justify-between items-center">
              <span className="opacity-70 text-[10px] uppercase tracking-wider font-bold">Ejecución</span>
              <span className="font-bold text-[#2D2D3A]">{(tooltip.ejecucion * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[#EBEDF2] h-1.5 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${tooltip.ejecucion * 100}%`, backgroundColor: tooltip.group.programa.color }}></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2 border-t border-[#E2E4EB]/50 text-[#494963]" style={{ paddingTop: '8px' }}>
            <span className="opacity-70 text-[10px] uppercase tracking-wider font-bold">Presupuesto</span>
            <span className="font-semibold text-[#2D2D3A]">${tooltip.data.presupuestoEjecutado?.toLocaleString()} / ${tooltip.data.presupuestoAsignado?.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;
