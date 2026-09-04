import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Catalog } from '@carbon/icons-react';
import KPICard from '../components/dashboard/KPICard';
import TopOrgs from '../components/dashboard/TopOrgs';
import EvolucionChart from '../components/dashboard/EvolucionChart';
import PresupuestoChart from '../components/dashboard/PresupuestoChart';
import ActividadFeed from '../components/dashboard/ActividadFeed';
import { pageContainerVariants, staggerItemVariants } from '../lib/motionTokens';
import { isDashboardFirstLoad, markDashboardAsAnimated } from '../lib/sessionAnimationState';
import { useData } from '../context/DataContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { organizaciones, beneficiarios, convenios, talleres, oportunidades } = useData();
  const [isFirstLoad] = useState(() => isDashboardFirstLoad());

  useEffect(() => {
    markDashboardAsAnimated();
  }, []);

  const now = new Date();
  const weekday = now.toLocaleDateString('es-AR', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('es-AR', { month: 'long' });

  // Cálculos dinámicos exactos para consistencia absoluta entre KPI Card y Gráfico
  const totalPresupuesto = convenios.reduce((acc, c) => acc + (c.monto || 0), 0);
  const ejecutadoMonto = convenios.filter(c => c.estado === 'Activo' || c.estado === 'Finalizado').reduce((acc, c) => acc + (c.monto || 0), 0);
  const porcentajeEjecutado = totalPresupuesto > 0 ? Math.round((ejecutadoMonto / totalPresupuesto) * 100) : 0;

  const formattedPresupuesto = totalPresupuesto > 0 ? `$ ${totalPresupuesto.toLocaleString('es-AR')}` : '$ 0';

  const kpiData = {
    beneficiarios: { total: beneficiarios.length, variacion: 12.3, periodo: 'vs. mes anterior' },
    convenios: { total: convenios.length, variacion: 5.9, periodo: 'vs. mes anterior' },
    unidadesProductivas: { total: organizaciones.length, variacion: -2.1, periodo: 'vs. mes anterior' },
    talleres: { total: talleres.length, variacion: 8.4, periodo: 'vs. mes anterior' }
  };
  const year = now.getFullYear();
  const formattedDate = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`;

  return (
    <motion.div 
      className="flex flex-col" 
      style={{ gap: 'clamp(32px, 4vw, 48px)' }}
      variants={pageContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Section */}
      <motion.div variants={staggerItemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pizarra">
            Panel Ejecutivo
          </h1>
          <p className="text-[15px] text-pizarra/80 mt-2 font-medium">
            {formattedDate}
          </p>
        </div>

        <motion.button
          type="button"
          onClick={() => navigate('/oportunidades')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-white rounded-2xl transition-all cursor-pointer flex items-center justify-center self-start sm:self-auto card-elevated"
          style={{ width: '52px', height: '52px' }}
          title="Ver Oportunidades"
        >
          <Catalog size={24} className="text-pizarra group-hover:text-primario transition-colors" />
          {oportunidades && oportunidades.length > 0 && (
            <span 
              className="absolute bg-primario text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
              style={{ minWidth: '26px', height: '26px', padding: '0 6px', top: '-8px', right: '-8px' }}
            >
              {oportunidades.length}
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* KPI Cards Row */}
      <motion.div variants={staggerItemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
        <KPICard
          titulo="Personas Beneficiarias"
          valor={kpiData.beneficiarios.total}
          variacion={kpiData.beneficiarios.variacion}
          periodo={kpiData.beneficiarios.periodo}
          index={0}
          animate={isFirstLoad}
        />
        <KPICard
          titulo="Convenios Activos"
          valor={kpiData.convenios.total}
          variacion={kpiData.convenios.variacion}
          periodo={kpiData.convenios.periodo}
          index={1}
          animate={isFirstLoad}
        />
        <KPICard
          titulo="Unidades Productivas"
          valor={kpiData.unidadesProductivas.total}
          variacion={kpiData.unidadesProductivas.variacion}
          periodo={kpiData.unidadesProductivas.periodo}
          index={2}
          animate={isFirstLoad}
        />
        <KPICard
          titulo="Presupuesto Asignado"
          valor={formattedPresupuesto}
          variacion={null}
          periodo="Ejercicio 2026"
          presupuesto={{ porcentaje: porcentajeEjecutado }}
          index={3}
          animate={isFirstLoad}
        />
      </motion.div>

      {/* Row 2: Charts */}
      <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-3 h-[400px]" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="lg:col-span-2 h-[400px]">
          <EvolucionChart animate={isFirstLoad} />
        </div>
        <div className="lg:col-span-1 h-[400px]">
          <PresupuestoChart animate={isFirstLoad} />
        </div>
      </motion.div>

      {/* Row 3: Feed + Top 5 */}
      <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-2 h-[420px]" style={{ gap: '56px' }}>
        <div className="h-[420px]">
          <ActividadFeed animate={isFirstLoad} />
        </div>
        <motion.div variants={staggerItemVariants} className="lg:col-span-1 h-full">
          <TopOrgs animate={!isFirstLoad} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
