// Tokens y Variantes de Animación Oficiales para Germinando
// Cumplen con las directrices de sobriedad institucional (ui-ux-pro-max)

export const springConfig = {
  soft: { type: 'spring', stiffness: 260, damping: 26 },
  gentle: { type: 'spring', stiffness: 300, damping: 24 },
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  bouncy: { type: 'spring', stiffness: 350, damping: 20 },
};

export const pageContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 24,
      mass: 0.8,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  hover: {
    y: -3,
    boxShadow: '0 8px 24px rgba(73, 73, 99, 0.12)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 320,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

export const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 28,
      stiffness: 240,
    },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] },
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
};
