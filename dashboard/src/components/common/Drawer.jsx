import React from 'react';
import { Close } from '@carbon/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { drawerVariants } from '../../lib/motionTokens';

export default function Drawer({ isOpen, onClose, title, children, actions }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Subtle mobile/desktop backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] cursor-pointer"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-50 flex flex-col bg-canvas w-full sm:w-[540px] lg:w-[900px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-white shrink-0" style={{ padding: '20px 24px' }}>
              <h2 className="text-xl font-bold text-pizarra">{title}</h2>
              <div className="flex items-center" style={{ gap: '16px' }}>
                {actions && <div className="flex items-center" style={{ gap: '8px', marginRight: '8px' }}>{actions}</div>}
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#F5F6F8' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-pizarra/50 hover:text-pizarra rounded-full transition-colors cursor-pointer"
                  style={{ padding: '8px' }}
                >
                  <Close size={20} />
                </motion.button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-canvas" style={{ padding: '24px' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
