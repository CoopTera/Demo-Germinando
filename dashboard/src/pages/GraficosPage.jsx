import React from 'react';
import { motion } from 'framer-motion';
import EvolucionOrgs from '../components/charts/EvolucionOrgs';
import PresupuestoArea from '../components/charts/PresupuestoArea';
import EspecialidadChart from '../components/charts/EspecialidadChart';
import EstadoBeneficiariosChart from '../components/charts/EstadoBeneficiariosChart';
import CrecimientoBeneficiarios from '../components/charts/CrecimientoBeneficiarios';
import GrafoVinculos from '../components/graph/GrafoVinculos';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { pageContainerVariants, staggerItemVariants } from '../lib/motionTokens';
import { useData } from '../context/DataContext';

export default function GraficosPage() {
  const { organizaciones, convenios } = useData();

  const totalAsignado = convenios.reduce((acc, c) => acc + (c.monto || 0), 0);
  const ejecutadoMonto = convenios.filter(c => c.estado === 'Activo' || c.estado === 'Finalizado').reduce((acc, c) => acc + (c.monto || 0), 0);
  const porcentajeEjecutado = totalAsignado > 0 ? parseFloat(((ejecutadoMonto / totalAsignado) * 100).toFixed(1)) : 0;

  return (
    <motion.div 
      className="flex flex-col" 
      style={{ gap: '24px' }}
      variants={pageContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header section */}
      <motion.div variants={staggerItemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pizarra">
            Gráficos
          </h1>
          <p className="text-sm text-pizarra/60" style={{ marginTop: '4px' }}>
            Análisis de evolución del programa y grafo de relaciones
          </p>
        </div>

        {/* Quick stats badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white rounded-2xl text-xs font-medium card-elevated flex items-center" style={{ padding: '10px 16px' }}>
            <span className="text-pizarra/60 mr-1.5">Unidades registradas:</span>
            <span className="font-bold text-exito">{organizaciones.length} organizaciones</span>
          </div>
          <div className="bg-white rounded-2xl text-xs font-medium card-elevated flex items-center" style={{ padding: '10px 16px' }}>
            <span className="text-pizarra/60 mr-1.5">Ejecución presupuestaria:</span>
            <span className="font-bold text-primario whitespace-nowrap">
              <AnimatedCounter value={porcentajeEjecutado} suffix="%" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Grid of 6 equal half-width cards */}
      <motion.div 
        variants={staggerItemVariants} 
        className="grid grid-cols-1 lg:grid-cols-2" 
        style={{ gap: '24px' }}
      >
        <div className="h-[400px]"><GrafoVinculos /></div>
        <div className="h-[400px]"><EvolucionOrgs /></div>
        <div className="h-[400px]"><PresupuestoArea /></div>
        <div className="h-[400px]"><EspecialidadChart /></div>
        <div className="h-[400px]"><EstadoBeneficiariosChart /></div>
        <div className="h-[400px]"><CrecimientoBeneficiarios /></div>
      </motion.div>
    </motion.div>
  );
}
