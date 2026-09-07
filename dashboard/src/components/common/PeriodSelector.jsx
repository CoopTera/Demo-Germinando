import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Checkmark, Close } from '@carbon/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

const MONTHS = [
  { val: '01', label: 'Ene' }, { val: '02', label: 'Feb' }, { val: '03', label: 'Mar' },
  { val: '04', label: 'Abr' }, { val: '05', label: 'May' }, { val: '06', label: 'Jun' },
  { val: '07', label: 'Jul' }, { val: '08', label: 'Ago' }, { val: '09', label: 'Sep' },
  { val: '10', label: 'Oct' }, { val: '11', label: 'Nov' }, { val: '12', label: 'Dic' }
];

export default function PeriodSelector({ periodoDesde, setPeriodoDesde, periodoHasta, setPeriodoHasta, availableYears }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse current values
  const [dYear, dMonth] = periodoDesde ? periodoDesde.split('-') : ['', ''];
  const [hYear, hMonth] = periodoHasta ? periodoHasta.split('-') : ['', ''];

  // Local state for the dropdown
  const [tempDYear, setTempDYear] = useState(dYear || '');
  const [tempDMonth, setTempDMonth] = useState(dMonth || '');
  const [tempHYear, setTempHYear] = useState(hYear || '');
  const [tempHMonth, setTempHMonth] = useState(hMonth || '');

  // Sync when opening
  useEffect(() => {
    if (isOpen) {
      setTempDYear(dYear || (availableYears[availableYears.length - 1]?.toString() || ''));
      setTempDMonth(dMonth || '01');
      setTempHYear(hYear || (availableYears[0]?.toString() || ''));
      setTempHMonth(hMonth || '12');
    }
  }, [isOpen, dYear, dMonth, hYear, hMonth, availableYears]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = () => {
    setPeriodoDesde(`${tempDYear}-${tempDMonth}`);
    setPeriodoHasta(`${tempHYear}-${tempHMonth}`);
    setIsOpen(false);
  };

  const handleClear = () => {
    setPeriodoDesde('');
    setPeriodoHasta('');
    setIsOpen(false);
  };

  const hasFilter = periodoDesde || periodoHasta;

  const displayLabel = () => {
    if (!hasFilter) return 'Todos los períodos';
    const format = (y, m) => {
      const monthLabel = MONTHS.find(x => x.val === m)?.label || m;
      return `${monthLabel} ${y}`;
    };
    return `${format(dYear, dMonth)} - ${format(hYear, hMonth)}`;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm border ${isOpen ? 'border-[#6B1330] bg-[#6B1330]/5 text-[#6B1330]' : hasFilter ? 'border-[#6B1330] bg-white text-[#6B1330]' : 'border-[#E2E4EB] bg-white text-[#494963] hover:bg-[#F5F6F8]'}`}
      >
        <Calendar size={16} />
        <span>{displayLabel()}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-[#E2E4EB] z-[100] w-72 overflow-hidden"
          >
            <div className="p-4 border-b border-[#E2E4EB] bg-[#FAFAFC]">
              <h3 className="text-sm font-bold text-[#2D2D3A]">Seleccionar Período</h3>
              <p className="text-[11px] font-semibold text-[#494963]/60 mt-0.5">Define el mes de inicio y fin.</p>
            </div>
            
            <div className="p-4 space-y-4">
              {/* DESDE */}
              <div>
                <span className="text-[10px] font-bold text-[#494963]/60 uppercase tracking-wider mb-1.5 block">Desde</span>
                <div className="flex gap-2">
                  <select 
                    value={tempDMonth} onChange={e => setTempDMonth(e.target.value)}
                    className="flex-1 bg-white border border-[#E2E4EB] text-xs font-bold text-[#494963] rounded-md px-2 py-1.5 outline-none focus:border-[#6B1330]"
                  >
                    {MONTHS.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                  </select>
                  <select 
                    value={tempDYear} onChange={e => setTempDYear(e.target.value)}
                    className="flex-1 bg-white border border-[#E2E4EB] text-xs font-bold text-[#494963] rounded-md px-2 py-1.5 outline-none focus:border-[#6B1330]"
                  >
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* HASTA */}
              <div>
                <span className="text-[10px] font-bold text-[#494963]/60 uppercase tracking-wider mb-1.5 block">Hasta</span>
                <div className="flex gap-2">
                  <select 
                    value={tempHMonth} onChange={e => setTempHMonth(e.target.value)}
                    className="flex-1 bg-white border border-[#E2E4EB] text-xs font-bold text-[#494963] rounded-md px-2 py-1.5 outline-none focus:border-[#6B1330]"
                  >
                    {MONTHS.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                  </select>
                  <select 
                    value={tempHYear} onChange={e => setTempHYear(e.target.value)}
                    className="flex-1 bg-white border border-[#E2E4EB] text-xs font-bold text-[#494963] rounded-md px-2 py-1.5 outline-none focus:border-[#6B1330]"
                  >
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F5F6F8] border-t border-[#E2E4EB] flex items-center justify-between">
              <button 
                onClick={handleClear}
                className="text-[11px] font-bold text-[#494963] hover:text-[#E42153] px-2 py-1 transition-colors cursor-pointer"
              >
                Limpiar
              </button>
              <button 
                onClick={handleApply}
                className="bg-[#6B1330] hover:bg-[#83183d] text-white text-[11px] font-bold px-4 py-1.5 rounded-md transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Checkmark size={14} /> Aplicar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
