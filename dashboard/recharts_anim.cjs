const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const rechartsAnim = `

/* Recharts Smooth Resize Transitions */
.recharts-responsive-container {
  transition: width 0.3s ease-out, height 0.3s ease-out !important;
}
.recharts-surface {
  transition: width 0.3s ease-out, height 0.3s ease-out !important;
}
.recharts-layer path, 
.recharts-layer rect,
.recharts-layer circle,
.recharts-layer text {
  transition: d 0.3s ease-out, x 0.3s ease-out, y 0.3s ease-out, cx 0.3s ease-out, cy 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out !important;
}
`;

if (!css.includes('.recharts-responsive-container')) {
  css += rechartsAnim;
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Recharts CSS transitions added successfully');
} else {
  console.log('Recharts CSS transitions already exist');
}
