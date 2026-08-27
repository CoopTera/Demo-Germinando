# FUNCIONALIDADES DEMO DASHBOARD SECTOR PUBLICO

## ABM de organizaciones
- Nombre
- Localización
- Especialización
- Convenios Activos
- Talleres Activos
- Presupuesto implicado

## ABM de beneficiarios
- Identificación
- Programas / Organizaciones de los cuales son beneficiarios
- Fecha de inicio de beca/s
- Presupuesto beca mensual
- Ultimo registro
- Alerta sobre falta de seguimiento

## Importación de documentos
- Aparte de la información que muestra, hay que proveer la posibilidad de que el usuario pueda importar un excel o una google sheet (mediante API) y cargue información en alguna tabla (que no pise, sino que agregue).
- Definir documentos a importar!

## Incorporación de usuarios / Registro de equipo operativo:
- Director (1)
- Administrativo (1)
- Coordinador (4)

---

# Dashboard Gubernamental - Programa Germinando (MVP Visual)

Este documento define la estructura, componentes y funcionalidades para la generación de la interfaz de usuario (UI) de la plataforma de gestión ministerial "Germinando".

**Nota para el Generador:** Utiliza estrictamente la paleta de colores y estilos definidos en el archivo `design_system.md` adjunto en el repositorio.

## 1. Estructura del Layout Principal

El layout base debe mantener una estructura consistente en todas las vistas.

### Header (Barra Superior)
- **Fondo:** `#FFFFFF` (Superficie)
- **Elementos (Izquierda a Derecha):**
    - Barra de Búsqueda global.
    - Botón de "Añadir Nuevo" (Primario, `#3C3AE5`).
    - Botón de "Importar Datos" (Secundario, outline `#494963`).
    - Botón de Notificaciones (Ícono de campana) con *badge* numérico en color `#E42153` (Crítico).
    - Avatar/Botón de acceso al Perfil de Usuario (Director/Administrativo).

### Sidebar (Navegación Izquierda)
- **Fondo:** `#494963` (Azul Pizarra).
- **Texto e Íconos:** `#EAE9EE` (Superficie Secundaria).
- **Estado Activo (Hover/Seleccionado):** Fondo `#3C3AE5` (Violeta / Azul Eléctrico).
- **Opciones de Menú:**
    1. Panel Ejecutivo (Dashboard principal).
    2. Organizaciones.
    3. Beneficiarios.
    4. Gráficos.
    5. Grafo de Vínculos.

---

## 2. Vistas y Funcionalidades

### Vista 1: Panel Ejecutivo (Dashboard Principal)
Debe proveer una visión macro e inmediata del estado del programa.

#### Fila 1: Tarjetas KPI (Indicadores Clave)
Cuatro tarjetas con fondo `#FFFFFF` y borde sutil `#E3E1E2`. Deben incluir la cenefa superior con el gradiente institucional.
- **Personas Beneficiarias:** Número total + Indicador de variación (interanual/mensual) en verde/rojo.
- **Convenios Activos:** Número total + Indicador de variación.
- **Unidades Productivas:** Organizaciones con convenio + Indicador de variación.
- **Talleres:** Cantidad de talleres activos + Indicador de variación.

#### Fila 2: Alertas y Ranking
- **Columna Izquierda (Central de Alertas):**
    - Tarjeta listando alertas críticas.
    - Categorías: "Oportunidades Compra Pública" (Icono tag), "Casos sin actualización" (Icono reloj), "Convenios Próximos a vencer" (Icono calendario).
    - Uso de colores de acento (`#FF7402`, `#E42153`) para íconos de alerta.
- **Columna Derecha (Top 5):**
    - Lista compacta de las "Top 5 Organizaciones".
    - Métricas a mostrar: Cantidad de talleres y Personas beneficiarias.

### Vista 2: ABM Organizaciones
Pantalla para gestión de las unidades productivas.
- **Tabla de Datos:**
    - Cabecera (`thead`): Fondo `#EAE9EE`, Texto `#494963`.
    - Columnas: Nombre, Localización, Especialización, Convenios Activos, Talleres Activos, Presupuesto Implicado.
    - Acción: Botón/Icono de edición en cada fila.

### Vista 3: ABM Beneficiarios
Pantalla para gestión y seguimiento de las personas.
- **Tabla de Datos:**
    - Columnas: Identificación (DNI), Programas/Organizaciones (Tags/Píldoras), Fecha inicio beca, Presupuesto beca mensual, Último registro.
    - **Condicional visual:** Si la columna "Último registro" tiene una alerta por falta de seguimiento, resaltar la fila o el dato en `#FF7402` (Naranja Santa Fe).

### Vista 4: Gráficos y Grafo (Módulo de Inteligencia)
- **Sección Gráficos:**
    - Placeholder para Gráfico de líneas/barras: "Evolución de organizaciones (interanual y mensual)".
    - Placeholder para Gráfico de área: "Evolución de presupuesto ejecutado".
- **Sección Grafo de Vínculos:**
    - Un lienzo interactivo amplio.
    - Representación visual de nodos interconectados (Organizaciones sociales, Unidades productivas, Otras áreas del Estado, Beneficiarios).
    - Estilo visual sugerido: Similar a la vista de grafo de Obsidian.

---

## 3. Módulo de Importación (Modal/Overlay)
Accionado desde el botón "Importar Datos" en el Header.
- **Funcionalidad:** Permite agregar datos (Append) sin sobreescribir (No Replace) vía Excel/CSV o API.
- **Opciones de Importación a mostrar:**
    1.  **Padrón de Beneficiarios:** (Columnas: DNI, Nombre, Localidad, Organización, Beca).
    2.  **Actualización de Ejecución (Gastos):** (Columnas: CUIT Org, Nro Convenio, Gasto, Concepto, Fecha).
    3.  **Catálogo de Oferta Productiva:** (Columnas: ID Org, Producto/Servicio, Capacidad).

---

## 4. Tipos de Usuarios (Perfiles)
La interfaz debe contemplar (al menos a nivel informativo o en el Perfil) la existencia de estos roles operativos:
- Director (1)
- Administrativo (1)
- Coordinador (4)
