import { createClient } from '@supabase/supabase-js'

export const SUPABASE_PROJECT_ID = 'fuqlchwlmvbgmhvxnnza'
export const SUPABASE_REGION = 'ap-south-1'
export const supabaseUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co`

export function getSupabaseAnonKey() {
  if (typeof window !== 'undefined') {
    const fromStorage = localStorage.getItem('lionorca_supabase_anon_key')
    if (fromStorage && fromStorage.trim()) return fromStorage.trim()
  }
  return import.meta.env.VITE_SUPABASE_ANON_KEY || ''
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

// Default client
const activeKey = getSupabaseAnonKey()
export const supabase = createClient(
  supabaseUrl,
  activeKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key'
)

export function getClient() {
  const key = getSupabaseAnonKey()
  return createClient(
    supabaseUrl,
    key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key'
  )
}
