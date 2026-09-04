/**
 * Utilidades geográficas y coordenadas de referencia para la provincia de Santa Fe.
 */

export const SANTA_FE_CENTER = {
  lat: -31.6333,
  lng: -60.7000
};

export const SANTA_FE_CITIES = {
  'Rosario, Santa Fe': { lat: -32.9468, lng: -60.6393 },
  'Rosario': { lat: -32.9468, lng: -60.6393 },
  'Santa Fe Capital': { lat: -31.6333, lng: -60.7000 },
  'Santa Fe': { lat: -31.6333, lng: -60.7000 },
  'Rafaela, Santa Fe': { lat: -31.2526, lng: -61.4867 },
  'Rafaela': { lat: -31.2526, lng: -61.4867 },
  'Reconquista, Santa Fe': { lat: -29.1412, lng: -59.8296 },
  'Reconquista': { lat: -29.1412, lng: -59.8296 },
  'Venado Tuerto, Santa Fe': { lat: -33.7456, lng: -61.9688 },
  'Venado Tuerto': { lat: -33.7456, lng: -61.9688 },
  'Santo Tomé, Santa Fe': { lat: -31.6628, lng: -60.7644 },
  'Santo Tomé': { lat: -31.6628, lng: -60.7644 },
  'Sunchales, Santa Fe': { lat: -30.9442, lng: -61.5619 },
  'Sunchales': { lat: -30.9442, lng: -61.5619 },
  'El Trébol, Santa Fe': { lat: -32.2023, lng: -61.7011 },
  'El Trébol': { lat: -32.2023, lng: -61.7011 },
  'Cañada de Gómez, Santa Fe': { lat: -32.8167, lng: -61.3833 },
  'Cañada de Gómez': { lat: -32.8167, lng: -61.3833 },
  'Casilda, Santa Fe': { lat: -33.0442, lng: -61.1681 },
  'Casilda': { lat: -33.0442, lng: -61.1681 }
};

/**
 * Genera un pequeño desplazamiento determinista basado en un id o texto
 * para evitar que entidades en la misma ciudad se solapen en el mismo punto.
 */
function getDeterministicOffset(key = '') {
  let hash = 0;
  const str = String(key);
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const factorLat = ((Math.abs(hash) % 100) - 50) / 4000;
  const factorLng = ((Math.abs(hash >> 3) % 100) - 50) / 4000;
  return { latOffset: factorLat, lngOffset: factorLng };
}

/**
 * Obtiene o resuelve las coordenadas de una entidad (organización o beneficiario).
 */
export function getEntityCoordinates(entity) {
  if (!entity) return null;

  if (
    entity.coordenadas &&
    typeof entity.coordenadas.lat === 'number' &&
    typeof entity.coordenadas.lng === 'number' &&
    !isNaN(entity.coordenadas.lat) &&
    !isNaN(entity.coordenadas.lng)
  ) {
    return {
      lat: entity.coordenadas.lat,
      lng: entity.coordenadas.lng
    };
  }

  const loc = (entity.localizacion || '').trim();
  const baseCoords = SANTA_FE_CITIES[loc] || SANTA_FE_CENTER;
  const offset = getDeterministicOffset(entity.id || entity.dni || entity.nombre || '1');

  return {
    lat: baseCoords.lat + offset.latOffset,
    lng: baseCoords.lng + offset.lngOffset
  };
}

/**
 * Enlace para abrir la ubicación en Google Maps
 */
export function getGoogleMapsUrl(lat, lng, label = '') {
  if (label) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}+${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
