var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/pages/OportunidadesPage.jsx
var OportunidadesPage_exports = {};
__export(OportunidadesPage_exports, {
  default: () => OportunidadesPage
});
module.exports = __toCommonJS(OportunidadesPage_exports);
var import_react2 = __toESM(require("react"), 1);
var import_lucide_react2 = require("lucide-react");

// src/components/layout/PageTemplate.jsx
var import_react = __toESM(require("react"), 1);
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var containerVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
var itemVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};
function PageTemplate({
  icon: Icon,
  title,
  subtitle,
  onImport,
  onNew,
  newButtonText,
  stats = [],
  busqueda,
  setBusqueda,
  filtros = [],
  filtroActivo,
  setFiltroActivo,
  viewMode,
  // 'list' or 'grid' (optional)
  setViewMode,
  // function (optional)
  totalItems,
  filteredItemsCount,
  children
}) {
  const fileInputRef = (0, import_react.useRef)(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImport) {
      onImport(file);
    }
    e.target.value = null;
  };
  return /* @__PURE__ */ import_react.default.createElement(
    import_framer_motion.motion.div,
    {
      className: "flex flex-col",
      style: { gap: "24px" },
      variants: containerVariants,
      initial: "hidden",
      animate: "show"
    },
    /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants, className: "flex flex-col md:flex-row md:items-end justify-between gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-2xl font-bold text-pizarra flex items-center", style: { gap: "8px" } }, Icon && /* @__PURE__ */ import_react.default.createElement(Icon, { style: { width: "24px", height: "24px" } }), title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-pizarra/50", style: { marginTop: "4px" } }, subtitle)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center", style: { gap: "12px" } }, onImport && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "file",
        accept: ".xlsx, .xls",
        ref: fileInputRef,
        onChange: handleFileChange,
        style: { display: "none" }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => fileInputRef.current?.click(),
        className: "flex items-center border border-borde bg-white hover:bg-canvas text-pizarra text-[14px] font-semibold rounded-md transition-colors shadow-sm cursor-pointer",
        style: { padding: "10px 20px", gap: "8px" }
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Upload, { className: "stroke-[2.5]", style: { width: "18px", height: "18px" } }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "Importar")
    )), onNew && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: onNew,
        className: "flex items-center bg-primario hover:bg-primario/90 text-white text-[14px] font-semibold rounded-lg transition-colors shadow-sm cursor-pointer",
        style: { padding: "10px 20px", gap: "8px" }
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Plus, { style: { width: "16px", height: "16px" } }),
      newButtonText || "Nuevo Registro"
    ))),
    stats.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants, className: "flex flex-wrap items-center", style: { gap: "16px" } }, stats.map((stat, idx) => /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        key: idx,
        className: `bg-white rounded-lg border text-sm flex items-center card-elevated ${stat.bgColor || "border-borde"}`,
        style: { padding: "10px 16px", gap: stat.icon ? "8px" : "0" }
      },
      stat.icon && /* @__PURE__ */ import_react.default.createElement(stat.icon, { className: `${stat.iconColor} ${stat.pulse ? "animate-pulse-soft" : ""}`, style: { width: "16px", height: "16px" } }),
      /* @__PURE__ */ import_react.default.createElement("span", { className: stat.labelColor || "text-pizarra/50", style: { marginRight: "4px" } }, stat.label, ":"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: `font-bold ${stat.valueColor || "text-pizarra"}` }, stat.value)
    ))),
    /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants, className: "flex flex-col xl:flex-row xl:items-center justify-between gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col md:flex-row md:items-center flex-1", style: { gap: "16px" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative flex-1", style: { maxWidth: "320px" } }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Search, { className: "text-pizarra/40 absolute", style: { width: "16px", height: "16px", left: "12px", top: "50%", transform: "translateY(-50%)" } }), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "Buscar...",
        value: busqueda,
        onChange: (e) => setBusqueda(e.target.value),
        className: "w-full bg-white text-texto placeholder:text-pizarra/40 text-sm rounded-lg border border-borde focus:outline-none focus:ring-2 focus:ring-primario/20 focus:border-primario/30 transition-all shadow-sm",
        style: { padding: "8px 16px 8px 36px" }
      }
    )), filtros.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center overflow-x-auto pb-1 hide-scrollbar", style: { gap: "6px" } }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Filter, { className: "text-pizarra/40 shrink-0", style: { width: "16px", height: "16px", marginRight: "4px" } }), filtros.map((f) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: f,
        onClick: () => setFiltroActivo(f),
        className: `whitespace-nowrap rounded-full text-xs font-semibold transition-all cursor-pointer border ${filtroActivo === f ? f === "Sin seguimiento" ? "bg-naranja text-white border-naranja shadow-sm" : "bg-primario text-white border-primario shadow-sm" : "bg-white text-pizarra/70 border-borde hover:border-primario/30 hover:text-primario"}`,
        style: { padding: "6px 12px" }
      },
      f
    )))), setViewMode && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center bg-white border border-borde rounded-md p-1 shrink-0 shadow-sm" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setViewMode("list"),
        className: `rounded cursor-pointer transition-colors ${viewMode === "list" ? "bg-canvas text-primario shadow-sm" : "text-pizarra/50 hover:text-pizarra"}`,
        title: "Vista de Lista",
        style: { padding: "6px" }
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.List, { style: { width: "16px", height: "16px" } })
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setViewMode("grid"),
        className: `rounded cursor-pointer transition-colors ${viewMode === "grid" ? "bg-canvas text-primario shadow-sm" : "text-pizarra/50 hover:text-pizarra"}`,
        title: "Vista de Tarjetas",
        style: { padding: "6px" }
      },
      /* @__PURE__ */ import_react.default.createElement(import_lucide_react.LayoutGrid, { style: { width: "16px", height: "16px" } })
    ))),
    /* @__PURE__ */ import_react.default.createElement(import_framer_motion.motion.div, { variants: itemVariants }, children, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between", style: { marginTop: "16px", padding: "0 8px" } }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-pizarra/40 font-medium" }, "Mostrando ", /* @__PURE__ */ import_react.default.createElement("span", { className: "font-semibold text-pizarra/60" }, filteredItemsCount), " de", " ", /* @__PURE__ */ import_react.default.createElement("span", { className: "font-semibold text-pizarra/60" }, totalItems), " registros"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center", style: { gap: "4px" } }, /* @__PURE__ */ import_react.default.createElement("button", { className: "rounded-lg text-xs font-medium bg-primario text-white cursor-pointer", style: { padding: "6px 12px" } }, "1"), /* @__PURE__ */ import_react.default.createElement("button", { className: "rounded-lg text-xs font-medium text-pizarra/50 hover:bg-superficie-sec cursor-pointer", style: { padding: "6px 12px" } }, "2"))))
  );
}

