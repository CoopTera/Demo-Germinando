import React, { useRef } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useData } from '../../context/DataContext';
import {
  Search,
  Plus,
  Upload,
  Bell,
  User,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

export default function Header({
  onAddNew,
  searchTerm,
  onSearchChange,
  onMenuClick
}) {
  const { importarDesdeExcel } = useData();
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      importarDesdeExcel(file);
    }
    // reset input
    e.target.value = null;
  };

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

      {/* Right side: Actions & Profile */}
      <div className="flex items-center" style={{ gap: '16px' }}>
        {/* Add New Button */}
        <button
          type="button"
          onClick={onAddNew}
          className="flex items-center bg-primario hover:bg-primario/90 text-white text-[14px] font-semibold rounded-md transition-colors shadow-sm cursor-pointer"
          style={{ padding: '10px 20px', gap: '8px' }}
        >
          <Plus className="stroke-[2.5]" style={{ width: '18px', height: '18px' }} />
          <span>Nuevo Registro</span>
        </button>

        {/* Hidden File Input */}
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />

        {/* Import Data Button */}
        <button
          type="button"
          onClick={handleImportClick}
          className="flex items-center border border-borde hover:bg-canvas text-pizarra text-[14px] font-semibold rounded-md transition-colors cursor-pointer"
          style={{ padding: '10px 20px', gap: '8px' }}
        >
          <Upload className="stroke-[2.5]" style={{ width: '18px', height: '18px' }} />
          <span>Importar</span>
        </button>

        <div className="bg-borde" style={{ width: '1px', height: '32px', margin: '0 8px' }} />

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

        {/* User Avatar Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="bg-pizarra text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer hover:bg-pizarra/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primario/40"
              title="Director General (DG)"
              aria-label="Menú de usuario"
              style={{ width: '40px', height: '40px', marginLeft: '8px' }}
            >
              DG
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="bg-white rounded-md shadow-lg border border-borde p-1.5 z-50 focus:outline-none"
              style={{ minWidth: '220px', marginTop: '4px' }}
            >
              <div className="px-3 py-2.5 mb-1 border-b border-borde">
                <p className="text-[14px] font-bold text-texto">Directorio General</p>
                <p className="text-[12px] text-pizarra/70 font-medium">dg@germinando.gob.ar</p>
              </div>

              <DropdownMenu.Item className="flex items-center text-sm text-texto rounded-sm outline-none cursor-pointer hover:bg-canvas focus:bg-canvas transition-colors select-none" style={{ padding: '8px 12px', gap: '12px' }}>
                <User style={{ width: '16px', height: '16px' }} className="text-pizarra/70" />
                <span className="font-medium">Mi Perfil</span>
              </DropdownMenu.Item>

              <DropdownMenu.Item className="flex items-center text-sm text-texto rounded-sm outline-none cursor-pointer hover:bg-canvas focus:bg-canvas transition-colors select-none" style={{ padding: '8px 12px', gap: '12px' }}>
                <Settings style={{ width: '16px', height: '16px' }} className="text-pizarra/70" />
                <span className="font-medium">Configuración</span>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="bg-borde" style={{ height: '1px', margin: '4px 0' }} />

              <DropdownMenu.Item className="flex items-center text-sm text-critico rounded-sm outline-none cursor-pointer hover:bg-critico/10 focus:bg-critico/10 transition-colors select-none" style={{ padding: '8px 12px', gap: '12px' }}>
                <LogOut style={{ width: '16px', height: '16px' }} className="text-critico" />
                <span className="font-bold">Cerrar Sesión</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}



