import { useState, useEffect } from 'react'
import { X, CheckCircle2, MessageCircle, Shield, ArrowRight, AlertCircle } from 'lucide-react'
import { db, isFirebaseConfigured, doc, setDoc } from '../services/firebase'

export const SERVICES_PROJECT_TYPES = [
  'Bespoke Villas',
  'Premium Apartments',
  'Visionary Office Spaces',
  'Serene Farmhouses',
  'Multi-storey Buildings',
  'Other / Custom Project',
]

function resolveProjectTypology(param) {
  if (!param) return 'Bespoke Villas'
  const raw = typeof param === 'string' ? param : param.typology || param.propertyType || param.name || ''
  const str = raw.trim()
  if (!str) return 'Bespoke Villas'

  // 1. Exact match against SERVICES_PROJECT_TYPES first
  const exact = SERVICES_PROJECT_TYPES.find((t) => t.toLowerCase() === str.toLowerCase())
  if (exact) return exact

  // 2. Keyword matching with specific terms first
  const lower = str.toLowerCase()
  if (lower.includes('farmhouse')) return 'Serene Farmhouses'
  if (lower.includes('apartment') || lower.includes('penthouse') || lower.includes('condo')) return 'Premium Apartments'
  if (lower.includes('office') || lower.includes('commercial') || lower.includes('work')) return 'Visionary Office Spaces'
  if (lower.includes('building') || lower.includes('storey') || lower.includes('tower')) return 'Multi-storey Buildings'
  if (lower.includes('villa') || lower.includes('bungalow') || lower.includes('house')) return 'Bespoke Villas'

  return 'Bespoke Villas'
}

