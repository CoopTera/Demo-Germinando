const fs = require('fs');
let mini = fs.readFileSync('src/components/graph/MiniGraph.jsx', 'utf8');

mini = mini.replace(/if \(\!links\.find\(l => l\.source === `tall-\$\{t\.id\}` && l\.target === `org-\$\{t\.org_id\}`\)\) \{[\s\S]*?if \(org\) \{[\s\S]*?addNode\([\s\S]*?\);[\s\S]*?\}[\s\S]*?\}/, 
  `(t.org_ids || []).forEach(oId => {
                if (!links.find(l => l.source === \`tall-\${t.id}\` && l.target === \`org-\${oId}\`)) {
                  links.push({ source: \`tall-\${t.id}\`, target: \`org-\${oId}\` });
                  const org = organizaciones.find(o => o.id === oId);
                  if (org) {
                    addNode({ id: \`org-\${org.id}\`, label: org.nombre, tipo: 'organizacion', size: 30, color: '#3C3AE5' });
                  }
                }
              });`);

fs.writeFileSync('src/components/graph/MiniGraph.jsx', mini, 'utf8');
console.log('Fixed MiniGraph.jsx');
