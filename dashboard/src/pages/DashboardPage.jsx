import { Users, FileText, Building2, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import KPICard from '../components/dashboard/KPICard';
import AlertPanel from '../components/dashboard/AlertPanel';
import TopOrgs from '../components/dashboard/TopOrgs';
import { kpiData } from '../data/mockData';
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

export default function DashboardPage() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
        <KPICard
          titulo="Personas Beneficiarias"
          valor={kpiData.beneficiarios.total.toLocaleString('es-AR')}
          variacion={kpiData.beneficiarios.variacion}
          periodo={kpiData.beneficiarios.periodo}
          icono={Users}
          index={0}
        />
        <KPICard
          titulo="Convenios Activos"
          valor={kpiData.convenios.total}
          variacion={kpiData.convenios.variacion}
          periodo={kpiData.convenios.periodo}
          icono={FileText}
          index={1}
        />
        <KPICard
          titulo="Unidades Productivas"
          valor={kpiData.unidadesProductivas.total}
          variacion={kpiData.unidadesProductivas.variacion}
          periodo={kpiData.unidadesProductivas.periodo}
          icono={Building2}
          index={2}
        />
        <KPICard
          titulo="Talleres Activos"
          valor={kpiData.talleres.total}
          variacion={kpiData.talleres.variacion}
          periodo={kpiData.talleres.periodo}
          icono={Hammer}
          index={3}
        />
      </div>

      {/* Row 2: Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="lg:col-span-2">
          <EvolucionChart />
        </div>
        <div className="lg:col-span-1">
          <PresupuestoChart />
        </div>
      </motion.div>

      {/* Row 3: Feed + Top 5 + Alerts */}
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
