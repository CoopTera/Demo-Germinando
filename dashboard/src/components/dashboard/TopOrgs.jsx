import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { topOrganizaciones } from '../../data/mockData';
import { staggerContainerVariants, staggerItemVariants } from '../../lib/motionTokens';

export default function TopOrgs({ organizaciones = topOrganizaciones, animate = true }) {
  const navigate = useNavigate();
  const list = organizaciones || topOrganizaciones;
  const maxBeneficiarios = Math.max(...list.map((o) => o.beneficiarios || 0), 1);

  return (
    <motion.div 
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={animate ? { duration: 0.35, delay: 0.15 } : { duration: 0 }}
      className="bg-white rounded-md border border-borde h-full flex flex-col card-elevated" 
      style={{ padding: '24px' }}
    >
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 className="font-semibold text-pizarra text-base">Top 5 Organizaciones</h2>
      </div>

      {/* List */}
      <motion.div 
        variants={animate ? staggerContainerVariants : undefined}
        initial={animate ? 'hidden' : false}
        animate="show"
        className="flex flex-col overflow-y-auto flex-1"
      >
        {list.map((org, index) => (
          <motion.div
            key={org.id || index}
            variants={animate ? staggerItemVariants : undefined}
            whileHover={{ x: 3, backgroundColor: 'rgba(234, 233, 238, 0.4)' }}
            onClick={() => navigate('/organizaciones', { state: { openModalId: org.id } })}
            className="flex items-center justify-between border-b border-borde last:border-0 rounded-md transition-colors duration-150 cursor-pointer"
            style={{ padding: '14px 8px', gap: '20px' }}
          >
            {/* Left side: Rank + Organization Name */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="rounded-md bg-superficie-sec text-pizarra font-bold text-xs flex items-center justify-center shrink-0 border border-borde" style={{ width: '28px', height: '28px' }}>
                {index + 1}
              </div>
              <span className="font-medium text-texto text-sm truncate group-hover:text-primario">
                {org.nombre}
              </span>
            </div>

            {/* Right side: Stats & Mini Progress Bar */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="flex items-center gap-3 text-xs text-pizarra/70 font-medium">
                <span>{org.talleres} talleres</span>
                <span className="font-semibold text-pizarra">{org.beneficiarios} personas</span>
              </div>
              {/* Visual bar */}
              <div className="w-24 h-2 rounded-full bg-superficie-sec overflow-hidden mt-0.5">
                <motion.div 
                  initial={animate ? { width: 0 } : false}
                  animate={{ width: `${(org.beneficiarios / maxBeneficiarios) * 100}%` }}
                  transition={animate ? { duration: 0.8, delay: index * 0.1 + 0.2, ease: [0.25, 1, 0.5, 1] } : { duration: 0 }}
                  className="h-full bg-primario rounded-full" 
                  style={{ width: !animate ? `${(org.beneficiarios / maxBeneficiarios) * 100}%` : undefined }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-auto" style={{ paddingTop: '16px' }}>
        <button 
          type="button" 
          onClick={() => navigate('/organizaciones')}
          className="text-xs text-primario font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primario rounded-sm cursor-pointer"
        >
          Ver ranking completo
        </button>
      </div>
    </motion.div>
  );
}