// src/data/mockData.js
var oportunidades = [
  { id: 1, titulo: "Licitaci\xF3n Indumentaria", organizador: "Min. de Desarrollo Social", fecha: "Vence en 5 d\xEDas" },
  { id: 2, titulo: "Fondo Semilla Emprendedor", organizador: "Secretar\xEDa de Industria", fecha: "Abre ma\xF1ana" },
  { id: 3, titulo: "Capacitaci\xF3n Tecnol\xF3gica", organizador: "Programa Nodos", fecha: "Cupos disponibles" }
];

// src/pages/OportunidadesPage.jsx
function OportunidadesPage() {
  const [busqueda, setBusqueda] = (0, import_react2.useState)("");
  const [filtroActivo, setFiltroActivo] = (0, import_react2.useState)("Todas");
  const [viewMode, setViewMode] = (0, import_react2.useState)("grid");
  const FILTROS = ["Todas", "Licitaciones", "Fondos", "Capacitaciones"];
  const filteredData = oportunidades.filter((opt) => {
    const matchesSearch = opt.titulo?.toLowerCase()?.includes(busqueda.toLowerCase()) || opt.organizador?.toLowerCase()?.includes(busqueda.toLowerCase());
    const matchesFiltro = filtroActivo === "Todas" || filtroActivo === "Licitaciones" && opt.titulo?.includes("Licitaci\xF3n") || filtroActivo === "Fondos" && opt.titulo?.includes("Fondo") || filtroActivo === "Capacitaciones" && opt.titulo?.includes("Capacitaci\xF3n");
    return matchesSearch && matchesFiltro;
  });
  const stats = [
    { label: "Oportunidades Activas", value: oportunidades.length },
    { label: "Vencen pronto", value: "2", valueColor: "text-naranja" }
  ];
  return /* @__PURE__ */ import_react2.default.createElement(
    PageTemplate,
    {
      icon: import_lucide_react2.Bookmark,
      title: "Oportunidades",
      subtitle: "Buscador de licitaciones, fondos y capacitaciones",
      onNew: () => console.log("Nueva oportunidad"),
      newButtonText: "Nueva Oportunidad",
      stats,
      busqueda,
      setBusqueda,
      filtros: FILTROS,
      filtroActivo,
      setFiltroActivo,
      viewMode,
      setViewMode,
      totalItems: oportunidades.length,
      filteredItemsCount: filteredData.length
    },
    /* @__PURE__ */ import_react2.default.createElement("div", { className: viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4", style: viewMode === "grid" ? { gap: "24px" } : { gap: "16px" } }, filteredData.map((item) => /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        key: item.id,
        className: "bg-white rounded-xl shadow-sm border border-borde p-6 hover:shadow-md transition-shadow flex flex-col card-elevated cursor-pointer",
        style: { padding: "24px" }
      },
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between items-start", style: { marginBottom: "16px" } }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-primario/10 text-primario rounded-lg flex items-center justify-center shrink-0", style: { width: "48px", height: "48px" } }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.Bookmark, { style: { width: "24px", height: "24px" } })), /* @__PURE__ */ import_react2.default.createElement("span", { className: "inline-flex items-center rounded-full text-xs font-bold uppercase tracking-wider bg-canvas border border-borde text-pizarra", style: { padding: "4px 12px" } }, item.titulo?.includes("Licitaci\xF3n") ? "Licitaci\xF3n" : item.titulo?.includes("Fondo") ? "Fondo" : "Capacitaci\xF3n")),
      /* @__PURE__ */ import_react2.default.createElement("h3", { className: "font-bold text-texto text-lg leading-tight", style: { marginBottom: "8px" } }, item.titulo),
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex flex-col", style: { gap: "8px", marginBottom: "24px" } }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center text-sm font-medium text-pizarra/80", style: { gap: "8px" } }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.MapPin, { className: "text-pizarra/50", style: { width: "16px", height: "16px" } }), item.organizador), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center text-sm font-medium text-pizarra/80", style: { gap: "8px" } }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.Calendar, { className: "text-pizarra/50", style: { width: "16px", height: "16px" } }), item.fecha)),
      /* @__PURE__ */ import_react2.default.createElement("div", { className: "mt-auto pt-4 border-t border-borde flex items-center justify-between", style: { paddingTop: "16px" } }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-sm font-semibold text-primario" }, "Ver detalles"), /* @__PURE__ */ import_react2.default.createElement(import_lucide_react2.ExternalLink, { className: "text-primario", style: { width: "16px", height: "16px" } }))
    )), filteredData.length === 0 && /* @__PURE__ */ import_react2.default.createElement("div", { className: "col-span-full text-center text-pizarra/60 font-medium bg-white rounded-xl border border-borde", style: { padding: "48px 0" } }, "No se encontraron oportunidades que coincidan con la b\xFAsqueda."))
  );
}
