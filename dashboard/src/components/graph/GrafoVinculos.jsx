import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useData } from '../../context/DataContext';
import { grafoLinks } from '../../data/mockData';
import { SettingsAdjust } from '@carbon/icons-react';

const LEGEND_ITEMS = [
  { label: 'Organización', color: '#6B1330' },
  { label: 'Taller', color: '#FF7402' },
  { label: 'Convenio', color: '#22C55E' },
  { label: 'Beneficiario', color: '#494963' },
];

export default function GrafoVinculos() {
  const { organizaciones, beneficiarios, convenios, talleres } = useData();
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });  const [showControls, setShowControls] = useState(false);
  
  // Controles de visualización tipo Obsidian
  const [layers, setLayers] = useState({
    beneficiarios: true,
    talleres: true,
    convenios: true,
    relaciones: true
  });
  
  const [graphConfig, setGraphConfig] = useState({
    repulsion: 200,
    linkDistance: 50,
    nodeSizeMultiplier: 1
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight || 300;
        if (width > 0 && height > 0) setDimensions({ width, height });
      }
    };
    updateDimensions();
    const resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];

    // 1. Organizaciones (Nodos grandes rojos)
    organizaciones.forEach(org => {
      nodes.push({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', baseSize: 30, color: '#6B1330' });
    });

    // 2. Convenios (Nodos verdes medianos)
    if (layers.convenios) {
      convenios.forEach(conv => {
        const cId = `conv-${conv.id}`;
        nodes.push({ id: cId, label: conv.nombre, tipo: 'convenio', baseSize: 18, color: '#22C55E' });
        links.push({ source: cId, target: `org-${conv.org_id}` });
      });
    }

    // 3. Talleres (Nodos naranjas medianos)
    if (layers.talleres) {
      talleres.forEach(tall => {
        const tId = `tall-${tall.id}`;
        nodes.push({ id: tId, label: tall.nombre, tipo: 'taller', baseSize: 22, color: '#FF7402' });
        (tall.org_ids || []).forEach(oId => links.push({ source: tId, target: `org-${oId}` }));
      });
    }

    // 4. Beneficiarios (Nodos grises pequeños)
    if (layers.beneficiarios) {
      beneficiarios.forEach((ben, index) => {
        const bId = `ben-${ben.id}`;
        nodes.push({ id: bId, label: ben.nombre, tipo: 'beneficiario', baseSize: 10, color: '#494963' });
        
        const primaryOrg = organizaciones.find(o => o.nombre === ben.programas);
        
        if (ben.talleres && ben.talleres.length > 0 && layers.talleres) {
          ben.talleres.forEach(tId => {
            links.push({ source: bId, target: `tall-${tId}` });
          });
          if (primaryOrg) links.push({ source: bId, target: `org-${primaryOrg.id}` });
        } else if (primaryOrg) {
          const orgTalleres = talleres.filter(t => (t.org_ids || []).includes(primaryOrg.id));
          if (layers.talleres && orgTalleres.length > 0) {
            const randomTaller = orgTalleres[index % orgTalleres.length];
            links.push({ source: bId, target: `tall-${randomTaller.id}` });
          } else {
            links.push({ source: bId, target: `org-${primaryOrg.id}` });
          }

          if (index % 5 === 0 && layers.relaciones) {
            const otherOrg = organizaciones[(index + 3) % organizaciones.length];
            if (otherOrg.id !== primaryOrg.id) {
              links.push({ source: bId, target: `org-${otherOrg.id}` });
            }
          }
        }
      });
    }

    // 5. Relaciones Inter-Org
    if (layers.relaciones && grafoLinks) {
      grafoLinks.forEach(link => {
        if (nodes.find(n => n.id === `org-${link.source}`) && nodes.find(n => n.id === `org-${link.target}`)) {
          links.push({ 
            source: `org-${link.source}`, 
            target: `org-${link.target}`,
            tipo: link.tipo,
            isCrossLink: true 
          });
        }
      });
    }

    return { nodes, links };
  }, [organizaciones, beneficiarios, convenios, talleres, layers]);

  const handleNodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    const nodeSize = node.baseSize * graphConfig.nodeSizeMultiplier;
    const nodeRadius = Math.sqrt(nodeSize) * 1.5;

    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5 / globalScale;
    ctx.stroke();

    if (globalScale > 1.2 || node.tipo === 'organizacion') {
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = node.tipo === 'organizacion' ? '#333333' : '#666666';
      ctx.fillText(label, node.x, node.y + nodeRadius + 2);
    }
  }, [graphConfig.nodeSizeMultiplier]);

  const handleLinkCanvasObject = useCallback((link, ctx, globalScale) => {
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    
    if (link.isCrossLink) {
      ctx.strokeStyle = 'rgba(60,58,229,0.3)';
      ctx.lineWidth = 2 / globalScale;
      ctx.setLineDash([4 / globalScale, 4 / globalScale]);
    } else {
      ctx.strokeStyle = '#E3E1E2';
      ctx.lineWidth = 1 / globalScale;
      ctx.setLineDash([]);
    }
    
    ctx.stroke();
  }, []);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-graphConfig.repulsion);
      fgRef.current.d3Force('link').distance(link => link.isCrossLink ? graphConfig.linkDistance * 3 : graphConfig.linkDistance);
      fgRef.current.d3ReheatSimulation();
    }
  }, [graphData, graphConfig.repulsion, graphConfig.linkDistance]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-borde h-full w-full overflow-hidden relative flex flex-col" style={{ padding: '20px' }}>
      
      {/* Header section */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h3 className="font-semibold text-pizarra text-base">
          Grafo de Vínculos
        </h3>
        <button 
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="text-pizarra/70 hover:text-pizarra hover:bg-canvas transition-colors cursor-pointer rounded-lg border border-borde/60"
          style={{ padding: '6px' }}
          title="Ajustes del Grafo"
        >
          <SettingsAdjust size={18} />
        </button>
      </div>

      {/* Legend items */}
      <div className="flex items-center gap-2 flex-wrap mb-3 shrink-0">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="bg-canvas text-[11px] font-medium text-pizarra px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-borde/50">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Settings popover */}
      {showControls && (
        <div className="absolute top-14 right-5 bg-white rounded-2xl shadow-xl border border-borde w-64 z-30 flex flex-col" style={{ padding: '16px', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Filtros</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(layers).map(([key, value]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={value} 
                    onChange={(e) => setLayers(p => ({...p, [key]: e.target.checked}))} 
                    style={{ accentColor: '#6B1330', width: '14px', height: '14px' }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#494963' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#EAE9EE', width: '100%' }} />

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Físicas</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#494963' }}>Repulsión</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{graphConfig.repulsion}</span>
                </div>
                <input 
                  type="range" min="50" max="600" step="10"
                  value={graphConfig.repulsion}
                  onChange={(e) => setGraphConfig(p => ({...p, repulsion: parseInt(e.target.value)}))}
                  style={{ width: '100%', accentColor: '#6B1330' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#494963' }}>Largo de enlaces</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{graphConfig.linkDistance}</span>
                </div>
                <input 
                  type="range" min="10" max="150" step="5"
                  value={graphConfig.linkDistance}
                  onChange={(e) => setGraphConfig(p => ({...p, linkDistance: parseInt(e.target.value)}))}
                  style={{ width: '100%', accentColor: '#6B1330' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#494963' }}>Tamaño de nodos</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{graphConfig.nodeSizeMultiplier}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="2.5" step="0.1"
                  value={graphConfig.nodeSizeMultiplier}
                  onChange={(e) => setGraphConfig(p => ({...p, nodeSizeMultiplier: parseFloat(e.target.value)}))}
                  style={{ width: '100%', accentColor: '#6B1330' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas container */}
      <div ref={containerRef} className="flex-1 w-full min-h-0 rounded-xl overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="label"
          nodeColor={(node) => node.color}
          nodeVal={(node) => node.size}
          linkColor={() => '#E3E1E2'}
          linkCanvasObject={handleLinkCanvasObject}
          backgroundColor="#FAFAFA"
          nodeCanvasObject={handleNodeCanvasObject}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          warmupTicks={50}
        />
      </div>
    </div>
  );
}
