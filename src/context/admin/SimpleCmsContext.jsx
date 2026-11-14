import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getClient,
  isSupabaseConfigured,
  uploadImageToSupabase,
} from '../../services/supabase'

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
  const [isLoading, setIsLoading] = useState(false)

  // Persist to localStorage for instant offline access & cross-component sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      // Dispatch custom event to sync public components without reload
      window.dispatchEvent(new CustomEvent('lionorca_cms_updated', { detail: data }))
    } catch {
      // ignore
    }
  }, [data])

  // Toast notifier
  const notify = useCallback((message, type = 'success') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => {
      setNotification((curr) => (curr && curr.message === message ? null : curr))
    }, 4500)
  }, [])

  // ─── Fetch live data from Supabase on mount ───
  const fetchLiveCmsData = useCallback(async () => {
    try {
      setIsLoading(true)
      const client = getClient()

      // 1. Fetch Architects
      const { data: archs, error: archErr } = await client
        .from('architects')
        .select('*')
        .order('created_at', { ascending: false })

      if (archErr) console.warn('[CMS] Architects fetch note:', archErr.message)

      // 2. Fetch Signature Projects
      const { data: projs, error: projErr } = await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projErr) console.warn('[CMS] Projects fetch note:', projErr.message)

      // 3. Fetch Media / Articles (try media_insights first, then articles)
      let mediaList = []
      const { data: medData, error: medErr } = await client
        .from('media_insights')
        .select('*')
        .order('created_at', { ascending: false })

      if (!medErr && medData && medData.length > 0) {
        mediaList = medData
      } else {
        const { data: artData } = await client
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
        if (artData) mediaList = artData
      }

      setData((prev) => ({
        architects: archs && archs.length > 0 ? archs : prev.architects,
        projects: projs && projs.length > 0 ? projs : prev.projects,
        articles: mediaList && mediaList.length > 0 ? mediaList : prev.articles,
      }))
    } catch (err) {
      console.warn('[CMS] Supabase live fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLiveCmsData()
  }, [fetchLiveCmsData])

  // ─── 1. Publish / Upsert Architect ───
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
        created_at: formData.createdAt || new Date().toISOString(),
      }

      // Live Supabase Upsert
      try {
        const client = getClient()
        const { error } = await client.from('architects').upsert([payload])
        if (error) {
          console.warn('[CMS] Supabase architects upsert note:', error.message)
        }
      } catch (err) {
        console.warn('[CMS] Supabase connection note:', err)
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

  // ─── Delete Architect ───
  const deleteArchitect = useCallback(
    async (id) => {
      try {
        const client = getClient()
        await client.from('architects').delete().eq('id', id)
      } catch (err) {
        console.warn('[CMS] Delete architect note:', err)
      }

      setData((prev) => ({
        ...prev,
        architects: prev.architects.filter((a) => a.id !== id),
      }))

      notify('Architect removed from website.', 'info')
    },
    [notify]
  )

  // ─── 2. Publish / Upsert Project ───
  const publishProject = useCallback(
    async (formData) => {
      const id = formData.id || `proj-${Date.now().toString(36)}`
      const payload = {
        id,
        title: formData.title,
        subtitle: formData.subtitle || formData.typology || 'Bespoke Residence',
        description: formData.description,
        image_url: formData.imageUrl,
        created_at: formData.createdAt || new Date().toISOString(),
      }

      // Live Supabase Upsert
      try {
        const client = getClient()
        const { error } = await client.from('projects').upsert([payload])
        if (error) {
          console.warn('[CMS] Supabase projects upsert note:', error.message)
        }
      } catch (err) {
        console.warn('[CMS] Supabase connection note:', err)
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

  // ─── Delete Project ───
  const deleteProject = useCallback(
    async (id) => {
      try {
        const client = getClient()
        await client.from('projects').delete().eq('id', id)
      } catch (err) {
        console.warn('[CMS] Delete project note:', err)
      }

      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }))

      notify('Project removed from website.', 'info')
    },
    [notify]
  )

  // ─── 3. Publish / Upsert Article or Media Item ───
  const publishArticle = useCallback(
    async (formData) => {
      const id = formData.id || `art-${Date.now().toString(36)}`
      const payload = {
        id,
        title: formData.title,
        date: formData.date || new Date().toISOString().slice(0, 10),
        cover_image: formData.coverImage,
        body: formData.body,
        created_at: formData.createdAt || new Date().toISOString(),
      }

      // Live Supabase Upsert (try media_insights, then articles)
      try {
        const client = getClient()
        const { error: medErr } = await client.from('media_insights').upsert([payload])
        if (medErr) {
          await client.from('articles').upsert([payload])
        }
      } catch (err) {
        console.warn('[CMS] Supabase article connection note:', err)
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

  // ─── Delete Article ───
  const deleteArticle = useCallback(
    async (id) => {
      try {
        const client = getClient()
        await client.from('media_insights').delete().eq('id', id)
        await client.from('articles').delete().eq('id', id)
      } catch (err) {
        console.warn('[CMS] Delete article note:', err)
      }

      setData((prev) => ({
        ...prev,
        articles: prev.articles.filter((a) => a.id !== id),
      }))

      notify('Article removed from website.', 'info')
    },
    [notify]
  )

  return (
    <SimpleCmsContext.Provider
      value={{
        architects: data.architects,
        projects: data.projects,
        articles: data.articles,
        isLoading,
        publishArchitect,
        deleteArchitect,
        publishProject,
        deleteProject,
        publishArticle,
        deleteArticle,
        refreshCmsData: fetchLiveCmsData,
        uploadImageToSupabase,
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
