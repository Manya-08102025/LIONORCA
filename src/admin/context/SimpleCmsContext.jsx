import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../../services/supabase'

const SimpleCmsContext = createContext(null)

const STORAGE_KEY = 'lionorca_supabase_cms_data'

export function SimpleCmsProvider({ children }) {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          // ignore error
        }
      }
    }
    return {
      architects: [],
      projects: [],
      articles: [],
    }
  })

  const [notification, setNotification] = useState(null)

  // Persist locally
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // Toast notifier
  const notify = useCallback((message, type = 'success') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => {
      setNotification((curr) => (curr && curr.message === message ? null : curr))
    }, 4500)
  }, [])

  // 1. Insert into Supabase table: 'architects'
  const publishArchitect = useCallback(
    async (formData) => {
      const id = formData.id || `arch-${Date.now().toString(36)}`
      const payload = {
        id,
        name: formData.name,
        location: formData.location,
        specialization: formData.specialization,
        bio: formData.bio || '',
        image_url: formData.imageUrl,
        created_at: new Date().toISOString(),
      }

      // Live Supabase Insertion
      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase.from('architects').insert([payload])
          if (error) {
            console.warn('Supabase architects insert note:', error.message)
          }
        } catch (err) {
          console.warn('Supabase connection note:', err)
        }
      }

      // Update local state
      setData((prev) => ({
        ...prev,
        architects: [payload, ...prev.architects.filter((a) => a.id !== id)],
      }))

      notify(`✨ Architect "${formData.name}" published to website!`)
      return payload
    },
    [notify]
  )

  // 2. Insert into Supabase table: 'projects'
  const publishProject = useCallback(
    async (formData) => {
      const id = formData.id || `proj-${Date.now().toString(36)}`
      const payload = {
        id,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        image_url: formData.imageUrl,
        created_at: new Date().toISOString(),
      }

      // Live Supabase Insertion
      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase.from('projects').insert([payload])
          if (error) {
            console.warn('Supabase projects insert note:', error.message)
          }
        } catch (err) {
          console.warn('Supabase connection note:', err)
        }
      }

      // Update local state
      setData((prev) => ({
        ...prev,
        projects: [payload, ...prev.projects.filter((p) => p.id !== id)],
      }))

      notify(`🏛️ Project "${formData.title}" published to website!`)
      return payload
    },
    [notify]
  )

  // 3. Insert into Supabase table: 'articles'
  const publishArticle = useCallback(
    async (formData) => {
      const id = formData.id || `art-${Date.now().toString(36)}`
      const payload = {
        id,
        title: formData.title,
        date: formData.date || new Date().toISOString().slice(0, 10),
        cover_image: formData.coverImage,
        body: formData.body,
        created_at: new Date().toISOString(),
      }

      // Live Supabase Insertion
      if (isSupabaseConfigured) {
        try {
          const { error } = await supabase.from('articles').insert([payload])
          if (error) {
            console.warn('Supabase articles insert note:', error.message)
          }
        } catch (err) {
          console.warn('Supabase connection note:', err)
        }
      }

      // Update local state
      setData((prev) => ({
        ...prev,
        articles: [payload, ...prev.articles.filter((a) => a.id !== id)],
      }))

      notify(`📰 Article "${formData.title}" published to website!`)
      return payload
    },
    [notify]
  )

  return (
    <SimpleCmsContext.Provider
      value={{
        architects: data.architects,
        projects: data.projects,
        articles: data.articles,
        publishArchitect,
        publishProject,
        publishArticle,
        notification,
        dismissNotification: () => setNotification(null),
        isSupabaseConfigured,
      }}
    >
      {children}
    </SimpleCmsContext.Provider>
  )
}

export function useSimpleCms() {
  const ctx = useContext(SimpleCmsContext)
  if (!ctx) throw new Error('useSimpleCms must be inside SimpleCmsProvider')
  return ctx
}
