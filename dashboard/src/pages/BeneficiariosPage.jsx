import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Plus, AlertTriangle, Search, Filter } from 'lucide-react';
import BeneficiariosTable from '../components/tables/BeneficiariosTable';
import { beneficiariosData as initialData } from '../data/mockData';

const FILTROS_ESTADO = ['Todos', 'Activos', 'Sin seguimiento'];

export default function BeneficiariosPage() {
  const [data] = useState(initialData);
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const { importResult } = useOutletContext();

  const conAlerta = data.filter((b) => b.alerta).length;

  const filteredData = data.filter((b) => {
    const matchFiltro =
      filtro === 'Todos' ||
      (filtro === 'Activos' && !b.alerta) ||
      (filtro === 'Sin seguimiento' && b.alerta);
    const matchBusqueda =
      !busqueda ||
      b.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      b.dni.includes(busqueda);
    return matchFiltro && matchBusqueda;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between animate-fade-in-up delay-0">
        <div>
          <h1 className="text-2xl font-bold text-pizarra flex items-center gap-2">
            <Users className="w-6 h-6" />
            Beneficiarios
          </h1>
          <p className="text-sm text-pizarra/50 mt-1">
            Seguimiento de personas beneficiarias del programa
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primario text-white px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          Nuevo Beneficiario
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-4 flex-wrap animate-fade-in-up delay-1">
        <div className="bg-white rounded-lg px-4 py-2.5 border border-borde text-sm card-elevated">
          <span className="text-pizarra/50">Total:</span>{' '}
          <span className="font-bold text-pizarra">{data.length} personas</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2.5 border border-borde text-sm card-elevated">
          <span className="text-pizarra/50">Becas activas:</span>{' '}
          <span className="font-bold text-primario">
            {data.filter((b) => !b.alerta).length}
          </span>
        </div>
        {conAlerta > 0 && (
          <div className="bg-naranja/10 rounded-lg px-4 py-2.5 border border-naranja/30 text-sm flex items-center gap-2 card-elevated">
            <AlertTriangle className="w-4 h-4 text-naranja animate-pulse-soft" />
            <span className="text-naranja font-bold">
              {conAlerta} sin seguimiento
            </span>
          </div>
        )}
      </div>

      {/* Import result notice */}
      {importResult && importResult.tipo === 'Padrón de Beneficiarios' && (
        <div className="bg-exito/10 border border-exito/30 rounded-lg p-4 text-sm text-exito flex items-center gap-2 animate-scale-in">
          ✅ Se importaron {importResult.totalRows} registros del padrón de beneficiarios.
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4 animate-fade-in-up delay-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-pizarra/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-white text-texto placeholder:text-pizarra/40 text-sm rounded-lg pl-9 pr-4 py-2 border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 focus:border-primario/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-pizarra/40 mr-1" />
          {FILTROS_ESTADO.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filtro === f
                  ? f === 'Sin seguimiento'
                    ? 'bg-naranja text-white shadow-sm'
                    : 'bg-primario text-white shadow-sm'
                  : 'bg-white text-pizarra/70 border border-borde hover:border-primario/30 hover:text-primario'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="animate-fade-in-up delay-3">
        <BeneficiariosTable data={filteredData} />
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-xs text-pizarra/40">
            Mostrando <span className="font-semibold text-pizarra/60">{filteredData.length}</span> de{' '}
            <span className="font-semibold text-pizarra/60">{data.length}</span> beneficiarios
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primario text-white cursor-pointer">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-pizarra/50 hover:bg-superficie-sec cursor-pointer">2</button>
          </div>
        </div>
      </div>
    </div>
  );
}
