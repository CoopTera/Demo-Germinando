import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Sprout,
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Network
} from 'lucide-react'

const navSections = [
  {
    category: 'PRINCIPAL',
    items: [
      { name: 'Panel Ejecutivo', path: '/', icon: LayoutDashboard, end: true },
      { name: 'Organizaciones', path: '/organizaciones', icon: Building2 },
      { name: 'Beneficiarios', path: '/beneficiarios', icon: Users },
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
        <div className="h-24 flex items-center border-b border-white/10 shrink-0" style={{ padding: '0 40px', gap: '16px' }}>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide text-white">
              Germinando
            </h1>
            <p className="text-[13px] text-white/70 font-medium">
              Gestión Social
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

      {/* Footer */}
      <div className="p-6 border-t border-white/10 text-center shrink-0">
        <p className="text-xs text-superficie-sec/60">
          Programa Germinando © 2026
        </p>
      </div>
    </aside>
    </>
  )
}


