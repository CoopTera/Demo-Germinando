import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Location, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Close,
  CenterToFit
} from '@carbon/icons-react';
import { getEntityCoordinates, SANTA_FE_CENTER } from '../../utils/geoUtils';

/**
 * Generador de L.divIcon para marcadores vectoriales SVG interactivos
 */
function createLeafletPinIcon(color, isActive = false) {
  const width = isActive ? 48 : 36;
  const height = isActive ? 62 : 48;
  const anchorX = width / 2;
  const anchorY = isActive ? 59 : 46;

  const svg = isActive ? `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 62" width="${width}" height="${height}" style="overflow: visible; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.35));">
      <circle cx="24" cy="22" r="21" fill="${color}" opacity="0.25"/>
      <circle cx="24" cy="22" r="16" fill="#ffffff" opacity="0.4"/>
      <path d="M24 4 C14.5 4 7 12 7 21.5 C7 36 24 59 24 59 C24 59 41 36 41 21.5 C41 12 33.5 4 24 4 Z" fill="${color}"/>
      <circle cx="24" cy="21.5" r="11" fill="#ffffff"/>
      <circle cx="24" cy="21.5" r="7.5" fill="${color}"/>
      <circle cx="24" cy="21.5" r="3" fill="#ffffff"/>
    </svg>
  ` : `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="${width}" height="${height}" style="overflow: visible; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.25));">
      <path d="M18 2 C9.16 2 2 9.16 2 18 C2 30.5 18 46 18 46 C18 46 34 30.5 34 18 C34 9.16 26.84 2 18 2 Z" fill="${color}"/>
      <circle cx="18" cy="18" r="10.5" fill="#ffffff"/>
      <circle cx="18" cy="18" r="7.5" fill="${color}"/>
      <circle cx="18" cy="18" r="3" fill="#ffffff"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: svg,
    iconSize: [width, height],
    iconAnchor: [anchorX, anchorY],
    popupAnchor: [0, -anchorY]
  });
}

export default function GoogleMapView({
  items = [],
  entityType = 'organizacion', // 'organizacion' | 'beneficiario'
  onItemClick,
  selectedItem = null
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const markerMapRef = useRef(new Map());
  const containerRef = useRef(null);

  const [mapReady, setMapReady] = useState(false);
  const [activeEntity, setActiveEntity] = useState(selectedItem);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isSidebarOpenRef = useRef(isSidebarOpen);
  isSidebarOpenRef.current = isSidebarOpen;
  const wasSidebarOpenBeforeSelectionRef = useRef(false);
  const prevSelectedItemRef = useRef(selectedItem);
  const [localSearch, setLocalSearch] = useState('');

  const isOrg = entityType === 'organizacion';

  // Función para determinar el color del pin según la entidad y si está seleccionado
  const getPinColor = useCallback((item, isSelected = false) => {
    if (isSelected) {
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
    if (!markerMapRef.current) return;

    markerMapRef.current.forEach(({ marker, item }) => {
      const isThisSelected = !!selected && (
        String(item.id) === String(selected.id) || 
        String(item.dni) === String(selected.dni)
      );

      const color = getPinColor(item, isThisSelected);
      const icon = createLeafletPinIcon(color, isThisSelected);
      marker.setIcon(icon);
      marker.setZIndexOffset(isThisSelected ? 1000 : 0);
    });
  }, [getPinColor]);

  // Manejar selección de entidad: centrar mapa Y abrir la ficha en el panel lateral
  const handleSelectEntity = useCallback((item) => {
    setActiveEntity(item);
    updateMarkerIcons(item);
    
    // 1. Si el panel lateral de mapa estaba abierto, guardar estado para reabrirlo al cerrar la ficha
    if (isSidebarOpenRef.current) {
      wasSidebarOpenBeforeSelectionRef.current = true;
      setIsSidebarOpen(false);
    }

    // 2. Abrir la ficha de detalle externa en el dashboard
    if (onItemClick) {
      onItemClick(item);
    }

    // 3. Volar la cámara hacia la entidad seleccionada
    const coords = getEntityCoordinates(item);
    if (coords && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 15, {
        duration: 0.8
      });
    }
  }, [onItemClick, updateMarkerIcons]);

  const handleSelectEntityRef = useRef(handleSelectEntity);
  handleSelectEntityRef.current = handleSelectEntity;

  // Re-centrar la vista abarcando todos los marcadores
  const handleResetBounds = useCallback(() => {
    if (!mapInstanceRef.current || !markerMapRef.current) return;

    const bounds = L.latLngBounds([]);
    let count = 0;
    markerMapRef.current.forEach(({ marker }) => {
      bounds.extend(marker.getLatLng());
      count++;
    });

    if (count > 1) {
      mapInstanceRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 0.8 });
    } else if (count === 1) {
      const firstEntry = markerMapRef.current.values().next().value;
      if (firstEntry?.marker) {
        mapInstanceRef.current.flyTo(firstEntry.marker.getLatLng(), 14, { duration: 0.8 });
      }
    } else {
      mapInstanceRef.current.flyTo([SANTA_FE_CENTER.lat, SANTA_FE_CENTER.lng], 8, { duration: 0.8 });
    }
  }, []);

  // Inicializar instancia de Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [SANTA_FE_CENTER.lat, SANTA_FE_CENTER.lng],
      zoom: 8,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false
    });

    // Capa de mosaicos oficial de OpenStreetMap: 100% gratuita y sin marcas de agua ni API keys
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Controles de zoom en la esquina inferior derecha
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Grupo de marcadores
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Ajustar tamaño del mapa cuando se abre/cierra la lista lateral o cambia pantalla completa
  useEffect(() => {
    if (mapInstanceRef.current) {
      const timer = setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  // Actualizar marcadores cuando cambian los items o el mapa está listo
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !markersLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();
    markerMapRef.current = new Map();

    const bounds = L.latLngBounds([]);
    let validCoordsCount = 0;

    items.forEach((item) => {
      const coords = getEntityCoordinates(item);
      if (!coords || isNaN(coords.lat) || isNaN(coords.lng)) return;

      validCoordsCount++;
      const pos = [coords.lat, coords.lng];
      bounds.extend(pos);

      const isThisSelected = !!selectedItem && (
        String(item.id) === String(selectedItem.id) || 
        String(item.dni) === String(selectedItem.dni)
      );

      const color = getPinColor(item, isThisSelected);
      const icon = createLeafletPinIcon(color, isThisSelected);

      const marker = L.marker(pos, {
        icon,
        zIndexOffset: isThisSelected ? 1000 : 0,
        title: item.nombre
      });

      marker.on('click', () => {
        handleSelectEntityRef.current(item);
      });

      marker.addTo(markersLayer);
      markerMapRef.current.set(String(item.id || item.dni), { marker, item });
    });

    // Auto-ajustar vista del mapa
    if (validCoordsCount > 1) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (validCoordsCount === 1) {
      mapInstanceRef.current.setView(bounds.getCenter(), 14);
    } else {
      mapInstanceRef.current.setView([SANTA_FE_CENTER.lat, SANTA_FE_CENTER.lng], 8);
    }
  }, [items, mapReady, getPinColor]);

  // Sincronizar activeEntity cuando selectedItem cambie externamente
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
        mapInstanceRef.current.flyTo([coords.lat, coords.lng], 15, {
          duration: 0.8
        });
      }
    } else {
      const hadPreviousSelection = !!prevSelectedItemRef.current;
      prevSelectedItemRef.current = null;
      setActiveEntity(null);
      updateMarkerIcons(null);
      
      const shouldReopenSidebar = wasSidebarOpenBeforeSelectionRef.current;
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

  return (
    <div 
      ref={containerRef}
      className="relative bg-canvas rounded-2xl border border-borde overflow-hidden shadow-sm transition-all duration-300 h-[760px] min-h-[640px]"
    >
      {/* Botón flotante para centrar vista por defecto */}
      <div className="absolute top-4 right-4 z-[1001] pointer-events-auto">
        <button
          onClick={handleResetBounds}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-pizarra hover:text-primario text-xs font-semibold rounded-xl border border-borde shadow-md hover:bg-superficie-sec hover:shadow-lg transition-all cursor-pointer select-none card-elevated"
          title="Centrar y volver a la vista por defecto"
        >
          <CenterToFit size={16} className="text-primario shrink-0" />
          <span>Centrar</span>
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
              className="h-full bg-canvas border-r border-borde z-[1001] flex flex-col shrink-0 relative shadow-xl overflow-hidden"
              data-lenis-prevent="true"
            >
              {/* Header: Title + Counter + Search + Collapse Button */}
              <div className="p-4 bg-white border-b border-borde shrink-0 flex flex-col gap-3 shadow-2xs">
                {/* Top Row: Title & Counter & Collapse */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-texto tracking-tight">
                      {isOrg ? 'Organizaciones' : 'Beneficiarios'}
                    </h3>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primario/10 text-primario tabular-nums">
                      {filteredSidebarItems.length}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-pizarra/60 hover:text-primario hover:bg-superficie-sec border border-transparent hover:border-borde/70 transition-colors cursor-pointer"
                    title="Ocultar lista"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>

                {/* Search input bar with explicit padding */}
                <div className="relative w-full flex items-center">
                  <Search 
                    size={16} 
                    className="text-pizarra/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                  />
                  <input 
                    type="text"
                    placeholder="Buscar por nombre, localidad..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    style={{ paddingLeft: '34px', paddingRight: localSearch ? '32px' : '12px' }}
                    className="w-full h-10 bg-[#F4F5F8] hover:bg-[#EBEDF2] focus:bg-white text-xs font-medium text-texto placeholder:text-pizarra/50 rounded-xl border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 focus:border-primario transition-all shadow-2xs"
                  />
                  {localSearch && (
                    <button
                      onClick={() => setLocalSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pizarra/40 hover:text-pizarra p-1 rounded-full hover:bg-borde/50 transition-colors cursor-pointer"
                      title="Limpiar búsqueda"
                    >
                      <Close size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Entity Cards List with Lenis isolation */}
              <div 
                className="flex-1 min-h-0 overflow-y-auto p-3.5 flex flex-col gap-2.5 bg-canvas/70 overscroll-contain"
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
              >
                {filteredSidebarItems.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-borde/80 shadow-2xs my-auto">
                    <p className="text-sm font-bold text-texto/80 mb-1">Sin resultados</p>
                    <p className="text-xs text-pizarra/60">No se encontraron entidades para "{localSearch}".</p>
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
                        className={`group relative p-3.5 rounded-xl transition-all duration-150 cursor-pointer border flex flex-col gap-1.5 text-left ${
                          isSelected
                            ? 'bg-white border-primario shadow-md ring-2 ring-primario/20 border-l-[4px] border-l-primario'
                            : 'bg-white border-borde/80 hover:border-primario/40 hover:shadow-xs hover:translate-y-[-1px]'
                        }`}
                      >
                        {/* Title & Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-xs font-bold leading-snug transition-colors line-clamp-2 ${
                            isSelected ? 'text-primario' : 'text-texto group-hover:text-primario'
                          }`}>
                            {item.nombre}
                          </h4>
                          {isOrg && item.especializacion && (
                            <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-canvas text-pizarra/70 max-w-[120px] truncate">
                              {item.especializacion}
                            </span>
                          )}
                          {!isOrg && item.estado && (
                            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                              item.estado === 'Activo' 
                                ? 'bg-exito/10 text-exito' 
                                : item.estado === 'Suspendido' 
                                ? 'bg-critico/10 text-critico' 
                                : 'bg-naranja/10 text-naranja'
                            }`}>
                              {item.estado}
                            </span>
                          )}
                        </div>

                        {/* Location (and DNI/address) */}
                        <div className="flex items-center gap-1.5 text-xs text-pizarra/70">
                          <Location size={13} className="text-primario shrink-0" />
                          <span className="truncate font-medium text-pizarra/80">
                            {item.localizacion || 'Santa Fe'}
                          </span>
                          {item.direccion && (
                            <span className="truncate text-pizarra/50 text-[11px] hidden sm:inline">
                              • {item.direccion}
                            </span>
                          )}
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

        {/* Toggle Button when Sidebar is closed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-[1001] flex items-center justify-center w-9 h-9 bg-white text-pizarra/80 hover:text-primario text-xs font-semibold rounded-xl border border-borde shadow-md hover:bg-superficie-sec transition-all cursor-pointer card-elevated"
            title="Abrir lista de entidades"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Map Canvas */}
        <div className="flex-1 h-full relative bg-canvas">
          <div ref={mapContainerRef} className="w-full h-full z-0" />
        </div>
      </div>
    </div>
  );
}
