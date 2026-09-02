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

export default function GraficosPage() {
  return (
    <motion.div 
      className="flex flex-col" 
      style={{ gap: '32px' }}
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
          Análisis de evolución del programa y grafo de relaciones
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

      {/* Grafo de Vínculos Section */}
      <motion.div variants={staggerItemVariants} className="flex flex-col" style={{ gap: '16px' }}>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-pizarra">Grafo de Vínculos</h2>
          <p className="text-sm text-pizarra/60" style={{ marginTop: '2px' }}>
            Mapa de relaciones entre organizaciones, convenios, talleres y beneficiarios
          </p>
        </div>
        <div className="card-elevated rounded-2xl overflow-hidden">
          <GrafoVinculos />
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div variants={staggerItemVariants} className="flex flex-col" style={{ gap: '16px' }}>
        <h2 className="text-xl font-bold text-pizarra">Métricas y Evolución</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2" style={{ gap: 'clamp(32px, 4vw, 56px)' }}>
          <div className="h-[400px]"><EvolucionOrgs /></div>
          <div className="h-[400px]"><PresupuestoArea /></div>
          <div className="h-[400px]"><EspecialidadChart /></div>
          <div className="h-[400px]"><EstadoBeneficiariosChart /></div>
          <div className="h-[400px] xl:col-span-2"><CrecimientoBeneficiarios /></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
