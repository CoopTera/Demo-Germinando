import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useData } from '../../context/DataContext';

export default function MiniGraph({ rootEntityId, rootEntityType, height = 220 }) {
  const { organizaciones, beneficiarios, convenios, talleres } = useData();
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 320, height });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) setDimensions({ width, height });
      }
    };
    updateDimensions();
    const resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [height]);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];

    const addNode = (n) => {
      if (!nodes.find(existing => existing.id === n.id)) nodes.push(n);
    };

    if (rootEntityType === 'beneficiario') {
      const ben = beneficiarios.find(b => b.id === rootEntityId);
      if (ben) {
        addNode({ id: ben.id, label: ben.nombre, tipo: 'beneficiarios', size: 28, color: '#494963' });
        
        const normalize = (str) => str.toLowerCase().replace('coop.', 'cooperativa').replace('asoc.', 'asociación').replace('fund.', 'fundación');
        const orgNames = ben.programas ? ben.programas.split(',').map(s => normalize(s.trim())) : [];
        orgNames.forEach(orgName => {
          const org = organizaciones.find(o => {
            const on = normalize(o.nombre);
            return on.includes(orgName) || orgName.includes(on);
          });
          if (org) {
            addNode({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', size: 32, color: '#6B1330' });
            links.push({ source: ben.id, target: `org-${org.id}` });
          }
        });

        if (ben.talleres && ben.talleres.length > 0) {
          ben.talleres.forEach(tId => {
            const t = talleres.find(t => t.id === tId);
            if (t) {
              addNode({ id: `tall-${t.id}`, label: t.nombre, tipo: 'taller', size: 22, color: '#FF7402' });
              links.push({ source: ben.id, target: `tall-${t.id}` });
              (t.org_ids || []).forEach(oId => {
                if (!links.find(l => l.source === `tall-${t.id}` && l.target === `org-${oId}`)) {
                  links.push({ source: `tall-${t.id}`, target: `org-${oId}` });
                  const org = organizaciones.find(o => o.id === oId);
                  if (org) {
                    addNode({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', size: 32, color: '#6B1330' });
                  }
                }
              });
            }
          });
        }
      }
    } else if (rootEntityType === 'organizacion') {
      const org = organizaciones.find(o => o.id === rootEntityId);
      if (org) {
        addNode({ id: `org-${org.id}`, label: org.nombre, tipo: 'organizacion', size: 36, color: '#6B1330' });

        const orgConvenios = convenios.filter(c => c.org_id === org.id);
        orgConvenios.forEach(conv => {
          const cId = `conv-${conv.id}`;
          addNode({ id: cId, label: conv.nombre, tipo: 'convenio', size: 22, color: '#22C55E' });
          links.push({ source: `org-${org.id}`, target: cId });
        });

        const orgTalleres = talleres.filter(t => (t.org_ids || []).includes(org.id));
        orgTalleres.forEach(taller => {
          const tId = `tall-${taller.id}`;
          addNode({ id: tId, label: taller.nombre, tipo: 'taller', size: 24, color: '#FF7402' });
          links.push({ source: `org-${org.id}`, target: tId });
        });

        beneficiarios.forEach(ben => {
          const isLinked = (ben.talleres || []).some(tId => orgTalleres.some(t => t.id === tId));
          if (isLinked) {
            const bId = `ben-${ben.id}`;
            addNode({ id: bId, label: ben.nombre, tipo: 'beneficiario', size: 16, color: '#494963' });
            const matchingTaller = orgTalleres.find(t => (ben.talleres || []).includes(t.id));
            if (matchingTaller) {
              links.push({ source: `tall-${matchingTaller.id}`, target: bId });
            }
          }
        });
      }
    }

    // Garantizar que cada enlace conecte nodos válidos existentes para evitar que ForceGraph2D falle
    const validNodeIds = new Set(nodes.map(n => n.id));
    const validLinks = links.filter(l => validNodeIds.has(l.source) && validNodeIds.has(l.target));

    return { nodes, links: validLinks };
  }, [rootEntityId, rootEntityType, organizaciones, beneficiarios, convenios, talleres]);

  const handleNodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.label || '';
    const fontSize = Math.max(10, Math.min(13, 11 / globalScale));
    const nodeRadius = Math.sqrt(node.size) * 1.8;

    // Node Circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2 / globalScale;
    ctx.stroke();

    // Node Label with White Backdrop Outline
    ctx.font = `600 ${fontSize}px Inter, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    let textToDraw = label;
    const words = label.split(' ');
    if (words.length > 2) {
      textToDraw = words.slice(0, 2).join(' ') + '...';
    }

    const yPos = node.y + nodeRadius + 3;

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4 / globalScale;
    ctx.strokeText(textToDraw, node.x, yPos);
    
    ctx.fillStyle = '#222222';
    ctx.fillText(textToDraw, node.x, yPos);
  }, []);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-180);
      fgRef.current.d3Force('link').distance(55);
      
      const timer = setTimeout(() => {
        if (fgRef.current) fgRef.current.zoomToFit(400, 20);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [graphData]);

  if (graphData.nodes.length === 0) return null;

  return (
    <div ref={containerRef} className="w-full bg-canvas/60 rounded-2xl overflow-hidden border border-borde p-1 shadow-inner" style={{ height: `${height}px` }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeColor={(node) => node.color}
        nodeVal={(node) => node.size}
        linkColor={() => '#D1D5DB'}
        linkWidth={1.5}
        backgroundColor="#F8F9FA"
        nodeCanvasObject={handleNodeCanvasObject}
        cooldownTicks={120}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />
    </div>
  );
}
