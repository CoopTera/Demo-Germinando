import React, { useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Upload,
  X,
  Users,
  Receipt,
  Package,
  FileUp,
  FileSpreadsheet,
  Trash2
} from 'lucide-react';

export default function ImportModal({ isOpen, onClose, onImport }) {
  const [tipo, setTipo] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const importTypes = [
    {
      id: 'beneficiarios',
      title: 'Padrón de Beneficiarios',
      description: 'DNI, Nombre, Localidad, Organización, Beca',
      icon: Users,
    },
    {
      id: 'ejecucion',
      title: 'Actualización de Ejecución',
      description: 'CUIT Org, Nro Convenio, Gasto, Concepto, Fecha',
      icon: Receipt,
    },
    {
      id: 'catalogo',
      title: 'Catálogo de Oferta Productiva',
      description: 'ID Org, Producto/Servicio, Capacidad',
      icon: Package,
    },
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const ext = droppedFile.name.split('.').pop()?.toLowerCase();
      if (['xlsx', 'xls', 'csv'].includes(ext)) {
        setFile(droppedFile);
      }
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportSubmit = () => {
    if (tipo && file && onImport) {
      onImport(tipo, file);
      setFile(null);
      setTipo(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-pizarra/30 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6 flex flex-col gap-4 border border-borde">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-borde">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primario/10 flex items-center justify-center text-primario">
                <Upload className="w-4 h-4" />
              </div>
              <Dialog.Title className="text-base font-bold text-pizarra">
                Importar Datos
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-pizarra/60 hover:text-pizarra hover:bg-superficie-sec transition-colors cursor-pointer"
                aria-label="Cerrar ventana"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Description */}
          <Dialog.Description className="text-xs text-texto/80 leading-relaxed">
            Seleccione el tipo de registro a incorporar y adjunte el archivo correspondiente en formato Excel (.xlsx, .xls) o CSV para su procesamiento e incorporación al sistema.
          </Dialog.Description>

          {/* Type Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-pizarra tracking-tight">
              Tipo de Registro
            </label>
            <div className="space-y-1.5">
              {importTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = tipo === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTipo(item.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-primario/5 border-primario ring-1 ring-primario'
                        : 'bg-white border-borde hover:border-pizarra/30 hover:bg-canvas'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-md mt-0.5 shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-primario text-white'
                          : 'bg-superficie-sec text-pizarra'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-pizarra">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-pizarra/70 truncate">
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Drop Zone */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-pizarra tracking-tight">
              Archivo de Datos
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border border-dashed rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-primario bg-primario/5'
                  : file
                  ? 'border-primario/60 bg-canvas'
                  : 'border-borde hover:border-pizarra/30 hover:bg-canvas'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
              />

              {file ? (
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <div className="w-8 h-8 rounded-full bg-primario/10 flex items-center justify-center text-primario">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="text-center max-w-full px-2">
                    <p className="text-xs font-medium text-pizarra truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-pizarra/60">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] text-critico hover:underline font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar archivo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 py-1">
                  <FileUp className="w-6 h-6 text-pizarra/40" />
                  <p className="text-xs font-medium text-pizarra">
                    Arrastre el archivo aquí o haga clic para examinar
                  </p>
                  <p className="text-[11px] text-pizarra/60">
                    Formatos admitidos: .xlsx, .xls, .csv
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-borde mt-1">
            <Dialog.Close asChild>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-pizarra border border-borde rounded-lg hover:bg-superficie-sec transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </Dialog.Close>
            <button
              type="button"
              disabled={!tipo || !file}
              onClick={handleImportSubmit}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-primario rounded-lg hover:bg-primario/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              Importar Datos
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

