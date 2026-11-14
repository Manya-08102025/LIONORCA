import { useState, useEffect } from 'react'
import { AdminAuthProvider } from '../../context/admin/AdminAuthContext'
import { AdminDataProvider } from '../../context/admin/AdminDataContext'
import { SimpleCmsProvider } from '../../context/admin/SimpleCmsContext'
import ProtectedRoute from '../../components/admin/ProtectedRoute'
import SimpleAdminLayout from '../../components/admin/SimpleAdminLayout'
import ArchitectPublishPage from './ArchitectPublishPage'
import ProjectPublishPage from './ProjectPublishPage'
import ArticlePublishPage from './ArticlePublishPage'
import ConsultationLeads from './ConsultationLeads'
import PortfolioManager from './PortfolioManager'
import VendorTeamPortal from './VendorTeamPortal'
import DashboardOverview from './DashboardOverview'

function getInitialTab() {
  if (typeof window === 'undefined') return 'architects'
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '')
  if (path === '/admin/leads') return 'leads'
  if (path === '/admin/portfolio') return 'portfolio'
  if (path === '/admin/projects') return 'projects'
  if (path === '/admin/articles' || path === '/admin/insights') return 'articles'
  if (path === '/admin/vendors') return 'vendors'
  if (path === '/admin/dashboard') return 'dashboard'
  return 'architects'
}

function AdminContent() {
  const [currentTab, setCurrentTab] = useState(getInitialTab)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentTab(getInitialTab())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId)
    const newPath = tabId === 'architects' ? '/admin' : `/admin/${tabId}`
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath)
    }
  }

  const renderActiveModule = () => {
    switch (currentTab) {
      case 'architects':
        return <ArchitectPublishPage />
      case 'projects':
        return <ProjectPublishPage />
      case 'articles':
        return <ArticlePublishPage />
      case 'leads':
        return <ConsultationLeads />
      case 'portfolio':
        return <PortfolioManager />
      case 'vendors':
        return <VendorTeamPortal />
      case 'dashboard':
        return <DashboardOverview onNavigate={handleSelectTab} />
      default:
        return <ArchitectPublishPage />
    }
  }

  return (
    <SimpleAdminLayout currentTab={currentTab} onSelectTab={handleSelectTab}>
      {renderActiveModule()}
    </SimpleAdminLayout>
  )
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <ProtectedRoute>
        <AdminDataProvider>
          <SimpleCmsProvider>
            <AdminContent />
          </SimpleCmsProvider>
        </AdminDataProvider>
      </ProtectedRoute>
    </AdminAuthProvider>
  )
}
