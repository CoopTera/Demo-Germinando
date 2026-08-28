import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useData } from '../../context/DataContext';
import { grafoLinks } from '../../data/mockData';
import { Faders, Minus, Plus } from '@phosphor-icons/react';

const LEGEND_ITEMS = [
  { label: 'Organización', color: '#3C3AE5' },
  { label: 'Taller', color: '#FF7402' },
  { label: 'Convenio', color: '#22C55E' },
  { label: 'Beneficiario', color: '#494963' },
];

export default function GrafoVinculos() {
  const { organizaciones, beneficiarios, convenios, talleres } = useData();
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });
  const [showControls, setShowControls] = useState(true);
  
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
        // Tomamos el alto disponible en la pantalla restando el sidebar/header aproximado
        const height = Math.max(600, window.innerHeight - 200);
        if (width > 0) setDimensions({ width, height });
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

    // 1. Organizaciones (Nodos grandes azules)
    organizaciones.forEach(org => {
      nodes.push({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', baseSize: 30, color: '#3C3AE5' });
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
          // If they explicitly have talleres assigned, link them directly
          ben.talleres.forEach(tId => {
            links.push({ source: bId, target: `tall-${tId}` });
          });
          // Also link to primary org if they have one
          if (primaryOrg) links.push({ source: bId, target: `org-${primaryOrg.id}` });
        } else if (primaryOrg) {
          // Fallback logic for mock data without explicit talleres
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
    // Apply the nodeSizeMultiplier at render time instead of data time
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
      // Re-heat the simulation so it adjusts to new physics
      fgRef.current.d3ReheatSimulation();
    }
  }, [graphData, graphConfig.repulsion, graphConfig.linkDistance]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-borde overflow-hidden relative" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Floating Legend - Top Left */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, display: 'flex', gap: '8px', flexWrap: 'wrap', pointerEvents: 'none' }}>
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="bg-white border border-borde shadow-sm" style={{ padding: '6px 12px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#494963' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Floating Controls - Top Right */}
      <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
        <button 
          onClick={() => setShowControls(!showControls)}
          className="bg-white border border-borde shadow-sm hover:border-primario text-pizarra hover:text-primario transition-colors cursor-pointer"
          style={{ padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Ajustes del Grafo"
        >
          <Faders weight="duotone" style={{ width: '20px', height: '20px' }} />
        </button>

        {showControls && (
          <div className="bg-white border border-borde shadow-lg rounded-xl" style={{ padding: '20px', width: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Filtros de Nodos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(layers).map(([key, value]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={value} 
                      onChange={(e) => setLayers(p => ({...p, [key]: e.target.checked}))} 
                      style={{ accentColor: '#3C3AE5', width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#494963' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#EAE9EE', width: '100%' }} />

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Físicas</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Slider Repulsion */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#494963' }}>Repulsión</span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{graphConfig.repulsion}</span>
                  </div>
                  <input 
                    type="range" min="50" max="600" step="10"
                    value={graphConfig.repulsion}
                    onChange={(e) => setGraphConfig(p => ({...p, repulsion: parseInt(e.target.value)}))}
                    style={{ width: '100%', accentColor: '#3C3AE5' }}
                  />
                </div>

                {/* Slider Link Distance */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#494963' }}>Largo de enlaces</span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{graphConfig.linkDistance}</span>
                  </div>
                  <input 
                    type="range" min="10" max="150" step="5"
                    value={graphConfig.linkDistance}
                    onChange={(e) => setGraphConfig(p => ({...p, linkDistance: parseInt(e.target.value)}))}
                    style={{ width: '100%', accentColor: '#3C3AE5' }}
                  />
                </div>

                {/* Slider Node Size */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#494963' }}>Tamaño de nodos</span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{graphConfig.nodeSizeMultiplier}x</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="2.5" step="0.1"
                    value={graphConfig.nodeSizeMultiplier}
                    onChange={(e) => setGraphConfig(p => ({...p, nodeSizeMultiplier: parseFloat(e.target.value)}))}
                    style={{ width: '100%', accentColor: '#3C3AE5' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div ref={containerRef} style={{ width: '100%', height: dimensions.height, backgroundColor: '#FAFAFA' }}>
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
