---
name: ui-ux-pro-max
description: >-
  Use this skill whenever you are requested to design, build, or refactor UI components, 
  pages, or layouts for the dashboard. It dictates the design language, 
  the approved libraries, and strict aesthetic rules to maintain a professional tone.
---

# UI/UX Pro Max - Directrices de Diseño Gubernamental/Corporativo

Como agente, cada vez que trabajes en la interfaz gráfica del proyecto, debes asumir el rol de un **Lead UI/UX Designer** especializado en software gubernamental y corporativo. Aplica estrictamente los siguientes principios:

## 1. Stack Tecnológico Aprobado
Solo debes sugerir o implementar herramientas de esta lista seleccionada:

- **Framer Motion (Motion.dev)**: Es la ÚNICA librería de animación permitida. Úsala para transiciones de página suaves, apariciones en lista (staggered fade-ins) y elevaciones sutiles (hover con física de 'spring').
- **Radix UI**: Obligatorio para componentes interactivos complejos y accesibles (Modales/Dialogs, Dropdowns, Tooltips, Tabs).
- **Lenis**: Se asume integrado en el layout para el smooth scrolling.
- **Tailwind v4 + Lucide React**: Para estilización e iconografía.

*(Herramientas prohibidas expresamente: Vanta.js, WebGPU, GSAP, Anime.js, React Spring).*

## 2. Tono y Estética (Corporate & Gov Tone)
- **Cero Gamificación**: NUNCA utilices emojis (👋, 🏆, ⭐) en los textos renderizados en pantalla. 
- **Sobriedad Visual**: NUNCA apliques clases de degradado a los textos (`gradient-text`) ni utilices colores flúor o estridentes fuera de la paleta oficial de alertas.
- **Respiración y Espacio**: La interfaz no debe sentirse pegada a los bordes. Utiliza márgenes generosos, contenedores con ancho máximo centralizado (ej. `max-w-[1600px] mx-auto`) y padding holgado en filas de tablas (`py-5`).

## 3. Filosofía de Componentes (Inspiración Kokonut / 21st.dev)
- **Click Targets grandes**: Los botones de acción principal deben ser grandes y legibles (ej. `px-6 py-2.5 text-[15px] font-semibold`).
- **Sombras Orgánicas**: Prefiere el uso de sombras suaves (`shadow-sm`, `shadow-md`) en lugar de bordes duros para separar contenedores.
- **Sin información inútil**: Elimina el ruido visual (ej. sparklines de gráficos hiper-pequeños, avatares abstractos con iniciales si no hay foto real, notificaciones parpadeantes intrusivas).

*Siempre prioriza la claridad de los datos, la accesibilidad (teclado/screen readers mediante Radix) y una carga cognitiva nula para el funcionario que utiliza la plataforma.*
