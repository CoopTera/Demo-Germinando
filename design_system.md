# Paleta de Colores Institucional — Dashboard Gobierno de Santa Fe

## 1. Colores de Identidad Institucional

| Color | HEX | sRGB | HSL | Rol en Dashboard |
| :--- | :--- | :--- | :--- | :--- |
| **Violeta / Azul Eléctrico** | `#3C3AE5` | `rgb(60, 58, 229)` | `hsl(241, 77%, 56%)` | Color primario: botones de acción principal, pestañas activas, KPI principal. |
| **Naranja Santa Fe** | `#FF7402` | `rgb(255, 116, 2)` | `hsl(27, 100%, 50%)` | Color de acento: estados `:hover`, indicadores de atención y alertas. |
| **Azul Pizarra** | `#494963` | `rgb(73, 73, 99)` | `hsl(240, 15%, 34%)` | Estructura: barra de navegación, títulos de módulos y cabeceras de tablas. |
| **Amarillo Institucional** | `#FFCB02` | `rgb(255, 203, 2)` | `hsl(48, 100%, 50%)` | Soporte / Alerta: métricas de advertencia y umbrales de gráficos. |
| **Rosa / Carmesí** | `#E42153` | `rgb(228, 33, 83)` | `hsl(345, 78%, 51%)` | Crítico: estados de error, métricas negativas y cancelaciones. |

### Gradiente Institucional
* **Definición:** `linear-gradient(120deg, #FFCB02 0%, #FF7402 33%, #E42153 66%, #3C3AE5 100%)`
* **Uso:** Cenefas superiores decorativas en tarjetas resumen y barras de carga.

---

## 2. Superficies y Neutros

| Superficie / Elemento | HEX | sRGB | HSL | Rol en Dashboard |
| :--- | :--- | :--- | :--- | :--- |
| **Lienzo (Canvas)** | `#F5F6F8` | `rgb(245, 246, 248)` | `hsl(220, 18%, 97%)` | Fondo general de la interfaz. |
| **Superficie (Card / Modal)** | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | Fondo de tarjetas, tablas, modales y widgets. |
| **Superficie Secundaria** | `#EAE9EE` | `rgb(234, 233, 238)` | `hsl(252, 11%, 93%)` | Fondo de cabeceras de tabla (`thead`) y filtros. |
| **Texto Principal** | `#333333` | `rgb(51, 51, 51)` | `hsl(0, 0%, 20%)` | Lectura general, cifras de métricas y datos de tabla. |
| **Borde Estructural** | `#E3E1E2` | `rgb(227, 225, 226)` | `hsl(330, 4%, 91%)` | Divisores de tabla y límites de tarjetas. |

---

## 3. Mapeo por Componente

| Componente | Elemento | Color | HEX |
| :--- | :--- | :--- | :--- |
| **Navegación** | Fondo Sidebar / Navbar | Azul Pizarra | `#494963` |
| | Ítem Activo | Violeta / Azul Eléctrico | `#3C3AE5` |
| | Texto de Ítems | Superficie Secundaria / Blanco | `#EAE9EE` / `#FFFFFF` |
| **Tarjetas KPI** | Fondo | Superficie | `#FFFFFF` |
| | Cifra Principal | Texto Principal | `#333333` |
| | Título / Etiqueta | Azul Pizarra | `#494963` |
| | Tendencia Positiva / Normal | Violeta / Azul Eléctrico | `#3C3AE5` |
| | Tendencia Alerta | Naranja Santa Fe | `#FF7402` |
| | Tendencia Crítica | Rosa / Carmesí | `#E42153` |
| **Tablas de Datos** | Cabecera (`thead`) | Superficie Secundaria / Azul Pizarra | `#EAE9EE` (Fondo) / `#494963` (Texto) |
| | Cuerpo (`tbody`) | Superficie / Texto Principal | `#FFFFFF` (Fondo) / `#333333` (Texto) |
| | Bordes / Divisores | Borde Estructural | `#E3E1E2` |
| **Acciones** | Botón Primario | Violeta / Blanco | `#3C3AE5` (Fondo) / `#FFFFFF` (Texto) |
| | Botón Secundario | Borde Azul Pizarra / Texto Azul Pizarra | `#494963` |
| | Botón / Tag Destacado | Naranja Santa Fe | `#FF7402` |

---

## 4. Matriz de Contraste (WCAG 2.1)

| Frente (FG) | Fondo (BG) | Ratio | Nivel WCAG | Aplicación |
| :--- | :--- | :--- | :--- | :--- |
| `#333333` | `#FFFFFF` | **12.63:1** | AAA | Texto normal y grande. |
| `#333333` | `#F5F6F8` | **11.85:1** | AAA | Texto normal y grande. |
| `#494963` | `#FFFFFF` | **7.15:1** | AAA | Títulos y cabeceras. |
| `#FFFFFF` | `#3C3AE5` | **5.23:1** | AA | Botones primarios y badges. |
| `#FFFFFF` | `#494963` | **7.15:1** | AAA | Navegación institucional. |
| `#FFFFFF` | `#E42153` | **4.68:1** | AA | Badges críticos y alertas. |
| `#FF7402` | `#FFFFFF` | **2.82:1** | No apto para texto regular | Exclusivo para bordes, iconos y badges con texto grande. |
