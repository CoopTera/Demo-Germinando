import { useState, useMemo } from 'react';

export function useTableSort(data, defaultSortConfig = null) {
  const [sortConfig, setSortConfig] = useState(defaultSortConfig);

  const sortedData = useMemo(() => {
    if (!sortConfig || !data) return data;

    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (aVal == null) aVal = '';
      if (bVal == null) bVal = '';

      // Check if sorting by a complex object property or computed urgency
      if (sortConfig.customSort) {
        return sortConfig.customSort(a, b, sortConfig.direction);
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        if (aVal.startsWith('$') && bVal.startsWith('$')) {
          aVal = parseInt(aVal.replace(/[^0-9]/g, '')) || 0;
          bVal = parseInt(bVal.replace(/[^0-9]/g, '')) || 0;
        } else if (aVal.match(/^\d{1,4}[-/]\d{1,2}[-/]\d{1,4}$/) && bVal.match(/^\d{1,4}[-/]\d{1,2}[-/]\d{1,4}$/)) {
          const parseDate = (d) => {
            if (d.includes('/')) {
              const [day, month, year] = d.split('/');
              return new Date(year, month - 1, day).getTime();
            }
            return new Date(d).getTime();
          };
          aVal = parseDate(aVal);
          bVal = parseDate(bVal);
        } else {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key, customSort = null) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      setSortConfig(null);
      return;
    }
    setSortConfig({ key, direction, customSort });
  };

  return { sortedData, sortConfig, requestSort };
}
