import React, { useState } from 'react';
import { User, WarningAlt } from '@carbon/icons-react';
import PageTemplate from '../components/layout/PageTemplate';
import { useData } from '../context/DataContext';
import Modal from '../components/common/Modal';

export default function PerfilPage() {
  const { isDemoMode, resetDatabase } = useData();
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetState, setTargetState] = useState(false);

  const handleToggle = () => {
    setTargetState(!isDemoMode);
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    resetDatabase(targetState);
    setShowConfirm(false);
  };

  return (
    <PageTemplate>
      <div className="flex flex-col max-w-2xl mx-auto w-full gap-6">
        <h1 className="text-2xl font-bold text-pizarra">Configuración del Perfil</h1>
        
        <div className="bg-white rounded-2xl p-8 border border-borde shadow-sm">
          <div className="flex items-center gap-4 border-b border-borde pb-6 mb-6">
            <div className="bg-primario/10 text-primario w-16 h-16 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-texto">Director General</h2>
              <p className="text-pizarra/60 text-sm">Administrador del Sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-pizarra text-lg">Opciones de Demostración</h3>
            <p className="text-sm text-texto leading-relaxed max-w-xl">
              Al activar el modo "Pizarra en Blanco", todos los datos mockeados desaparecerán y la plataforma quedará lista para realizar una demostración de importación en vivo.
            </p>
            
            <div className="flex items-center justify-between bg-canvas p-4 rounded-xl border border-borde mt-4">
              <div className="flex flex-col">
                <span className="font-bold text-texto">Modo Pizarra en Blanco</span>
                <span className="text-xs text-pizarra/60">{isDemoMode ? 'Activado: Sin datos cargados.' : 'Desactivado: Utilizando datos mock de prueba.'}</span>
              </div>
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primario focus:ring-offset-2 ${isDemoMode ? 'bg-primario' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDemoMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="¿Estás seguro?" size="md">
        <div className="flex flex-col items-center text-center p-4">
          <WarningAlt size={48} className="text-naranja mb-4" />
          <h3 className="text-lg font-bold text-pizarra mb-2">
            {targetState ? 'Activar Pizarra en Blanco' : 'Restaurar Datos Mockeados'}
          </h3>
          <p className="text-sm text-texto mb-6">
            {targetState 
              ? 'Esto ocultará todos los datos actuales y dejará la plataforma vacía para tu demostración.' 
              : 'Esto sobrescribirá cualquier dato importado o modificado durante la demostración y restaurará la base de datos de prueba original.'}
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-3 px-4 bg-canvas text-pizarra font-semibold rounded-xl hover:bg-superficie-sec transition-colors border border-borde"
            >
              Cancelar
            </button>
            <button
              onClick={confirmToggle}
              className="flex-1 py-3 px-4 bg-primario text-white font-semibold rounded-xl hover:bg-primario/90 transition-colors shadow-sm"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </PageTemplate>
  );
}
