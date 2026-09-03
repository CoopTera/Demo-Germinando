import React, { useState, useMemo } from 'react';

const DAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function CustomDatePicker({ value, onChange, placeholder = 'dd/mm/aaaa', required }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) return new Date(parts[0], parts[1] - 1, 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Previous month padding
    for (let i = 0; i < firstDay; i++) {
      days.unshift({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Next month padding (to complete 6 rows if necessary, or just fill the week)
    const totalSlots = Math.ceil(days.length / 7) * 7;
    const remaining = totalSlots - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  }, [currentMonth]);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const formattedDisplay = useMemo(() => {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length !== 3) return value;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }, [value]);

  const isSelected = (date) => {
    if (!value) return false;
    const parts = value.split('-');
    if (parts.length !== 3) return false;
    return date.getFullYear() === Number(parts[0]) &&
           date.getMonth() === (Number(parts[1]) - 1) &&
           date.getDate() === Number(parts[2]);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 transition-all cursor-pointer"
        style={{ padding: '10px 16px' }}
      >
        <span className={value ? 'text-texto' : 'text-pizarra/50'}>
          {value ? formattedDisplay : placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pizarra/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {required && (
        <input 
          type="text" 
          required 
          value={value || ''} 
          onChange={() => {}} 
          className="opacity-0 absolute inset-0 -z-10 pointer-events-none" 
        />
      )}
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-borde rounded-2xl shadow-xl z-50 overflow-hidden" style={{ padding: '16px' }}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={handlePrevMonth} className="p-1 rounded-lg hover:bg-superficie-sec text-pizarra transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="font-semibold text-sm text-texto capitalize">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button type="button" onClick={handleNextMonth} className="p-1 rounded-lg hover:bg-superficie-sec text-pizarra transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-pizarra/50 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayObj, i) => {
                const selected = isSelected(dayObj.date);
                const today = isToday(dayObj.date);
                
                let btnClass = "w-7 h-7 flex items-center justify-center text-xs rounded-full transition-colors cursor-pointer mx-auto ";
                
                if (selected) {
                  btnClass += "bg-primario text-white font-bold shadow-md";
                } else if (!dayObj.isCurrentMonth) {
                  btnClass += "text-pizarra/30 hover:bg-superficie-sec";
                } else if (today) {
                  btnClass += "bg-primario/10 text-primario font-bold hover:bg-primario/20";
                } else {
                  btnClass += "text-texto hover:bg-superficie-sec font-medium";
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectDate(dayObj.date)}
                    className={btnClass}
                  >
                    {dayObj.date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-borde">
              <button 
                type="button" 
                onClick={() => { onChange(''); setIsOpen(false); }}
                className="text-xs font-semibold text-pizarra hover:text-critico transition-colors cursor-pointer"
              >
                Borrar
              </button>
              <button 
                type="button" 
                onClick={() => handleSelectDate(new Date())}
                className="text-xs font-semibold text-primario hover:text-primario/80 transition-colors cursor-pointer"
              >
                Hoy
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
