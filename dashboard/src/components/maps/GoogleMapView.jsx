import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Location, 
  Search, 
  Maximize, 
  Minimize, 
  ChevronLeft, 
  ChevronRight, 
  Renew,
  Close,
  Settings
} from '@carbon/icons-react';
import { getEntityCoordinates, getGoogleMapsUrl, SANTA_FE_CENTER } from '../../utils/geoUtils';

/**
 * Script loader global para Google Maps
 */
let googleMapsPromise = null;

function loadGoogleMapsScript(apiKey = '') {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not defined'));
  
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // Interceptar fallos de autenticación para que Google Maps no lance alert()
  window.gm_authFailure = () => {
    console.warn('Google Maps inicializado en modo evaluación/desarrollo.');
  };

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('google-maps-js-sdk');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google.maps));
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-js-sdk';
    const keyParam = apiKey ? `key=${encodeURIComponent(apiKey)}&` : '';
    script.src = `https://maps.googleapis.com/maps/api/js?${keyParam}libraries=places,geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error('Google Maps SDK cargado pero no disponible'));
      }
    };

    script.onerror = (err) => {
      googleMapsPromise = null;
      reject(err);
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

/**
 * Generador de SVG Data URL para pines vectoriales de Google Maps
 */
function createPinIcon(color, isActive = false) {
  if (!window.google?.maps) return null;

  if (isActive) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 62" width="48" height="62">
        <defs>
          <filter id="shadow-active" x="-35%" y="-15%" width="170%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" flood-color="#000" flood-opacity="0.48"/>
          </filter>
        </defs>
        <!-- Concentric pulse halo -->
        <circle cx="24" cy="22" r="21" fill="${color}" opacity="0.25"/>
        <circle cx="24" cy="22" r="16" fill="#ffffff" opacity="0.4"/>
        <!-- Main pin body -->
        <path d="M24 4 C14.5 4 7 12 7 21.5 C7 36 24 59 24 59 C24 59 41 36 41 21.5 C41 12 33.5 4 24 4 Z" fill="${color}" filter="url(#shadow-active)"/>
        <!-- White concentric circle -->
        <circle cx="24" cy="21.5" r="11" fill="#ffffff"/>
        <!-- Center core in pin color -->
        <circle cx="24" cy="21.5" r="7.5" fill="${color}"/>
        <circle cx="24" cy="21.5" r="3" fill="#ffffff"/>
      </svg>
    `;
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new window.google.maps.Size(48, 62),
      anchor: new window.google.maps.Point(24, 59)
    };
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="36" height="48">
      <defs>
        <filter id="shadow" x="-25%" y="-15%" width="150%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#000" flood-opacity="0.32"/>
        </filter>
      </defs>
      <path d="M18 2 C9.16 2 2 9.16 2 18 C2 30.5 18 46 18 46 C18 46 34 30.5 34 18 C34 9.16 26.84 2 18 2 Z" fill="${color}" filter="url(#shadow)"/>
      <circle cx="18" cy="18" r="10.5" fill="#ffffff"/>
      <circle cx="18" cy="18" r="7.5" fill="${color}"/>
      <circle cx="18" cy="18" r="3" fill="#ffffff"/>
    </svg>
  `;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(36, 48),
    anchor: new window.google.maps.Point(18, 46)
  };
}

export default function GoogleMapView({
  items = [],
  entityType = 'organizacion', // 'organizacion' | 'beneficiario'
  onItemClick,
  selectedItem = null
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const containerRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [activeEntity, setActiveEntity] = useState(selectedItem);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSidebarOpenRef = useRef(isSidebarOpen);
  isSidebarOpenRef.current = isSidebarOpen;
  const wasSidebarOpenBeforeSelectionRef = useRef(false);
  const prevSelectedItemRef = useRef(selectedItem);
  const [localSearch, setLocalSearch] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Configuración de API Key
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('google_maps_api_key') || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  });
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const isOrg = entityType === 'organizacion';

  // Función para determinar el color del pin según la entidad y si está seleccionado
  const getPinColor = useCallback((item, isSelected = false) => {
    if (isSelected) {
      // Color destacado cuando el punto está seleccionado:
      // Organizaciones: Naranja vibrante institucional (#FF7402)
      // Beneficiarios: Azul cobalto de alta visibilidad (#2563EB)
      return isOrg ? '#FF7402' : '#2563EB';
    }
    if (entityType === 'organizacion') {
      return '#6B1330'; // Bordó oficial Germinando
    }
    // Beneficiarios
    if (item.alerta || item.estado === 'Sin seguimiento') {
      return '#FF7402'; // Naranja alerta
    }
    if (item.estado === 'Suspendido') {
      return '#E42153'; // Rubí crítico
    }
    return '#22C55E'; // Verde activo
  }, [entityType, isOrg]);

  // Actualizar íconos de todos los marcadores destacando el seleccionado
  const updateMarkerIcons = useCallback((selected) => {
    if (!markersRef.current || markersRef.current.length === 0) return;

    markersRef.current.forEach(({ marker, item }) => {
      const isThisSelected = !!selected && (
        String(item.id) === String(selected.id) || 
        String(item.dni) === String(selected.dni)
      );

      const color = getPinColor(item, isThisSelected);
      const icon = createPinIcon(color, isThisSelected);
      marker.setIcon(icon);
      marker.setZIndex(isThisSelected ? 9999 : 1);
    });
  }, [getPinColor]);

  // Silenciar alertas de Google Maps
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = function (msg) {
      if (typeof msg === 'string' && (
        msg.includes('Google Maps') || 
        msg.includes('propietario') || 
        msg.includes('developers.google.com')
      )) {
        return; // Silenciar modal de alerta
      }
      return originalAlert.apply(this, arguments);
    };
    return () => {
      window.alert = originalAlert;
    };
  }, []);

  // Cierre único del botón de descarte si Google Maps lo renderiza en DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = containerRef.current?.querySelector('.dismissButton');
      if (btn) {
        try {
          btn.click();
        } catch (e) {}
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [mapLoaded]);

  // Cargar Google Maps SDK
  useEffect(() => {
    let isMounted = true;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (isMounted) setMapLoaded(true);
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error al inicializar Google Maps SDK:', err);
          setLoadError('No se pudo conectar con el servicio de Google Maps.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  // Inicializar instancia de Google Maps en el DOM
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapInstanceRef.current || !window.google?.maps) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: SANTA_FE_CENTER,
        zoom: 8,
        minZoom: 6,
        maxZoom: 19,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: window.google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        },
        fullscreenControl: false,
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'simplified' }] }
        ]
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    } catch (e) {
      console.error('Error al instanciar Google Map:', e);
      setLoadError('Error al crear el lienzo de Google Maps.');
    }
  }, [mapLoaded]);

  // Ajustar tamaño del mapa cuando se abre/cierra la lista lateral o pantalla completa
  useEffect(() => {
    if (mapInstanceRef.current && window.google?.maps) {
      const timer = setTimeout(() => {
        window.google.maps.event.trigger(mapInstanceRef.current, 'resize');
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen, isFullscreen]);

  // Manejar selección de entidad: enfocar mapa Y abrir la ficha en el panel lateral
  const handleSelectEntity = useCallback((item) => {
    setActiveEntity(item);
    updateMarkerIcons(item);
    
    // 1. Si el panel estaba abierto al tocar la entidad, guardar estado para reabrirlo al cerrar la ficha
    if (isSidebarOpenRef.current) {
      wasSidebarOpenBeforeSelectionRef.current = true;
      setIsSidebarOpen(false);
    }

    // 2. Abrir la ficha directamente
    if (onItemClick) {
      onItemClick(item);
    }

    // 3. Centrar el mapa en la entidad seleccionada (sin popup redundante)
    const coords = getEntityCoordinates(item);
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: coords.lat, lng: coords.lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [onItemClick, updateMarkerIcons]);

  const handleSelectEntityRef = useRef(handleSelectEntity);
  handleSelectEntityRef.current = handleSelectEntity;

  // Actualizar marcadores SOLO cuando cambian los items o el mapa está listo (evita recreación innecesaria al seleccionar)
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !window.google?.maps) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(m => m.marker.setMap(null));
    markersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();
    let validCoordsCount = 0;

    items.forEach((item) => {
      const coords = getEntityCoordinates(item);
      if (!coords || isNaN(coords.lat) || isNaN(coords.lng)) return;

      validCoordsCount++;
      const pos = new window.google.maps.LatLng(coords.lat, coords.lng);
      bounds.extend(pos);

      const isThisSelected = !!selectedItem && (
        String(item.id) === String(selectedItem.id) || 
        String(item.dni) === String(selectedItem.dni)
      );

      const color = getPinColor(item, isThisSelected);
      const icon = createPinIcon(color, isThisSelected);

      const marker = new window.google.maps.Marker({
        position: pos,
        map: mapInstanceRef.current,
        title: item.nombre,
        icon: icon,
        zIndex: isThisSelected ? 9999 : 1
      });

      marker.addListener('click', () => {
        handleSelectEntityRef.current(item);
      });

      markersRef.current.push({ marker, item });
    });

    // Auto-fit de la cámara a los marcadores
    if (validCoordsCount > 1) {
      mapInstanceRef.current.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    } else if (validCoordsCount === 1) {
      mapInstanceRef.current.setCenter(bounds.getCenter());
      mapInstanceRef.current.setZoom(14);
    } else {
      mapInstanceRef.current.setCenter(SANTA_FE_CENTER);
      mapInstanceRef.current.setZoom(8);
    }
  }, [items, mapReady, getPinColor]);

  // Re-centrar todos los marcadores en la vista general
  const handleResetBounds = useCallback(() => {
    if (!mapInstanceRef.current || !window.google?.maps) return;

    if (markersRef.current && markersRef.current.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(m => {
        if (m.marker?.getPosition()) bounds.extend(m.marker.getPosition());
      });
      mapInstanceRef.current.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    } else if (markersRef.current && markersRef.current.length === 1 && markersRef.current[0].marker?.getPosition()) {
      mapInstanceRef.current.panTo(markersRef.current[0].marker.getPosition());
      mapInstanceRef.current.setZoom(14);
    } else {
      mapInstanceRef.current.panTo(SANTA_FE_CENTER);
      mapInstanceRef.current.setZoom(8);
    }
  }, []);

  // Sincronizar activeEntity cuando selectedItem cambie externamente (sin recrear marcadores)
  useEffect(() => {
    if (selectedItem) {
      prevSelectedItemRef.current = selectedItem;
      if (isSidebarOpenRef.current) {
        wasSidebarOpenBeforeSelectionRef.current = true;
        setIsSidebarOpen(false);
      }
      setActiveEntity(selectedItem);
      updateMarkerIcons(selectedItem);

      const coords = getEntityCoordinates(selectedItem);
      if (coords && mapInstanceRef.current) {
        mapInstanceRef.current.panTo({ lat: coords.lat, lng: coords.lng });
        mapInstanceRef.current.setZoom(15);
      }
    } else {
      const hadPreviousSelection = !!prevSelectedItemRef.current;
      prevSelectedItemRef.current = null;
      setActiveEntity(null);
      updateMarkerIcons(null);
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      
      const shouldReopenSidebar = wasSidebarOpenBeforeSelectionRef.current;
      // Al cerrar la ficha: si el desplegable estaba abierto al tocar la entidad, volver a abrirlo
      if (shouldReopenSidebar) {
        setIsSidebarOpen(true);
        wasSidebarOpenBeforeSelectionRef.current = false;
      }

      // Si se cerró una ficha activa, la vista del mapa vuelve a la vista general
      if (hadPreviousSelection) {
        handleResetBounds();
        if (shouldReopenSidebar) {
          const timer = setTimeout(() => {
            handleResetBounds();
          }, 240);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [selectedItem, updateMarkerIcons, handleResetBounds]);

  // Filtrado dentro de la lista lateral
  const filteredSidebarItems = useMemo(() => {
    if (!localSearch.trim()) return items;
    const q = localSearch.toLowerCase();
    return items.filter(it => 
      (it.nombre && it.nombre.toLowerCase().includes(q)) ||
      (it.localizacion && it.localizacion.toLowerCase().includes(q)) ||
      (it.direccion && it.direccion.toLowerCase().includes(q)) ||
      (it.dni && it.dni.includes(q)) ||
      (it.especializacion && it.especializacion.toLowerCase().includes(q))
    );
  }, [items, localSearch]);

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    if (trimmed) {
      localStorage.setItem('google_maps_api_key', trimmed);
    } else {
      localStorage.removeItem('google_maps_api_key');
    }
    setApiKey(trimmed);
    setShowKeyModal(false);
    window.location.reload();
  };

  return (
    <div 
      ref={containerRef}
      className={`relative bg-canvas rounded-2xl border border-borde overflow-hidden shadow-sm transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl' : 'h-[760px] min-h-[640px]'
      }`}
    >
      {/* Floating Map Controls (top right of map canvas) */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex items-center justify-center w-9 h-9 bg-white text-pizarra/80 hover:text-primario text-xs font-semibold rounded-xl border border-borde shadow-md hover:bg-superficie-sec transition-all cursor-pointer card-elevated"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
      </div>

      {/* Main Container: Split View */}
      <div className="w-full h-full flex relative">
        {/* Left Side List Panel */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="h-full bg-canvas border-r border-borde z-10 flex flex-col shrink-0 relative select-none shadow-xl"
            >
              {/* Header: Search bar + Collapse Arrow */}
              <div className="p-3.5 bg-white border-b border-borde shrink-0 flex items-center gap-2.5 shadow-2xs">
                <div className="relative flex-1">
                  <Search size={18} className="text-pizarra/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="text"
                    placeholder="Buscar por nombre o localidad..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full h-11 bg-canvas text-sm text-texto placeholder:text-pizarra/40 font-medium pl-11 pr-9 rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 focus:border-primario focus:bg-white transition-all shadow-2xs"
                  />
                  {localSearch && (
                    <button
                      onClick={() => setLocalSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-pizarra/40 hover:text-pizarra p-1 rounded-full hover:bg-borde/40 transition-colors cursor-pointer"
                      title="Limpiar búsqueda"
                    >
                      <Close size={14} />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl text-pizarra/60 hover:text-primario hover:bg-canvas transition-colors cursor-pointer border border-borde/70 hover:border-borde shadow-2xs"
                  title="Ocultar lista"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              {/* Scrollable Entity Cards List */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-canvas">
                {filteredSidebarItems.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-borde/80 shadow-2xs">
                    <p className="text-sm font-bold text-texto/80 mb-1">Sin resultados</p>
                    <p className="text-xs text-pizarra/60">No se encontraron entidades para la búsqueda actual.</p>
                  </div>
                ) : (
                  filteredSidebarItems.map((item) => {
                    const isSelected = activeEntity && (
                      String(activeEntity.id) === String(item.id) || 
                      String(activeEntity.dni) === String(item.dni)
                    );

                    return (
                      <div
                        key={item.id || item.dni}
                        onClick={() => handleSelectEntity(item)}
                        className={`group relative p-3.5 rounded-xl transition-all duration-150 cursor-pointer border ${
                          isSelected
                            ? 'bg-white border-primario shadow-md ring-2 ring-primario/20 border-l-[5px] border-l-primario'
                            : 'bg-white border-borde/80 hover:border-primario/40 hover:shadow-xs hover:translate-y-[-1px]'
                        }`}
                      >
                        {/* Title: full width, clamp to 2 lines */}
                        <h4 className={`text-sm font-bold leading-snug transition-colors line-clamp-2 ${
                          isSelected ? 'text-primario' : 'text-texto group-hover:text-primario'
                        }`}>
                          {item.nombre}
                        </h4>

                        {/* Location (and DNI if beneficiary) */}
                        <div className="flex items-center gap-1.5 text-xs text-pizarra/70 mt-2">
                          <Location size={14} className="text-primario/70 shrink-0" />
                          <span className="truncate font-medium text-pizarra/80">
                            {item.localizacion || 'Santa Fe'}
                          </span>
                          {!isOrg && item.dni && (
                            <span className="shrink-0 font-mono text-[11px] text-pizarra/50">
                              • DNI {item.dni}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button when Sidebar is closed: ONLY an arrow */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 bg-white text-pizarra hover:text-primario rounded-xl border border-borde shadow-md hover:bg-superficie-sec transition-all cursor-pointer card-elevated"
            title="Abrir panel de entidades"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Map Canvas */}
        <div className="flex-1 h-full relative bg-canvas">
          {/* Loading Indicator */}
          {!mapLoaded && !loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 gap-3">
              <div className="w-8 h-8 border-3 border-primario border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-pizarra/70">Cargando Google Maps...</p>
            </div>
          )}

          {/* Error / Fallback State */}
          {loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white z-10 gap-3">
              <div className="w-12 h-12 rounded-full bg-naranja/10 text-naranja flex items-center justify-center">
                <Location size={24} />
              </div>
              <h4 className="text-sm font-bold text-texto">Google Maps no se pudo cargar</h4>
              <p className="text-xs text-pizarra/70 max-w-md">
                {loadError}. Podés verificar tu conexión a internet o configurar una clave de API válida de Google Maps.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="bg-primario text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-primario/90 transition-all cursor-pointer"
                >
                  Configurar API Key
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-canvas border border-borde text-pizarra text-xs font-semibold px-4 py-2 rounded-xl hover:bg-superficie-sec transition-all cursor-pointer flex items-center gap-1"
                >
                  <Renew size={14} /> Reintentar
                </button>
              </div>
            </div>
          )}

          {/* The Google Map Div */}
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>

      {/* Modal para configurar Google Maps API Key */}
      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-borde p-6 max-w-md w-full shadow-2xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primario/10 text-primario flex items-center justify-center">
                    <Settings size={18} />
                  </div>
                  <h3 className="text-base font-bold text-texto">API Key de Google Maps</h3>
                </div>
                <button 
                  onClick={() => setShowKeyModal(false)}
                  className="text-pizarra/40 hover:text-pizarra text-lg font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-pizarra/75 leading-relaxed">
                Si posees una clave de Google Cloud con la <strong>Maps JavaScript API</strong> habilitada, podés ingresarla a continuación. Si la dejás vacía, el mapa funcionará en el modo de desarrollo/evaluación integrado sin ningún cartel.
              </p>

              <div>
                <label className="block text-xs font-bold text-pizarra mb-1 uppercase tracking-wider">
                  Clave de API
                </label>
                <input 
                  type="text"
                  placeholder="AIzaSy..."
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  className="w-full bg-canvas border border-borde rounded-xl px-3 py-2 text-xs font-mono text-texto focus:outline-none focus:ring-2 focus:ring-primario/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-pizarra border border-borde hover:bg-canvas transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primario hover:bg-primario/90 transition-colors cursor-pointer"
                >
                  Guardar y Aplicar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
