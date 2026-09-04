export const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      if (typeof dateString === 'string') {
        const parts = dateString.split('-');
        if (parts.length === 3) return dateString.replace(/-/g, '/');
      }
      return dateString;
    }
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  } catch (e) {
    return dateString;
  }
};
