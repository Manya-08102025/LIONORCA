import { useState } from 'react'
import { X, Send, AlertCircle, CheckCircle2, MessageCircle, Shield, ArrowRight } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function LeadModal({ isOpen, onClose, preselectedArchitect = null }) {
  const { isDark } = useTheme()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: 'Bespoke Villa / Bungalow',
    projectNeeds: preselectedArchitect ? `Interested in consultation with ${preselectedArchitect.name}` : '',
  })

  const [status, setStatus] = useState('idle') // 'idle' | 'declined' | 'submitting' | 'success'

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

    // Construct bilingual WhatsApp message for founder routing
    const targetPhone = '919893000000' // Founder contact endpoint
    const budgetLabels = {
      '25l-50l': '₹25 Lakhs – ₹50 Lakhs',
      '50l-1cr': '₹50 Lakhs – ₹1 Crore',
      '1cr-2.5cr': '₹1 Crore – ₹2.5 Crore (Turnkey Villa)',
      '2.5cr-plus': '₹2.5 Crore+ (Signature Estate)',
    }

    const budgetText = budgetLabels[formData.budget] || formData.budget

    const encodedMessage = encodeURIComponent(
      `*New Turnkey Consultation Request | Lynor Arkitechtures*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Contact Phone:* ${formData.phone}\n` +
      `*Target Budget:* ${budgetText}\n` +
      `*Property Type:* ${formData.propertyType}\n` +
      (preselectedArchitect ? `*Preferred Architect:* ${preselectedArchitect.name}\n` : '') +
      `*Project Needs:* ${formData.projectNeeds || 'Turnkey end-to-end management'}\n\n` +
      `---\n` +
      `_Namaste! I would like to schedule a confidential discovery session for my upcoming residence in Indore._\n` +
      `_कृपया प्लॉट साइज एवं टाइमलाइन संबंधी आगे की प्रक्रिया साझा करें।_`
    )

    // Simulate instant lead submission and redirect to WhatsApp
    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/${targetPhone}?text=${encodedMessage}`, '_blank')
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-xl rounded-2xl shadow-2xl border p-6 sm:p-8 my-8 z-10 transition-all ${
          isDark
            ? 'bg-neutral-900 border-amber-500/30 text-white'
            : 'bg-white border-neutral-300 text-neutral-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-800/20 transition-colors text-neutral-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-amber-500 font-semibold mb-2">
            <Shield size={14} />
            <span>Direct Founder Escalation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Schedule Confidential Consultation
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-sans">
            Frictionless onboarding. No OTPs. Connect directly with Lynor’s leadership team.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">Consultation Initiated</h3>
            <p className="text-sm text-neutral-300 font-sans max-w-md mx-auto mb-6">
              Your inquiry has been routed directly to the founder. WhatsApp has opened to confirm your plot dimensions and design timeline.
            </p>
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-2.5 rounded-full bg-amber-500 text-neutral-950 font-semibold text-xs tracking-wider uppercase"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Agrawal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-1.5">
                Phone Number (WhatsApp Preferred) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            {/* Property Type & Mandatory Budget Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-1.5">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                    isDark
                      ? 'bg-neutral-800 border-white/10 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                >
                  <option value="Bespoke Villa / Bungalow">Bespoke Villa / Bungalow</option>
                  <option value="Luxury Farmhouse">Luxury Farmhouse</option>
                  <option value="Penthouse Interior">Penthouse Interior</option>
                  <option value="Ancestral Redevelopment">Ancestral Redevelopment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-1.5">
                  Target Turnkey Budget *
                </label>
                <select
                  required
                  value={formData.budget}
                  onChange={handleBudgetChange}
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                    isDark
                      ? 'bg-neutral-800 border-white/10 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                >
                  <option value="" disabled>Select Budget Bracket</option>
                  <option value="under-25l">Under ₹25 Lakhs</option>
                  <option value="25l-50l">₹25 Lakhs – ₹50 Lakhs</option>
                  <option value="50l-1cr">₹50 Lakhs – ₹1.0 Crore</option>
                  <option value="1cr-2.5cr">₹1.0 Crore – ₹2.5 Crore (Signature)</option>
                  <option value="2.5cr-plus">₹2.5 Crore+ (Ultra Luxury)</option>
                </select>
              </div>
            </div>

            {/* Automatic Polite Decline for < ₹25 Lakhs */}
            {status === 'declined' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
                <AlertCircle size={20} className="shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-amber-300 mb-1">
                    Turnkey Scope Notice
                  </strong>
                  Lynor Arkitechtures specializes exclusively in end-to-end turnkey residential projects starting from ₹25 Lakhs (with core focus on ₹1Cr+ residences). For budgets below ₹25L or standalone room renovations, we recommend engaging direct local contractors.
                </div>
              </div>
            )}

            {/* Project Needs / Plot Details */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-1.5">
                Brief Scope / Plot Location in Indore (2–3 lines)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 3,500 sq ft plot in Nipania. Looking for modern elevation, double height living, and complete turnkey execution."
                value={formData.projectNeeds}
                onChange={(e) => setFormData({ ...formData, projectNeeds: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-amber-500 transition-colors ${
                  isDark
                    ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={status === 'declined' || !formData.budget}
                className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  status === 'declined' || !formData.budget
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 shadow-amber-500/20 active:scale-98'
                }`}
              >
                <MessageCircle size={16} />
                <span>Trigger WhatsApp Concierge & Consult</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
