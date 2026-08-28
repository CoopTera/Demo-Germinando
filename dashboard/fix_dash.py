import re

with open("src/pages/DashboardPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

target = r'<PageTemplate\s+title="Panel Ejecutivo"\s+subtitle="[^"]+">'
replacement = """<PageTemplate 
      title="Panel Ejecutivo" 
      subtitle="Viernes, 28 de Agosto de 2026"
      actions={
        <button 
          onClick={() => navigate('/oportunidades')}
          className="flex items-center gap-2 bg-white border border-borde rounded-md shadow-sm hover:bg-canvas transition-colors font-semibold text-sm text-texto"
          style={{ padding: '8px 16px' }}
        >
          <Tag className="text-naranja" weight="bold" />
          Oportunidades
          <span className="bg-naranja/10 text-naranja rounded-full px-2 py-0.5 text-[10px]">{oportunidades.length}</span>
        </button>
      }
    >"""

content = re.sub(target, replacement, content)

# Remove the Oportunidades panel
# We can find the <OportunidadesPanel /> or the whole div that wraps it.
# Let's see what is inside DashboardPage.jsx
content = re.sub(r'<div[^>]*>\s*<OportunidadesPanel\s*/>\s*</div>', '', content)

with open("src/pages/DashboardPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
