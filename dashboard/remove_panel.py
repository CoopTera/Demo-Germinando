import re

with open("src/pages/DashboardPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# The block starts with {/* Oportunidades Destacadas */} and ends with its closing </motion.div>
# Since it's right before {/* Row 2: Charts */}, we can do:
pattern = r'\{\/\*\s*Oportunidades Destacadas\s*\*\/\}.*?(?=\{\/\*\s*Row 2: Charts\s*\*\/\})'
content = re.sub(pattern, '', content, flags=re.DOTALL)

with open("src/pages/DashboardPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)
