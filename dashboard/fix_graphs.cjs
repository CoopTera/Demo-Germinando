const fs = require('fs');
let content = fs.readFileSync('src/components/graph/GrafoVinculos.jsx', 'utf8');

content = content.replace(/links\.push\(\{ source: tId, target: `org-\$\{tall\.org_id\}` \}\);/, 
  "(tall.org_ids || []).forEach(oId => links.push({ source: tId, target: `org-${oId}` }));");

content = content.replace(/const orgTalleres = talleres\.filter\(t => t\.org_id === primaryOrg\.id\);/,
  "const orgTalleres = talleres.filter(t => (t.org_ids || []).includes(primaryOrg.id));");

fs.writeFileSync('src/components/graph/GrafoVinculos.jsx', content, 'utf8');

let mini = fs.readFileSync('src/components/graph/MiniGraph.jsx', 'utf8');
if (mini.includes('tall.org_id')) {
  mini = mini.replace(/links\.push\(\{ source: tId, target: `org-\$\{tall\.org_id\}` \}\);/g, 
    "(tall.org_ids || []).forEach(oId => links.push({ source: tId, target: `org-${oId}` }));");
  fs.writeFileSync('src/components/graph/MiniGraph.jsx', mini, 'utf8');
}
console.log('Fixed graphs');
