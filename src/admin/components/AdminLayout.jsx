import { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Image,
  FileText,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminData } from '../context/AdminDataContext';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'leads', label: 'Consultation Leads', icon: MessageSquare },
  { key: 'vendors', label: 'Vendor & Team', icon: Building2 },
  { key: 'portfolio', label: 'Portfolio', icon: Image },
  { key: 'articles', label: 'Insights & Articles', icon: FileText },
];

const pageTitles = {
  dashboard: 'Dashboard',
  leads: 'Consultation Leads',
  vendors: 'Vendor & Team',
  portfolio: 'Portfolio',
  articles: 'Insights & Articles',
};

export default function AdminLayout({ currentPage, onNavigate, children }) {
  const { user, logout, authMode } = useAdminAuth();
  const { dbMode, isFirebaseConfigured } = useAdminData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = pageTitles[currentPage] || 'Dashboard';

  const handleNavClick = (key) => {
    onNavigate(key);
    setSidebarOpen(false);
  };

  /* ------------------------------------------------------------------ */
  /*  Sidebar                                                           */
  /* ------------------------------------------------------------------ */
  const sidebarContent = (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-[#E6E4DD]">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#E6E4DD]">
        <img
          src="/images/lionorca-emblem-transparent.png"
          alt="Lionorca emblem"
          className="w-10 h-10 object-contain"
        />
        <div className="flex flex-col">
          <span className="font-serif text-lg leading-tight text-[#2E2D2B]">
            Lionorca
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans font-medium">
            CMS
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = currentPage === key;
          return (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`
                relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all cursor-pointer
                ${
                  isActive
                    ? 'bg-[#F4F3EE] text-[#2E2D2B] font-semibold'
                    : 'text-[#7A7772] hover:bg-[#F4F3EE]/50 hover:text-[#2E2D2B]'
                }
              `}
            >
              {/* Champagne left border accent for active item */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#C5A059]" />
              )}
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-3 pb-5 pt-3 border-t border-[#E6E4DD]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium text-[#7A7772] hover:bg-[#F4F3EE]/50 hover:text-[#2E2D2B] transition-all"
        >
          <ExternalLink className="w-[18px] h-[18px] shrink-0" />
          <span>Back to Website</span>
        </a>
      </div>
    </div>
  );

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-[#FCFCFA]">
      {/* ---- Desktop Sidebar (fixed, hidden on mobile) ---- */}
      <aside className="hidden lg:block fixed left-0 top-0 z-30">
        {sidebarContent}
      </aside>

      {/* ---- Mobile Overlay + Sidebar ---- */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Slide-in Sidebar */}
          <aside className="fixed left-0 top-0 z-50 lg:hidden animate-slide-in-left">
            {/* Close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-[-44px] w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md text-[#2E2D2B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}

      {/* ---- Top Header Bar ---- */}
      <header
        className={`
          fixed top-0 right-0 z-20 h-16 bg-white border-b border-[#E6E4DD] flex items-center justify-between px-6
          lg:left-64 left-0
        `}
      >
        {/* Left: Hamburger (mobile) + Title + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-[#7A7772] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="text-[#7A7772] hidden sm:inline">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5A059] hidden sm:block" />
            <h1 className="text-[#2E2D2B] font-semibold text-base">
              {pageTitle}
            </h1>
            <span
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide border ${
                dbMode === 'firestore'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={
                dbMode === 'firestore'
                  ? 'Connected to live Firebase Firestore'
                  : 'Operating in Local Storage cache mode (configure .env for live Firebase)'
              }
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  dbMode === 'firestore' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              {dbMode === 'firestore' ? 'Firestore Live' : 'Local Storage'}
            </span>
          </div>
        </div>

        {/* Right: User profile + Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-sans font-medium text-[#2E2D2B] leading-tight">
              {user?.name || 'Admin'}
            </span>
            <span className="text-[11px] font-sans text-[#7A7772] leading-tight">
              {user?.role || 'Administrator'}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#F4F3EE] border border-[#E6E4DD] flex items-center justify-center overflow-hidden shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-serif font-semibold text-[#C5A059]">
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            title="Logout"
            className="p-2 rounded-lg text-[#7A7772] hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </header>

      {/* ---- Main Content Area ---- */}
      <main className="lg:ml-64 mt-16 p-6 min-h-screen bg-[#FCFCFA]">
        {children}
      </main>
    </div>
  );
}
