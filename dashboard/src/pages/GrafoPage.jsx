import React from 'react';
import { motion } from 'framer-motion';
import GrafoVinculos from '../components/graph/GrafoVinculos';
import { pageContainerVariants } from '../lib/motionTokens';

export default function GrafoPage() {
  return (
    <motion.div 
      variants={pageContainerVariants}
      initial="hidden"
      animate="show"
      className="w-full h-full flex flex-col flex-1" 
      style={{ minHeight: 'calc(100vh - 100px)' }}
    >
      <div className="flex-1 w-full flex flex-col">
        <GrafoVinculos />
      </div>
    </motion.div>
  );
}
