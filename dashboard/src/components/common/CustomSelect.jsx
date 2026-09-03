import React, { useState } from 'react';

export default function CustomSelect({ value, onChange, options, placeholder = 'Seleccionar...', required }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-canvas text-texto text-sm rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 transition-all cursor-pointer"
        style={{ padding: '10px 16px' }}
      >
        <span className={selectedOption ? 'text-texto' : 'text-pizarra/50'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-pizarra/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Hidden input to satisfy HTML form 'required' validation if needed */}
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
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-borde rounded-xl shadow-lg z-50 overflow-hidden py-1 max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  value === opt.value 
                    ? 'bg-primario/10 text-primario' 
                    : 'text-pizarra hover:bg-superficie-sec hover:text-texto'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
