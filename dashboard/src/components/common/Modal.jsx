import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: '24px' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 glass-overlay cursor-pointer"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden w-full"
            style={{ maxWidth: '600px', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between border-b border-borde bg-superficie-sec/30" style={{ padding: '20px 24px' }}>
              <h2 className="text-xl font-bold text-pizarra">{title}</h2>
              <button onClick={onClose} className="text-pizarra/50 hover:text-pizarra transition-colors rounded-full hover:bg-canvas" style={{ padding: '8px' }}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div className="overflow-y-auto bg-white" style={{ padding: '24px' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

