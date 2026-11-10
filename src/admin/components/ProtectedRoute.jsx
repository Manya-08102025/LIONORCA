import { useAdminAuth } from '../context/AdminAuthContext'
import LoginPage from '../pages/LoginPage'

/**
 * Protected Route Wrapper for Lionorca Admin Dashboard
 * Verifies Supabase session on load. If no active session exists,
 * immediately renders the LoginPage component.
 */
export default function ProtectedRoute({ children }) {
  const { session, isAuthenticated, isLoading } = useAdminAuth()

  // 1. Loading state while checking supabase.auth.getSession()
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-sans">
            Verifying Supabase Session...
          </span>
        </div>
      </div>
    )
  }

  // 2. Immediate redirect to Login component if no active session exists
  if (!session || !isAuthenticated) {
    return <LoginPage />
  }

  // 3. Valid active Supabase session confirmed -> render dashboard
  return children
}
