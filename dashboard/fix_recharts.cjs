const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// We want to remove width and height transitions from recharts containers to avoid lagging behind the layout
const oldAnim = `
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

const newAnim = `
/* Recharts Smooth Resize Transitions */
.recharts-layer path, 
.recharts-layer rect,
.recharts-layer circle {
  transition: d 0.15s ease-out, x 0.15s ease-out, y 0.15s ease-out, cx 0.15s ease-out, cy 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out !important;
}
`;

css = css.replace(oldAnim.trim(), newAnim.trim());

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Fixed recharts CSS transitions');
