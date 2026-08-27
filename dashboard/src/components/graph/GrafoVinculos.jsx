import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Network } from 'lucide-react';
import { grafoNodos, grafoLinks } from '../../data/mockData';

const getNodeColor = (tipo) => {
  switch (tipo) {
    case 'organizacion':
      return '#3C3AE5';
    case 'unidad_productiva':
      return '#FF7402';
    case 'estado':
      return '#E42153';
    case 'beneficiarios':
      return '#22C55E';
    default:
      return '#494963';
  }
};

const LEGEND_ITEMS = [
  { label: 'Organización', color: '#3C3AE5' },
  { label: 'Unidad Productiva', color: '#FF7402' },
  { label: 'Área del Estado', color: '#E42153' },
  { label: 'Beneficiarios', color: '#22C55E' },
];

export default function GrafoVinculos() {
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setDimensions({ width, height: 500 });
        }
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const graphData = useMemo(() => ({
    nodes: grafoNodos.map((n) => ({ ...n })),
    links: grafoLinks.map((l) => ({ ...l })),
  }), []);

  const handleNodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    const nodeRadius = Math.sqrt(node.size) * 2;

    // Draw circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = getNodeColor(node.tipo);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5 / globalScale;
    ctx.stroke();

    // Draw label
    ctx.font = `${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#333333';
    ctx.fillText(label, node.x, node.y + nodeRadius + 2);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-borde overflow-hidden">
      {/* Title bar & Legend */}
      <div className="p-5 border-b border-borde">
        <div className="flex items-center gap-2 mb-3">
          <Network className="w-5 h-5 text-primario" />
          <h3 className="font-semibold text-pizarra text-base">Grafo de Vínculos</h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-texto">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full inline-block shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph Area */}
      <div ref={containerRef} className="w-full h-[500px] bg-canvas relative">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="label"
          nodeColor={(node) => getNodeColor(node.tipo)}
          nodeVal={(node) => node.size}
          linkColor={() => '#E3E1E2'}
          linkWidth={1.5}
          backgroundColor="#F5F6F8"
          nodeCanvasObject={handleNodeCanvasObject}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
        />
      </div>
    </div>
  );
}
