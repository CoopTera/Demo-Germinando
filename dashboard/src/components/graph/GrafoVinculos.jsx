import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Network } from 'lucide-react';
import { useData } from '../../context/DataContext';

const LEGEND_ITEMS = [
  { label: 'Organización', color: '#3C3AE5' },
  { label: 'Taller', color: '#FF7402' },
  { label: 'Convenio', color: '#22C55E' },
  { label: 'Beneficiarios', color: '#494963' },
];

export default function GrafoVinculos() {
  const { organizaciones, beneficiarios, convenios, talleres } = useData();
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 });
  const [layers, setLayers] = useState({
    beneficiarios: true,
    talleres: true,
    convenios: true
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) setDimensions({ width, height: 500 });
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
      nodes.push({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', size: 30, color: '#3C3AE5' });
    });

    // 2. Convenios (Nodos verdes medianos)
    if (layers.convenios) {
      convenios.forEach(conv => {
        const cId = `conv-${conv.id}`;
        nodes.push({ id: cId, label: conv.nombre, tipo: 'convenio', size: 20, color: '#22C55E' });
        links.push({ source: cId, target: `org-${conv.org_id}` });
      });
    }

    // 3. Talleres (Nodos naranjas medianos)
    if (layers.talleres) {
      talleres.forEach(tall => {
        const tId = `tall-${tall.id}`;
        nodes.push({ id: tId, label: tall.nombre, tipo: 'taller', size: 25, color: '#FF7402' });
        links.push({ source: tId, target: `org-${tall.org_id}` });
      });
    }

    // 4. Beneficiarios (Nodos grises pequeños)
    if (layers.beneficiarios) {
      beneficiarios.forEach(ben => {
        // En un caso real, cada beneficiario sería un nodo o se agruparían. 
        // Como puede haber miles, los mostramos si son < 200, sino solo una muestra o grupos.
        // Para la demo, mostraremos hasta 15 beneficiarios
      });
      // Para no sobresaturar, creamos nodos agrupados por organizacion (simulando que son personas)
      organizaciones.forEach(org => {
        if (org.beneficiarios > 0) {
           const bId = `bens-org-${org.id}`;
           nodes.push({ id: bId, label: `Benefs. (${org.beneficiarios})`, tipo: 'beneficiarios', size: 15, color: '#494963' });
           // Vinculamos al taller si hay, sino a la org
           const orgTalleres = talleres.filter(t => t.org_id === org.id);
           if (orgTalleres.length > 0 && layers.talleres) {
             links.push({ source: bId, target: `tall-${orgTalleres[0].id}` });
           } else {
             links.push({ source: bId, target: `org-${org.id}` });
           }
        }
      });
    }

    return { nodes, links };
  }, [organizaciones, beneficiarios, convenios, talleres, layers]);

  const handleNodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    const nodeRadius = Math.sqrt(node.size) * 2;

    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5 / globalScale;
    ctx.stroke();

    ctx.font = `${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#333333';
    ctx.fillText(label, node.x, node.y + nodeRadius + 2);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-borde overflow-hidden">
      <div className="p-5 border-b border-borde flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Network className="w-5 h-5 text-primario" />
            <h3 className="font-semibold text-pizarra text-base">Grafo de Vínculos Dinámico</h3>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-texto">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full inline-block shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filtros flotantes */}
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input type="checkbox" checked={layers.beneficiarios} onChange={(e) => setLayers(p => ({...p, beneficiarios: e.target.checked}))} />
            Beneficiarios
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input type="checkbox" checked={layers.talleres} onChange={(e) => setLayers(p => ({...p, talleres: e.target.checked}))} />
            Talleres
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input type="checkbox" checked={layers.convenios} onChange={(e) => setLayers(p => ({...p, convenios: e.target.checked}))} />
            Convenios
          </label>
        </div>
      </div>

      <div ref={containerRef} className="w-full h-[500px] bg-canvas relative">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="label"
          nodeColor={(node) => node.color}
          nodeVal={(node) => node.size}
          linkColor={() => '#E3E1E2'}
          linkWidth={1.5}
          backgroundColor="#F5F6F8"
          nodeCanvasObject={handleNodeCanvasObject}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          d3Force="charge"
        />
      </div>
    </div>
  );
}
