import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { modalVariants } from '../../lib/motionTokens';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: '24px' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 glass-overlay cursor-pointer backdrop-blur-sm"
          />
          {/* Modal Card */}
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden w-full z-10 border border-borde/80"
            style={{ maxWidth: '600px', maxHeight: '90vh' }}
          >
            <div className="flex items-center justify-between border-b border-borde bg-superficie-sec/30" style={{ padding: '20px 24px' }}>
              <h2 className="text-xl font-bold text-pizarra">{title}</h2>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: '#F5F6F8' }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose} 
                className="text-pizarra/50 hover:text-pizarra transition-colors rounded-full cursor-pointer" 
                style={{ padding: '8px' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </motion.button>
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
