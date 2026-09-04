import React, { useState, useEffect, useRef } from 'react';
import { Close } from '@carbon/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InlineDetailPanel({ isOpen, onClose, title, children, actions, onWidthChange }) {
  const [width, setWidth] = useState(() => {
    try {
      const saved = localStorage.getItem('right-panel-width');
      if (saved) {
        const val = parseInt(saved, 10);
        if (val >= 420 && val <= 850) return val;
      }
    } catch (e) {}
    return 500;
  });

  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);

  useEffect(() => {
    if (onWidthChange) onWidthChange(width);
  }, [width, onWidthChange]);

  const startResizing = (e) => {
    e.preventDefault();
    isResizingRef.current = true;
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 420 && newWidth <= 850) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        setIsResizing(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        try {
          localStorage.setItem('right-panel-width', String(width));
        } catch (e) {}
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [width]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={isResizing ? { duration: 0 } : { duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          style={{ width: `${width}px` }}
          className="fixed top-[96px] right-0 bottom-0 bg-superficie border-l-2 border-borde shadow-2xl flex flex-col z-30 select-text pointer-events-auto"
        >
          {/* Drag Resize Handle */}
          <div
            onMouseDown={startResizing}
            className={`absolute left-0 top-0 bottom-0 w-3 cursor-ew-resize z-50 transition-colors group flex items-center justify-center ${
              isResizing ? 'bg-primario/40' : 'hover:bg-primario/20'
            }`}
            title="Arrastrar para redimensionar panel"
          >
            <div className="w-0.5 h-12 rounded-full bg-pizarra/20 group-hover:bg-primario transition-colors" />
          </div>

          {/* Header */}
          <div className="shrink-0 border-b border-borde bg-superficie" style={{ padding: '20px 24px 20px 28px' }}>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-pizarra leading-snug flex-1 min-w-0 break-words" title={title}>
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-pizarra/40 hover:text-pizarra hover:bg-canvas p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Cerrar panel"
              >
                <Close size={20} />
              </button>
            </div>

            {actions && (
              <div className="flex items-center gap-2.5" style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--color-borde)' }}>
                {actions}
              </div>
            )}
          </div>

          {/* Scrollable Body — data-lenis-prevent stops Lenis from hijacking wheel events */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto bg-canvas"
            style={{ padding: '24px 24px 32px 28px', overscrollBehavior: 'contain' }}
          >
            {children}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
