import React, { useEffect, useState } from 'react';
import { animate as motionAnimate } from 'framer-motion';

/**
 * AnimatedCounter component
 * Realiza un conteo progresivo fluido desde 0 hasta el valor final al ingresar a la página.
 * Si animate=false, formatea y renderiza de inmediato sin animación.
 */
export default function AnimatedCounter({ value, duration = 1.0, prefix = '', suffix = '', animate = true }) {
  const parseNumericValue = (val) => {
    if (typeof val === 'number') return { num: val, prefix: '', suffix: '', decimals: 0 };
    if (!val) return { num: 0, prefix: '', suffix: '', decimals: 0 };
    
    const str = String(val).trim();
    const hasDollar = str.includes('$');
    const hasPercent = str.includes('%');
    
    let cleanStr = str.replace(/[$\s%]/g, '');
    let decimals = 0;
    
    if (cleanStr.includes(',') && !cleanStr.includes('.')) {
      cleanStr = cleanStr.replace(',', '.');
      decimals = cleanStr.split('.')[1]?.length || 0;
    } else if (cleanStr.includes('.') && cleanStr.split('.').length === 2 && cleanStr.split('.')[1].length <= 2) {
      decimals = cleanStr.split('.')[1]?.length || 0;
    } else {
      cleanStr = cleanStr.replace(/\./g, '').replace(/,/g, '');
    }

    const num = parseFloat(cleanStr) || 0;
    const rawPrefix = prefix || (hasDollar ? '$\u00A0' : '');
    const resolvedPrefix = rawPrefix.replace(/\$\s*/g, '$\u00A0');
    const resolvedSuffix = suffix || (hasPercent ? '%' : '');

    return { num, prefix: resolvedPrefix, suffix: resolvedSuffix, decimals };
  };

  const { num: targetNum, prefix: resolvedPrefix, suffix: resolvedSuffix, decimals } = parseNumericValue(value);

  const formatNum = (n) => {
    if (decimals > 0) {
      return n.toLocaleString('es-AR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return Math.round(n).toLocaleString('es-AR');
  };

  const [displayValue, setDisplayValue] = useState(() => {
    if (!animate) {
      return isNaN(targetNum) ? value : `${resolvedPrefix}${formatNum(targetNum)}${resolvedSuffix}`;
    }
    return isNaN(targetNum) ? value : `${resolvedPrefix}0${resolvedSuffix}`;
  });

  useEffect(() => {
    if (!animate) {
      setDisplayValue(isNaN(targetNum) ? value : `${resolvedPrefix}${formatNum(targetNum)}${resolvedSuffix}`);
      return;
    }

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const controls = motionAnimate(0, targetNum, {
      duration,
      ease: [0.16, 1, 0.3, 1], // suave desaceleración natural
      onUpdate: (latest) => {
        setDisplayValue(`${resolvedPrefix}${formatNum(latest)}${resolvedSuffix}`);
      },
    });

    return () => controls.stop();
  }, [targetNum, duration, animate, resolvedPrefix, resolvedSuffix]);

  if (isNaN(targetNum)) {
    return <span className="whitespace-nowrap">{value}</span>;
  }

  return (
    <span className="inline-block tabular-nums whitespace-nowrap">
      {displayValue}
    </span>
  );
}
