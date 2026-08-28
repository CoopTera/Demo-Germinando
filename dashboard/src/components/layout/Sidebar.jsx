import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LogoSantaFe from '../../assets/logo-santa-fe.png'
import {
  Sprout,
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Network,
  Bookmark,
  Briefcase,
  BookOpen
} from 'lucide-react'

const navSections = [
  {
    category: 'PRINCIPAL',
    items: [
      { name: 'Panel Ejecutivo', path: '/', icon: LayoutDashboard, end: true },
      { name: 'Oportunidades', path: '/oportunidades', icon: Bookmark },
      { name: 'Organizaciones', path: '/organizaciones', icon: Building2 },
      { name: 'Beneficiarios', path: '/beneficiarios', icon: Users },
      { name: 'Convenios', path: '/convenios', icon: Briefcase },
      { name: 'Talleres', path: '/talleres', icon: BookOpen },
    ],
  },
  {
    category: 'ANÁLISIS',
    items: [
      { name: 'Gráficos', path: '/graficos', icon: BarChart3 },
      { name: 'Grafo de Vínculos', path: '/grafo', icon: Network },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(101, 34, 48, 0.5)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-[280px] h-screen shrink-0 text-white flex flex-col justify-between z-50 shadow-2xl lg:shadow-lg select-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: '#652230' }}
      >
      <div className="flex flex-col min-h-0">
        {/* Brand / Logo */}
        <div className="h-24 flex items-center border-b border-white/10 shrink-0" style={{ padding: '0 32px', gap: '16px' }}>
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden" style={{ padding: '4px' }}>
            <img src={LogoSantaFe} alt="Santa Fe Provincia" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">
              Germinando
            </h1>
            <p className="text-[12px] text-white/70 font-medium whitespace-nowrap">
              Gobierno de Santa Fe
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="overflow-y-auto" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          {navSections.map((section) => (
            <div key={section.category} className="mb-2">
              <div className="flex flex-col">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? '#4A1621' : 'transparent',
                        padding: '16px 40px',
                        gap: '16px'
                      })}
                      className={({ isActive }) =>
                        `relative flex items-center text-[15px] transition-all duration-150 ${
                          isActive
                            ? 'text-white font-semibold'
                            : 'text-white/90 hover:bg-white/5 hover:text-white font-medium'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div 
                              className="absolute bg-white rounded-full" 
                              style={{ width: '6px', height: '6px', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                          )}
                          <Icon className="shrink-0" style={{ width: '20px', height: '20px' }} />
                          <span className="truncate">{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div style={{ paddingTop: '16px', paddingBottom: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <NavLink
          to="/perfil"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#4A1621' : 'transparent',
            padding: '16px 40px',
            gap: '16px',
            display: 'flex',
            alignItems: 'center'
          })}
          className={({ isActive }) =>
            `relative text-[15px] transition-all duration-150 ${
              isActive
                ? 'text-white font-semibold'
                : 'text-white/90 hover:bg-white/5 hover:text-white font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div 
                  className="absolute bg-white rounded-full" 
                  style={{ width: '6px', height: '6px', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
              )}
              <div className="rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] shrink-0" style={{ width: '24px', height: '24px' }}>
                DG
              </div>
              <span className="truncate">Director General</span>
            </>
          )}
        </NavLink>
      </div>

      {/* Footer */}
      <div className="pb-6 pt-2 text-center shrink-0">
        <p className="text-xs text-superficie-sec/60">
          Programa Germinando © 2026
        </p>
      </div>
    </aside>
    </>
  )
}
