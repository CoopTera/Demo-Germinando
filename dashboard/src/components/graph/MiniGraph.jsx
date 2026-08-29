import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useData } from '../../context/DataContext';

export default function MiniGraph({ rootEntityId, rootEntityType }) {
  const { organizaciones, beneficiarios, convenios, talleres } = useData();
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) setDimensions({ width, height: 300 });
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

    const addNode = (n) => {
      if (!nodes.find(existing => existing.id === n.id)) nodes.push(n);
    };

    if (rootEntityType === 'beneficiario') {
      const ben = beneficiarios.find(b => b.id === rootEntityId);
      if (ben) {
        addNode({ id: ben.id, label: ben.nombre, tipo: 'beneficiarios', size: 25, color: '#494963' });
        
        const normalize = (str) => str.toLowerCase().replace('coop.', 'cooperativa').replace('asoc.', 'asociación').replace('fund.', 'fundación');
        const orgNames = ben.programas.split(',').map(s => normalize(s.trim()));
        orgNames.forEach(orgName => {
          const org = organizaciones.find(o => {
            const on = normalize(o.nombre);
            return on.includes(orgName) || orgName.includes(on);
          });
          if (org) {
            addNode({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', size: 30, color: '#6B1330' });
            links.push({ source: ben.id, target: `org-${org.id}` });
          }
        });

        // Add dynamically assigned talleres
        if (ben.talleres && ben.talleres.length > 0) {
          ben.talleres.forEach(tId => {
            const t = talleres.find(t => t.id === tId);
            if (t) {
              addNode({ id: `tall-${t.id}`, label: t.nombre, tipo: 'taller', size: 20, color: '#FF7402' });
              links.push({ source: ben.id, target: `tall-${t.id}` });
              // Connect taller to its org if not already
              (t.org_ids || []).forEach(oId => {
                if (!links.find(l => l.source === `tall-${t.id}` && l.target === `org-${oId}`)) {
                  links.push({ source: `tall-${t.id}`, target: `org-${oId}` });
                  const org = organizaciones.find(o => o.id === oId);
                  if (org) {
                    addNode({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', size: 30, color: '#6B1330' });
                  }
                }
              });
            }
          });
        }
      }
    }

    return { nodes, links };
  }, [rootEntityId, rootEntityType, organizaciones, beneficiarios, convenios, talleres]);

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
    const words = label.split(' ');
    if (words.length > 2) {
      ctx.fillText(words.slice(0,2).join(' ') + '...', node.x, node.y + nodeRadius + 2);
    } else {
      ctx.fillText(label, node.x, node.y + nodeRadius + 2);
    }
  }, []);

  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 20);
      }, 500);
    }
  }, [graphData]);

  if (graphData.nodes.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full bg-canvas rounded-xl border border-borde overflow-hidden" style={{ height: '300px' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
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
  );
}
