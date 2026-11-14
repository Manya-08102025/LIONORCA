import { createClient } from '@supabase/supabase-js'

// Strictly read environment variables with clean fallbacks
export const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL?.trim()) ||
  (typeof window !== 'undefined' ? localStorage.getItem('lionorca_supabase_url')?.trim() : '') ||
  'https://fuqlchwlmvbgmhvxnnza.supabase.co'

export function getSupabaseAnonKey() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY?.trim()) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY.trim()
  }
  if (typeof window !== 'undefined') {
    const fromStorage = localStorage.getItem('lionorca_supabase_anon_key')
    if (fromStorage && fromStorage.trim()) return fromStorage.trim()
  }
  return ''
}

export function saveSupabaseAnonKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('lionorca_supabase_anon_key', key.trim())
    } else {
      localStorage.removeItem('lionorca_supabase_anon_key')
    }
  }
}

export const isAnonKeySet = Boolean(getSupabaseAnonKey())
export const isSupabaseConfigured = isAnonKeySet

// Extract project ID for reference
export const SUPABASE_PROJECT_ID =
  supabaseUrl.replace('https://', '').split('.')[0] || 'fuqlchwlmvbgmhvxnnza'
export const SUPABASE_REGION = 'ap-south-1'

// Persistent Supabase Client instance
export function createConfiguredClient(customKey = null) {
  const key = customKey || getSupabaseAnonKey() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key'
  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  })
}

export const supabase = createConfiguredClient()

export function getClient() {
  return createConfiguredClient()
}

/**
 * Upload an image file directly to Supabase Storage
 * Tries the 'public-assets' bucket (or 'media' / 'images'),
 * and returns the public CDN URL.
 */
export async function uploadImageToSupabase(file, bucketName = 'public-assets') {
  if (!file) throw new Error('No file provided for upload')
  
  const client = getClient()
  const fileExt = file.name ? file.name.split('.').pop() : 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = `uploads/${fileName}`

  // Try primary bucket, then fallback buckets if not found
  const bucketsToTry = [bucketName, 'media', 'images', 'cms']
  let lastError = null

  for (const b of bucketsToTry) {
    try {
      const { data, error } = await client.storage
        .from(b)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (!error && data) {
        const { data: publicData } = client.storage.from(b).getPublicUrl(filePath)
        if (publicData?.publicUrl) {
          return publicData.publicUrl
        }
      }
      lastError = error
    } catch (e) {
      lastError = e
    }
  }

  // If storage upload fails or bucket is not created, throw with clear info
  console.warn('Supabase storage upload note:', lastError?.message || lastError)
  throw lastError || new Error('Failed to upload image to Supabase Storage')
}
