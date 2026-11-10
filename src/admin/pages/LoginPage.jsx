import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, AlertCircle, Key, Check } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { SUPABASE_PROJECT_ID, SUPABASE_REGION } from '../../services/supabase'

export default function LoginPage() {
  const { login, anonKey, updateAnonKey } = useAdminAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showKeyInput, setShowKeyInput] = useState(false)
  const [pastedKey, setPastedKey] = useState(anonKey || '')
  const [keySaved, setKeySaved] = useState(false)

  const handleSaveKey = () => {
    if (pastedKey.trim()) {
      updateAnonKey(pastedKey.trim())
      setKeySaved(true)
      setTimeout(() => {
        setKeySaved(false)
        setShowKeyInput(false)
      }, 1500)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center px-4 py-12 font-sans antialiased text-neutral-800">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] text-center">
          {/* Official Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/images/lionorca-logo-transparent.png"
              alt="Lionorca Architeriors"
              className="h-16 sm:h-20 w-auto object-contain max-w-[260px] mb-4"
              onError={(e) => {
                e.target.src = '/images/lionorca-full-logo.jpg'
              }}
            />
            <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mt-1">
              Founder Portal Sign In
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider font-medium text-neutral-600 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@lionorca.com"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider font-medium text-neutral-600 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-3 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Optional: Supabase Anon Key Input / Connection */}
          <div className="mt-5 pt-4 text-center">
            {!showKeyInput ? (
              <button
                type="button"
                onClick={() => setShowKeyInput(true)}
                className="text-xs text-neutral-400 hover:text-neutral-800 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <Key size={12} />
                <span>
                  {anonKey ? '✓ Supabase Anon Key Connected' : 'Optional: Paste Supabase Anon Key'}
                </span>
              </button>
            ) : (
              <div className="space-y-2 text-left bg-neutral-50 p-3 rounded-2xl">
                <label className="block text-[11px] font-medium text-neutral-600">
                  Supabase Anon Key (JWT)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="password"
                    value={pastedKey}
                    onChange={(e) => setPastedKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                    className="flex-1 px-3 py-1.5 bg-white rounded-lg text-xs text-neutral-900 border border-neutral-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSaveKey}
                    className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 cursor-pointer shrink-0"
                  >
                    {keySaved ? <Check size={14} className="text-emerald-400" /> : 'Save'}
                  </button>
                </div>
                <p className="text-[10px] text-neutral-400">
                  Find this in Supabase Dashboard &gt; Project Settings &gt; API &gt; anon public
                </p>
              </div>
            )}
          </div>

          {/* Supabase Project Status Badge */}
          <div className="mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>Supabase: {SUPABASE_PROJECT_ID} ({SUPABASE_REGION})</span>
          </div>
        </div>

        {/* Subtle Footer */}
        <p className="mt-6 text-center text-xs text-neutral-400 font-normal">
          Lionorca Architeriors &bull; Supabase Protected
        </p>
      </div>
    </div>
  )
}
