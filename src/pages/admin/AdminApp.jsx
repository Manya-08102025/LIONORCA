import { useState, useEffect } from 'react'
import { AdminAuthProvider } from '../../context/admin/AdminAuthContext'
import { SimpleCmsProvider } from '../../context/admin/SimpleCmsContext'
import ProtectedRoute from '../../components/admin/ProtectedRoute'
import SimpleAdminLayout from '../../components/admin/SimpleAdminLayout'
import ArchitectPublishPage from './ArchitectPublishPage'
import ProjectPublishPage from './ProjectPublishPage'
import ArticlePublishPage from './ArticlePublishPage'

function getInitialTab() {
  if (typeof window === 'undefined') return 'architects'
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '')
  if (path === '/admin/projects') return 'projects'
  if (path === '/admin/articles' || path === '/admin/insights') return 'articles'
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
        <SimpleCmsProvider>
          <AdminContent />
        </SimpleCmsProvider>
      </ProtectedRoute>
    </AdminAuthProvider>
  )
}
