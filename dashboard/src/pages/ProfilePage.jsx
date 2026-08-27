import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Shield, Activity, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function ProfilePage() {
  return (
    <motion.div 
      className="flex flex-col"
      style={{ gap: '32px', maxWidth: '1000px', margin: '0 auto' }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-pizarra" style={{ marginBottom: '8px' }}>Mi Perfil</h1>
        <p className="text-[15px] text-pizarra/70 font-medium">Gestión de cuenta y configuración personal</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '32px' }}>
        {/* Left Column: ID & Basic Info */}
        <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col" style={{ gap: '24px' }}>
          {/* Avatar Card */}
          <div className="bg-white rounded-md shadow-sm border border-borde flex flex-col items-center text-center card-elevated" style={{ padding: '32px' }}>
            <div className="bg-pizarra rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md" style={{ width: '96px', height: '96px', marginBottom: '16px' }}>
              DG
            </div>
            <h2 className="text-xl font-bold text-texto" style={{ marginBottom: '4px' }}>Director General</h2>
            <p className="text-sm text-primario font-semibold rounded-full" style={{ marginBottom: '16px', backgroundColor: 'rgba(60, 58, 229, 0.1)', padding: '4px 12px' }}>Administrador Global</p>
            <p className="text-sm text-pizarra/70" style={{ marginBottom: '24px' }}>Ministerio de Desarrollo Social<br/>Programa Germinando</p>
            <button className="w-full bg-canvas hover:bg-superficie-sec text-texto text-sm font-semibold rounded border border-borde transition-colors cursor-pointer" style={{ padding: '10px 0' }}>
              Cambiar Fotografía
            </button>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-md shadow-sm border border-borde card-elevated" style={{ padding: '24px' }}>
            <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider" style={{ marginBottom: '20px' }}>Información de Contacto</h3>
            <div className="flex flex-col" style={{ gap: '16px' }}>
              <div className="flex items-center" style={{ gap: '12px' }}>
                <div className="rounded-full bg-canvas flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                  <Mail className="text-pizarra/70" style={{ width: '16px', height: '16px' }} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-pizarra/60 font-semibold uppercase">Correo Electrónico</p>
                  <p className="text-sm font-medium text-texto truncate">dg@germinando.gob.ar</p>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: '12px' }}>
                <div className="rounded-full bg-canvas flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                  <Phone className="text-pizarra/70" style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <p className="text-xs text-pizarra/60 font-semibold uppercase">Teléfono Directo</p>
                  <p className="text-sm font-medium text-texto">+54 9 341 555-0192</p>
                </div>
              </div>
              <div className="flex items-center" style={{ gap: '12px' }}>
                <div className="rounded-full bg-canvas flex items-center justify-center shrink-0" style={{ width: '32px', height: '32px' }}>
                  <MapPin className="text-pizarra/70" style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <p className="text-xs text-pizarra/60 font-semibold uppercase">Sede de Trabajo</p>
                  <p className="text-sm font-medium text-texto">Rosario, Santa Fe</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Settings & Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col" style={{ gap: '24px' }}>
          {/* Work Details */}
          <div className="bg-white rounded-md shadow-sm border border-borde card-elevated" style={{ padding: '24px' }}>
            <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider" style={{ marginBottom: '20px' }}>Detalles del Cargo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
              <div>
                <p className="text-xs text-pizarra/60 font-semibold uppercase" style={{ marginBottom: '4px' }}>Cargo / Puesto</p>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Briefcase className="text-primario" style={{ width: '16px', height: '16px' }} />
                  <p className="text-sm font-medium text-texto">Director General de Gestión Social</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-pizarra/60 font-semibold uppercase" style={{ marginBottom: '4px' }}>Nivel de Acceso</p>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Shield className="text-exito" style={{ width: '16px', height: '16px' }} />
                  <p className="text-sm font-medium text-texto">Nivel 5 (Lectura y Escritura total)</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-pizarra/60 font-semibold uppercase" style={{ marginBottom: '4px' }}>Fecha de Ingreso</p>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Calendar className="text-pizarra/70" style={{ width: '16px', height: '16px' }} />
                  <p className="text-sm font-medium text-texto">15 de Marzo, 2024</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-pizarra/60 font-semibold uppercase" style={{ marginBottom: '4px' }}>Última Conexión</p>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Activity className="text-pizarra/70" style={{ width: '16px', height: '16px' }} />
                  <p className="text-sm font-medium text-texto">Hace 15 minutos (Esta sesión)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="bg-white rounded-md shadow-sm border border-borde card-elevated" style={{ padding: '24px' }}>
            <h3 className="text-sm font-bold text-pizarra uppercase tracking-wider" style={{ marginBottom: '20px' }}>Actualizar Información</h3>
            <form className="flex flex-col" style={{ gap: '20px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  <label className="text-xs font-bold text-texto uppercase">Nombre Completo</label>
                  <input type="text" defaultValue="Director General" className="bg-canvas border border-borde rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primario/30 focus:border-primario/40 transition-all" style={{ padding: '10px' }} />
                </div>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  <label className="text-xs font-bold text-texto uppercase">Correo Electrónico</label>
                  <input type="email" defaultValue="dg@germinando.gob.ar" className="bg-canvas border border-borde rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primario/30 focus:border-primario/40 transition-all" style={{ padding: '10px' }} />
                </div>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  <label className="text-xs font-bold text-texto uppercase">Teléfono</label>
                  <input type="text" defaultValue="+54 9 341 555-0192" className="bg-canvas border border-borde rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primario/30 focus:border-primario/40 transition-all" style={{ padding: '10px' }} />
                </div>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  <label className="text-xs font-bold text-texto uppercase">Sede</label>
                  <select className="bg-canvas border border-borde rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primario/30 focus:border-primario/40 transition-all" style={{ padding: '10px' }}>
                    <option>Rosario, Santa Fe</option>
                    <option>Santa Fe Capital</option>
                    <option>Reconquista, Santa Fe</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-borde flex justify-end" style={{ paddingTop: '20px', marginTop: '8px' }}>
                <button type="button" className="bg-primario hover:bg-primario/90 text-white text-sm font-semibold rounded transition-colors shadow-sm cursor-pointer" style={{ padding: '10px 24px' }}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
