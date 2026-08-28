import { Users, FileText, Buildings, Hammer, ArrowRight, Clock, Tag } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KPICard from '../components/dashboard/KPICard';
import AlertPanel from '../components/dashboard/AlertPanel';
import TopOrgs from '../components/dashboard/TopOrgs';
import { kpiData, oportunidades } from '../data/mockData';
import EvolucionChart from '../components/dashboard/EvolucionChart';
import PresupuestoChart from '../components/dashboard/PresupuestoChart';
import ActividadFeed from '../components/dashboard/ActividadFeed';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const TAG_COLORS = {
  'licitacion': { bg: '#FEF3C7', text: '#92400E' },
  'fondo': { bg: '#D1FAE5', text: '#065F46' },
  'capacitacion': { bg: '#EDE9FE', text: '#5B21B6' },
  'compra': { bg: '#FEE2E2', text: '#991B1B' },
  default: { bg: '#E0E7FF', text: '#3730A3' },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const now = new Date();
  const weekday = now.toLocaleDateString('es-AR', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('es-AR', { month: 'long' });
  const year = now.getFullYear();
  const formattedDate = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`;

  return (
    <motion.div 
      className="flex flex-col"
      style={{ gap: 'clamp(32px, 4vw, 48px)' }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <div>
          <h1 className="text-3xl font-bold text-pizarra">
            Panel Ejecutivo
          </h1>
          <p className="text-[15px] text-pizarra/80 mt-2 font-medium">
            {formattedDate}
          </p>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
        <KPICard
          titulo="Personas Beneficiarias"
          valor={kpiData.beneficiarios.total.toLocaleString('es-AR')}
          variacion={kpiData.beneficiarios.variacion}
          periodo={kpiData.beneficiarios.periodo}
          index={0}
        />
        <KPICard
          titulo="Convenios Activos"
          valor={kpiData.convenios.total}
          variacion={kpiData.convenios.variacion}
          periodo={kpiData.convenios.periodo}
          index={1}
        />
        <KPICard
          titulo="Unidades Productivas"
          valor={kpiData.unidadesProductivas.total}
          variacion={kpiData.unidadesProductivas.variacion}
          periodo={kpiData.unidadesProductivas.periodo}
          index={2}
        />
        <KPICard
          titulo="Presupuesto Asignado"
          valor="$ 15.610.000"
          variacion={null}
          periodo="Ejercicio 2026"
          presupuesto={{ porcentaje: 74 }}
          index={3}
        />
      </motion.div>

      {/* Oportunidades Destacadas */}
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-xl border border-borde shadow-sm" style={{ padding: '24px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <div>
              <h2 className="text-base font-bold text-pizarra">Oportunidades Destacadas</h2>
              <p className="text-xs text-pizarra/50 mt-0.5">{oportunidades.length} oportunidades disponibles actualmente</p>
            </div>
            <button
              onClick={() => navigate('/oportunidades')}
              className="flex items-center text-xs font-bold text-primario hover:underline cursor-pointer"
              style={{ gap: '4px' }}
            >
              Ver todas <ArrowRight weight="bold" style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {oportunidades.slice(0, 3).map((op) => {
              const tipoKey = op.categoria?.toLowerCase() || 'default';
              const tagColor = TAG_COLORS[tipoKey] || TAG_COLORS.default;
              return (
                <div
                  key={op.id}
                  onClick={() => navigate('/oportunidades')}
                  className="flex items-center justify-between bg-canvas hover:bg-borde/40 rounded-lg transition-colors cursor-pointer"
                  style={{ padding: '14px 16px', gap: '16px' }}
                >
                  <div className="flex items-center flex-1 min-w-0" style={{ gap: '12px' }}>
                    <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: '36px', height: '36px', backgroundColor: tagColor.bg }}>
                      <Tag weight="duotone" style={{ width: '18px', height: '18px', color: tagColor.text }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-texto truncate">{op.titulo}</p>
                      <p className="text-xs text-pizarra/50 truncate">{op.organizador}</p>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0" style={{ gap: '6px' }}>
                    <Clock weight="duotone" style={{ width: '13px', height: '13px', color: '#9ca3af' }} />
                    <span className="text-xs font-medium text-pizarra/50 whitespace-nowrap">{op.fecha}</span>
                    <ArrowRight weight="bold" style={{ width: '14px', height: '14px', color: '#9ca3af', marginLeft: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Row 2: Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="lg:col-span-2">
          <EvolucionChart />
        </div>
        <div className="lg:col-span-1">
          <PresupuestoChart />
        </div>
      </motion.div>

      {/* Row 3: Feed + Top 5 */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '56px' }}>
        <div>
          <ActividadFeed />
        </div>
        <div>
          <TopOrgs />
        </div>
      </motion.div>
    </motion.div>
  );
}


