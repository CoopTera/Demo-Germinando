import React from 'react';
import { motion } from 'framer-motion';
import EvolucionOrgs from '../components/charts/EvolucionOrgs';
import PresupuestoArea from '../components/charts/PresupuestoArea';
import EspecialidadChart from '../components/charts/EspecialidadChart';
import EstadoBeneficiariosChart from '../components/charts/EstadoBeneficiariosChart';
import CrecimientoBeneficiarios from '../components/charts/CrecimientoBeneficiarios';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { pageContainerVariants, staggerItemVariants } from '../lib/motionTokens';

export default function GraficosPage() {
  return (
    <motion.div 
      className="flex flex-col" 
      style={{ gap: '24px' }}
      variants={pageContainerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page Title */}
      <motion.div variants={staggerItemVariants}>
        <h1 className="text-2xl font-bold text-pizarra">
          Gráficos
        </h1>
        <p className="text-sm text-pizarra/60" style={{ marginTop: '4px' }}>
          Análisis de evolución del programa
        </p>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={staggerItemVariants} className="flex flex-wrap items-center" style={{ gap: '16px' }}>
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl text-sm card-elevated flex items-center" style={{ padding: '12px 20px' }}>
          <span className="text-pizarra/60 mr-1.5">Crecimiento interanual:</span>
          <span className="font-bold text-exito">+50% organizaciones</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl text-sm card-elevated flex items-center" style={{ padding: '12px 20px' }}>
          <span className="text-pizarra/60 mr-1.5">Ejecución presupuestaria:</span>
          <span className="font-bold text-primario whitespace-nowrap">
            <AnimatedCounter value={95.7} suffix="%" />
          </span>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div variants={staggerItemVariants} className="grid grid-cols-1 xl:grid-cols-2" style={{ gap: '24px' }}>
        <EvolucionOrgs />
        <PresupuestoArea />
        <EspecialidadChart />
        <EstadoBeneficiariosChart />
        <CrecimientoBeneficiarios />
      </motion.div>
    </motion.div>
  );
}
