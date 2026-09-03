const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8');

// Remove SidePanelOpen, SidePanelClose imports if not used inside Sidebar
// Remove the motion.button for desktop toggle inside the brand header
content = content.replace(/<motion\.button[\s\S]*?title=\{collapsed \? 'Expandir panel' : 'Contraer panel'\}[\s\S]*?<\/motion\.button>/g, '');

fs.writeFileSync('src/components/layout/Sidebar.jsx', content, 'utf8');
console.log('Sidebar toggle button removed successfully');
