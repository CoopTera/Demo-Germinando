const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Header.jsx', 'utf8');

// Update imports
content = content.replace(
  "import { Search, Notification, Menu, Warning, Tag, Time } from '@carbon/icons-react';",
  "import { Search, Notification, Menu, Warning, Tag, Time, SidePanelClose, SidePanelOpen } from '@carbon/icons-react';"
);

// Update component declaration
content = content.replace(
  "export default function Header({ onMenuClick }) {",
  "export default function Header({ onMenuClick, collapsed, onToggleCollapse }) {"
);

// Add desktop toggle button before search input container
const desktopToggleBtn = `
        {/* Desktop Sidebar Collapse Button */}
        <motion.button 
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center text-pizarra/70 hover:text-pizarra hover:bg-canvas rounded-xl transition-colors cursor-pointer"
          style={{ padding: '10px' }}
          title={collapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
        >
          {collapsed ? <SidePanelOpen size={20} /> : <SidePanelClose size={20} />}
        </motion.button>
`;

content = content.replace(
  `<div className="flex items-center" style={{ gap: '16px' }}>`,
  `<div className="flex items-center" style={{ gap: '16px' }}>\n${desktopToggleBtn}`
);

fs.writeFileSync('src/components/layout/Header.jsx', content, 'utf8');
console.log('Header toggle button added successfully');
