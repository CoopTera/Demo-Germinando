const fs = require('fs');
let text = fs.readFileSync('src/data/mockData.js', 'utf8');

let count = 0;
text = text.replace(/"estado": "Activo"/g, (match) => {
  if (count < 4) {
    count++;
    return '"estado": "Sin seguimiento", "alerta": true';
  }
  return match;
});

fs.writeFileSync('src/data/mockData.js', text, 'utf8');
console.log('Fixed and added Sin seguimiento.');