export default function LeadModal({ isOpen, onClose, preselectedArchitect = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: 'Bespoke Villas',
    projectNeeds: '',
  })

  const [status, setStatus] = useState('idle')

  // Reactive pre-selection when opening modal from Services picture or Architect card
  useEffect(() => {
    if (!isOpen) return

    const raw = preselectedArchitect
    const isTypology =
      raw &&
      (raw.typology ||
        (typeof raw === 'string' &&
          SERVICES_PROJECT_TYPES.some((t) => t.toLowerCase() === raw.toLowerCase())) ||
        (raw.name &&
          SERVICES_PROJECT_TYPES.some((t) => t.toLowerCase() === raw.name.toLowerCase())))

    const resolvedType = isTypology ? resolveProjectTypology(raw) : 'Bespoke Villas'

    const isArchitect =
      !isTypology &&
      raw &&
      (raw.style || raw.specialization || raw.experience || (raw.name && !isTypology))

    setFormData((prev) => ({
      ...prev,
      propertyType: resolvedType,
      projectNeeds: isArchitect
        ? `Interested in consultation with ${raw.name}`
        : isTypology
        ? `Inquiry for ${resolvedType}`
        : prev.projectNeeds || '',
    }))
    setStatus('idle')
  }, [isOpen, preselectedArchitect])

  if (!isOpen) return null

  const handleBudgetChange = (e) => {
    const value = e.target.value
    setFormData({ ...formData, budget: value })
    if (value === 'under-25l') {
      setStatus('declined')
    } else {
      if (status === 'declined') setStatus('idle')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.budget === 'under-25l') {
      setStatus('declined')
      return
    }

    setStatus('submitting')

    const targetPhone = '919755667695'
    const budgetLabels = {
      'under-25l': 'Under ₹25 Lakhs',
      '25l-50l': '₹25 Lakhs – ₹50 Lakhs',
      '50l-1cr': '₹50 Lakhs – ₹1.0 Crore',
      '1cr-2.5cr': '₹1.0 Crore – ₹2.5 Crore (Bespoke Villa)',
      '2.5cr-plus': '₹2.5 Crore+ (Signature Estate)',
    }

    const budgetText = budgetLabels[formData.budget] || formData.budget

    // Persist to Admin CMS (LocalStorage & Firebase Firestore)
    try {
      const leadId = `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
      const newLead = {
        id: leadId,
        date: new Date().toISOString().slice(0, 10),
        name: formData.name,
        phone: formData.phone,
        email: '',
        projectType: formData.propertyType,
        investmentRange: budgetText,
        status: 'New',
        notes: formData.projectNeeds || (preselectedArchitect ? `Preferred: ${preselectedArchitect.name}` : ''),
      }

      // 1. Sync to local storage
      const stored = localStorage.getItem('lionorca_admin_data')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          parsed.leads = [newLead, ...(parsed.leads || [])]
          localStorage.setItem('lionorca_admin_data', JSON.stringify(parsed))
        } catch {
          // ignore error
        }
      }

      // 2. Sync to Firebase Firestore if connected
      if (isFirebaseConfigured && db) {
        setDoc(doc(db, 'leads', leadId), newLead).catch((err) =>
          console.warn('Firestore lead sync note:', err)
        )
      }
    } catch (saveErr) {
      console.warn('Lead capture storage note:', saveErr)
    }

    const encodedMessage = encodeURIComponent(
      `*New Consultation Request | Lionorca Architeriors*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Contact Phone:* ${formData.phone}\n` +
      `*Expected Investment Range:* ${budgetText}\n` +
      `*Type of Project:* ${formData.propertyType}\n` +
      (preselectedArchitect?.style ? `*Preferred Architect:* ${preselectedArchitect.name}\n` : '') +
      `*Project Scope / Area:* ${formData.projectNeeds || 'Turnkey luxury home design and construction'}\n\n` +
      `---\n` +
      `_Hello! I would like to schedule a consultation for my upcoming project in Indore._`
    )

    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/${targetPhone}?text=${encodedMessage}`, '_blank')
    }, 450)
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-charcoal/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-alabaster rounded-3xl p-6 sm:p-10 shadow-2xl border border-ash/30 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-greige/70 hover:bg-ash/50 text-charcoal flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-champagne/15 text-champagne mb-3">
            <Shield size={12} />
            <span>Direct Client Onboarding</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-tight text-charcoal">
            Schedule a Consultation
          </h2>
          <p className="text-xs sm:text-sm mt-1.5 font-sans text-charcoal-muted font-light">
            Connect directly with the Lionorca senior turnkey team to review your plot & architectural vision.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-champagne/15 text-champagne flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-serif font-light mb-3 text-charcoal">Consultation Initiated</h3>
            <p className="text-sm font-sans max-w-md mx-auto mb-6 text-charcoal-muted font-light">
              Your inquiry has been routed directly to the founder. WhatsApp has opened to confirm your design requirements and timeline.
            </p>
            <button
              onClick={onClose}
              type="button"
              className="px-8 py-3 rounded-full bg-charcoal hover:bg-champagne text-alabaster font-medium text-xs tracking-wider uppercase transition-all shadow-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 font-sans">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold mb-2 text-charcoal-muted">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Agrawal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal placeholder-charcoal-light/60 focus:border-champagne"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold mb-2 text-charcoal-muted">
                Phone Number (WhatsApp Preferred) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal placeholder-charcoal-light/60 focus:border-champagne"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-2 text-charcoal-muted">
                  Type of Project
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal focus:border-champagne font-medium"
                >
                  {SERVICES_PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-2 text-charcoal-muted">
                  Expected Investment Range *
                </label>
                <select
                  required
                  value={formData.budget}
                  onChange={handleBudgetChange}
                  className="w-full px-5 py-3.5 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal focus:border-champagne"
                >
                  <option value="" disabled>Select Investment Range</option>
                  <option value="under-25l">Under ₹25 Lakhs</option>
                  <option value="25l-50l">₹25 Lakhs – ₹50 Lakhs</option>
                  <option value="50l-1cr">₹50 Lakhs – ₹1.0 Crore</option>
                  <option value="1cr-2.5cr">₹1.0 Crore – ₹2.5 Crore (Bespoke Villa)</option>
                  <option value="2.5cr-plus">₹2.5 Crore+ (Signature Estate)</option>
                </select>
              </div>
            </div>

            {status === 'declined' && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-charcoal text-xs">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-0.5 text-amber-900">Project Feasibility Notice</strong>
                  Lionorca focuses on complete architectural execution starting from ₹25 Lakhs to ensure quality craftsmanship and dedicated supervision.
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold mb-2 text-charcoal-muted">
                Project Scope / Area &amp; City (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 4,500 sq ft plot in Indore Bypass. Looking for modern courtyard villa architecture."
                value={formData.projectNeeds}
                onChange={(e) => setFormData({ ...formData, projectNeeds: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal placeholder-charcoal-light/60 focus:border-champagne"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm on WhatsApp &amp; Book Consultation</span>
              <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
