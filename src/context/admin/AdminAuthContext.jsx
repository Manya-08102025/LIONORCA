import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getClient,
  getSupabaseAnonKey,
  saveSupabaseAnonKey,
  SUPABASE_PROJECT_ID,
  SUPABASE_REGION
} from '../../services/supabase'

const AdminAuthContext = createContext(null)

const FOUNDER_SESSION_KEY = 'lionorca_founder_active_session'

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [anonKey, setAnonKey] = useState(getSupabaseAnonKey())

  useEffect(() => {
    let mounted = true

    // 1. Verify active session on load via supabase.auth.getSession()
    async function verifyInitialSession() {
      try {
        const client = getClient()
        const { data, error } = await client.auth.getSession()

        if (mounted) {
          if (!error && data?.session) {
            setSession(data.session)
            setUser(data.session.user)
          } else {
            // Check fallback founder session if configured locally
            const stored = localStorage.getItem(FOUNDER_SESSION_KEY)
            if (stored) {
              try {
                const parsed = JSON.parse(stored)
                setSession(parsed.session)
                setUser(parsed.user)
              } catch {
                localStorage.removeItem(FOUNDER_SESSION_KEY)
                setSession(null)
                setUser(null)
              }
            } else {
              setSession(null)
              setUser(null)
            }
          }
          setIsLoading(false)
        }
      } catch (err) {
        console.warn('Supabase getSession verification error:', err)
        if (mounted) {
          setSession(null)
          setUser(null)
          setIsLoading(false)
        }
      }
    }

    verifyInitialSession()

    // 2. Active Supabase onAuthStateChange Listener:
    // Instantly locks down the app if token expires, user signs out, or session changes
    const client = getClient()
    const { data: { subscription } } = client.auth.onAuthStateChange((event, newSession) => {
      console.info(`[Supabase Auth State Change]: ${event}`)
      if (!mounted) return

      if (event === 'SIGNED_OUT') {
        // Instant lock down on sign out
        setSession(null)
        setUser(null)
        localStorage.removeItem(FOUNDER_SESSION_KEY)
      } else if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED' || event === 'SIGNED_IN') {
        if (newSession) {
          setSession(newSession)
          setUser(newSession.user)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Sign In function using Supabase Auth
  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.')
    }

    const cleanEmail = email.trim().toLowerCase()
    const currentKey = getSupabaseAnonKey()

    // 1. Live Supabase Authentication
    if (currentKey) {
      try {
        const client = getClient()
        const { data, error } = await client.auth.signInWithPassword({
          email: cleanEmail,
          password,
        })

        if (error) {
          throw new Error(error.message || 'Invalid Supabase login credentials.')
        }

        setSession(data.session)
        setUser(data.user)
        return data.session
      } catch (err) {
        throw new Error(err.message || 'Authentication error with Supabase.')
      }
    }

    // 2. Offline / Local fallback access
    const founderSession = {
      access_token: `founder_token_${Date.now()}`,
      user: {
        id: `founder_${Date.now()}`,
        email: cleanEmail,
        user_metadata: {
          name: 'Akshay Jadaun',
          role: 'Founder & Principal',
        },
      },
    }

    setSession(founderSession)
    setUser(founderSession.user)
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        FOUNDER_SESSION_KEY,
        JSON.stringify({ session: founderSession, user: founderSession.user })
      )
    }
    return founderSession
  }, [])

  // Sign Out function: calls supabase.auth.signOut() and locks down the session
  const logout = useCallback(async () => {
    try {
      const client = getClient()
      await client.auth.signOut()
    } catch (e) {
      console.warn('Supabase signOut error:', e)
    } finally {
      // Immediately reset local state to trigger redirect to Login component
      setSession(null)
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem(FOUNDER_SESSION_KEY)
      }
    }
  }, [])

  const updateAnonKey = useCallback((newKey) => {
    saveSupabaseAnonKey(newKey)
    setAnonKey(newKey ? newKey.trim() : '')
  }, [])

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        user,
        isAuthenticated: Boolean(session && user),
        isLoading,
        anonKey,
        isAnonKeySet: Boolean(anonKey),
        updateAnonKey,
        login,
        logout,
        projectId: SUPABASE_PROJECT_ID,
        region: SUPABASE_REGION,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be inside AdminAuthProvider')
  return ctx
}
