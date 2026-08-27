import { BarChart3, TrendingUp } from 'lucide-react';
import EvolucionOrgs from '../components/charts/EvolucionOrgs';
import PresupuestoArea from '../components/charts/PresupuestoArea';

export default function GraficosPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="animate-fade-in-up delay-0">
        <h1 className="text-2xl font-bold text-pizarra flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Gráficos
        </h1>
        <p className="text-sm text-pizarra/50 mt-1">
          Análisis de evolución del programa
        </p>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4 animate-fade-in-up delay-1">
        <div className="bg-white rounded-lg px-4 py-2.5 border border-borde text-sm card-elevated flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-exito" />
          <span className="text-pizarra/50">Crecimiento interanual:</span>{' '}
          <span className="font-bold text-exito">+50% organizaciones</span>
        </div>
        <div className="bg-white rounded-lg px-4 py-2.5 border border-borde text-sm card-elevated flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primario" />
          <span className="text-pizarra/50">Ejecución presupuestaria:</span>{' '}
          <span className="font-bold text-primario">95.7%</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="animate-fade-in-up delay-2">
          <EvolucionOrgs />
        </div>
        <div className="animate-fade-in-up delay-3">
          <PresupuestoArea />
        </div>
      </div>
    </div>
  );
}
