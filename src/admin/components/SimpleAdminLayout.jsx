import { useState } from 'react'
import {
  Users,
  Home,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useSimpleCms } from '../context/SimpleCmsContext'

const NAV_ITEMS = [
  {
    id: 'architects',
    label: 'Architect Flashcards',
    description: 'Add architect profiles',
    icon: Users,
  },
  {
    id: 'projects',
    label: 'Signature Projects',
    description: 'Add design visions & villas',
    icon: Home,
  },
  {
    id: 'articles',
    label: 'Media & Insights',
    description: 'Publish editorial articles',
    icon: FileText,
  },
]

export default function SimpleAdminLayout({ currentTab, onSelectTab, children }) {
  const { user, logout } = useAdminAuth()
  const { notification, dismissNotification } = useSimpleCms()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-neutral-800 font-sans flex flex-col lg:flex-row antialiased selection:bg-neutral-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-[200] max-w-sm bg-neutral-900 text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <p className="text-sm font-normal leading-snug">{notification.message}</p>
          <button
            onClick={dismissNotification}
            className="ml-auto text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          ULTRA-CLEAN LEFT SIDEBAR (OFFICIAL LOGO + 3 OPTIONS ONLY)
      ══════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Official Logo at Top Left Corner */}
          <div className="pt-8 pb-6 px-6 flex items-center justify-between">
            <a href="/" target="_blank" rel="noreferrer" className="block">
              <img
                src="/images/lionorca-logo-transparent.png"
                alt="Lionorca Architeriors"
                className="h-14 sm:h-16 w-auto object-contain max-w-[225px]"
                onError={(e) => {
                  e.target.src = '/images/lionorca-full-logo.jpg'
                }}
              />
            </a>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-neutral-400 hover:text-neutral-800 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation with ONLY 3 Items */}
          <nav className="px-4 py-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = currentTab === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center gap-3.5 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
                  }`}
                >
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2 : 1.75}
                    className={isActive ? 'text-amber-300' : 'text-neutral-400'}
                  />
                  <div className="min-w-0">
                    <p className="text-sm tracking-normal leading-tight truncate">
                      {item.label}
                    </p>
                    <p
                      className={`text-[11px] truncate mt-0.5 ${
                        isActive ? 'text-neutral-300' : 'text-neutral-400'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Highly Visible Sign Out & Website Link */}
        <div className="p-5 space-y-2.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} className="text-neutral-500" />
              <span>View Website</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Live</span>
          </a>

          {/* Highly Visible Sign Out Button */}
          <button
            onClick={logout}
            className="w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-200/60 shadow-xs active:scale-98"
            title="Sign out of Supabase and lock dashboard"
          >
            <LogOut size={15} strokeWidth={2} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-neutral-900/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          SEAMLESS CENTRAL WORKSPACE
      ══════════════════════════════════════════════════════════ */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Minimal Header */}
        <header className="h-16 px-6 sm:px-12 flex items-center justify-between bg-transparent">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-neutral-400">
              Founder Portal
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <p className="text-xs font-medium text-neutral-800 leading-tight">
                {user?.name || user?.email || 'Akshay Jadaun'}
              </p>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Founder &amp; Principal
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
              <img
                src={user?.avatar || '/images/akshay-jadaun.jpg'}
                alt="Akshay Jadaun"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/images/lionorca-emblem-transparent.png'
                }}
              />
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer ml-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-6 sm:px-12 py-6 max-w-4xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
