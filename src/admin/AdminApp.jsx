import { useState } from 'react'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { SimpleCmsProvider } from './context/SimpleCmsContext'
import ProtectedRoute from './components/ProtectedRoute'
import SimpleAdminLayout from './components/SimpleAdminLayout'
import ArchitectPublishPage from './pages/ArchitectPublishPage'
import ProjectPublishPage from './pages/ProjectPublishPage'
import ArticlePublishPage from './pages/ArticlePublishPage'

export default function AdminApp() {
  const [currentTab, setCurrentTab] = useState('architects')

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
    <AdminAuthProvider>
      <ProtectedRoute>
        <SimpleCmsProvider>
          <SimpleAdminLayout currentTab={currentTab} onSelectTab={setCurrentTab}>
            {renderActiveModule()}
          </SimpleAdminLayout>
        </SimpleCmsProvider>
      </ProtectedRoute>
    </AdminAuthProvider>
  )
}
