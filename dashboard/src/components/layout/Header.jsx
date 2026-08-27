import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export default function Header({
  searchTerm,
  onSearchChange,
  onMenuClick
}) {
  return (
    <header className="bg-superficie border-b border-borde flex items-center justify-between sticky top-0 z-20 shrink-0" style={{ height: '80px', padding: '0 clamp(24px, 5vw, 48px)', gap: '16px' }}>
      {/* Left side: Hamburger + Search */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        <button 
          type="button" 
          onClick={onMenuClick}
          className="lg:hidden text-pizarra hover:bg-superficie-sec rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primario"
          style={{ padding: '8px' }}
        >
          <Menu style={{ width: '24px', height: '24px' }} />
        </button>
        
        <div className="relative hidden sm:block" style={{ width: '320px' }}>
          <Search className="text-pizarra/60 absolute" style={{ width: '18px', height: '18px', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Buscar organización, expediente o DNI..."
            value={searchTerm || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full bg-canvas text-texto placeholder:text-pizarra/60 text-[14px] rounded-md focus:outline-none focus:ring-2 focus:ring-primario/30 border border-transparent focus:border-primario/40 transition-all font-medium"
            style={{ padding: '12px 16px 12px 42px' }}
          />
        </div>
      </div>

      {/* Right side: Notifications */}
      <div className="flex items-center">
        {/* Notifications */}
        <button
          type="button"
          className="relative text-pizarra/80 hover:text-pizarra hover:bg-canvas rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          title="Notificaciones"
          style={{ padding: '10px' }}
        >
          <Bell style={{ width: '22px', height: '22px' }} />
          <span className="absolute bg-critico text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white" style={{ width: '18px', height: '18px', top: '4px', right: '4px' }}>
            3
          </span>
        </button>
      </div>
    </header>
  );
}



