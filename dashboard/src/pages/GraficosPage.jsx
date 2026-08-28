import { ChartBar, TrendUp } from '@phosphor-icons/react';
import EvolucionOrgs from '../components/charts/EvolucionOrgs';
import PresupuestoArea from '../components/charts/PresupuestoArea';
import EspecialidadChart from '../components/charts/EspecialidadChart';
import EstadoBeneficiariosChart from '../components/charts/EstadoBeneficiariosChart';
import CrecimientoBeneficiarios from '../components/charts/CrecimientoBeneficiarios';

export default function GraficosPage() {
  return (
    <div className="flex flex-col animate-fade-in-up" style={{ gap: '24px' }}>
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-pizarra flex items-center" style={{ gap: '8px' }}>
          <ChartBar style={{ width: '24px', height: '24px' }} />
          Gráficos
        </h1>
        <p className="text-sm text-pizarra/50" style={{ marginTop: '4px' }}>
          Análisis de evolución del programa
        </p>
      </div>

      {/* Quick stats */}
      <div className="flex flex-wrap items-center" style={{ gap: '16px' }}>
        <div className="bg-white rounded-lg border border-borde text-sm card-elevated flex items-center" style={{ padding: '10px 16px', gap: '8px' }}>
          <TrendUp className="text-exito" style={{ width: '16px', height: '16px' }} />
          <span className="text-pizarra/50">Crecimiento interanual:</span>{' '}
          <span className="font-bold text-exito">+50% organizaciones</span>
        </div>
        <div className="bg-white rounded-lg border border-borde text-sm card-elevated flex items-center" style={{ padding: '10px 16px', gap: '8px' }}>
          <TrendUp className="text-primario" style={{ width: '16px', height: '16px' }} />
          <span className="text-pizarra/50">Ejecución presupuestaria:</span>{' '}
          <span className="font-bold text-primario">95.7%</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2" style={{ gap: '24px' }}>
        <EvolucionOrgs />
        <PresupuestoArea />
        <EspecialidadChart />
        <EstadoBeneficiariosChart />
        <CrecimientoBeneficiarios />
      </div>
    </div>
  );
}


