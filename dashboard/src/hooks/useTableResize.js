import { useState, useCallback } from 'react';

export function useTableResize(initialWidths) {
  const [widths, setWidths] = useState(initialWidths);

  const startResize = useCallback((e, colKey) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = widths[colKey];

    const onMouseMove = (moveEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.clientX - startX));
      setWidths(prev => ({ ...prev, [colKey]: newWidth }));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [widths]);

  return { widths, startResize };
}
