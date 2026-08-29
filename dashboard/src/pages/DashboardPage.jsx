import React, { useState, useEffect } from 'react';
import { BookmarkSimple } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KPICard from '../components/dashboard/KPICard';
import TopOrgs from '../components/dashboard/TopOrgs';
import { kpiData, oportunidades } from '../data/mockData';
import EvolucionChart from '../components/dashboard/EvolucionChart';
import PresupuestoChart from '../components/dashboard/PresupuestoChart';
import ActividadFeed from '../components/dashboard/ActividadFeed';
import { pageContainerVariants, staggerItemVariants } from '../lib/motionTokens';
import { isDashboardFirstLoad, markDashboardAsAnimated } from '../lib/sessionAnimationState';

export default function DashboardPage() {
  const navigate = useNavigate();
  // Determina si es la primera carga para los contadores numéricos
  const [isFirstLoad] = useState(() => isDashboardFirstLoad());

  useEffect(() => {
    markDashboardAsAnimated();
  }, []);

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
      variants={pageContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Section with Opportunities Indicator */}
      <motion.div variants={staggerItemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pizarra">
            Panel Ejecutivo
          </h1>
          <p className="text-[15px] text-pizarra/80 mt-2 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Indicador de Oportunidades */}
        <motion.button
          type="button"
          onClick={() => navigate('/oportunidades')}
          whileHover={{ y: -3, boxShadow: '0 6px 16px rgba(60, 58, 229, 0.12)' }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center bg-white border border-borde hover:border-primario/40 shadow-sm rounded-xl transition-all cursor-pointer text-left self-start sm:self-auto card-elevated"
          style={{ padding: '10px 18px', gap: '14px' }}
          title="Ver pestaña de Oportunidades"
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primario group-hover:text-white"
            style={{ backgroundColor: 'rgba(60, 58, 229, 0.08)', color: '#3C3AE5' }}
          >
            <BookmarkSimple weight="duotone" style={{ width: '22px', height: '22px' }} />
          </div>
          <div className="flex items-baseline" style={{ gap: '8px' }}>
            <span className="text-2xl font-bold text-texto group-hover:text-primario transition-colors leading-none">
              {oportunidades.length}
            </span>
            <span className="text-xs font-bold text-pizarra uppercase tracking-wider">
              Oportunidades
            </span>
          </div>
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
          valor="$ 15.610.000"
          variacion={null}
          periodo="Ejercicio 2026"
          presupuesto={{ porcentaje: 74 }}
          index={3}
          animate={isFirstLoad}
        />
      </motion.div>

      {/* Row 2: Charts */}
      <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="lg:col-span-2">
          <EvolucionChart animate={isFirstLoad} />
        </div>
        <div className="lg:col-span-1">
          <PresupuestoChart animate={isFirstLoad} />
        </div>
      </motion.div>

      {/* Row 3: Feed + Top 5 */}
      <motion.div variants={staggerItemVariants} className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '56px' }}>
        <div>
          <ActividadFeed animate={isFirstLoad} />
        </div>
        <div>
          <TopOrgs animate={isFirstLoad} />
        </div>
      </motion.div>
    </motion.div>
  );
}
