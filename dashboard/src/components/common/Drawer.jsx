import React, { useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Drawer({ isOpen, onClose, title, children, actions }) {
  useEffect(() => {
    // Removed overflow hidden so user can scroll the background
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 z-50 flex flex-col bg-canvas shadow-2xl w-full sm:w-[500px] lg:w-[900px] border-l border-borde"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-borde bg-white shrink-0" style={{ padding: '24px' }}>
            <h2 className="text-xl font-bold text-pizarra">{title}</h2>
            <div className="flex items-center" style={{ gap: '16px' }}>
              {actions && <div className="flex items-center" style={{ gap: '8px', marginRight: '16px' }}>{actions}</div>}
              <button
                onClick={onClose}
                className="text-pizarra/50 hover:text-pizarra hover:bg-canvas rounded-full transition-colors cursor-pointer"
                style={{ padding: '8px' }}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-canvas" style={{ padding: '24px' }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

