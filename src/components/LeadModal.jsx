import { useState } from 'react'
import { X, CheckCircle2, MessageCircle, Shield, ArrowRight, AlertCircle } from 'lucide-react'
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
    const targetPhone = '919893000000'
    const budgetLabels = {
      '25l-50l': '₹25 Lakhs – ₹50 Lakhs',
      '50l-1cr': '₹50 Lakhs – ₹1 Crore',
      '1cr-2.5cr': '₹1 Crore – ₹2.5 Crore (Turnkey Villa)',
      '2.5cr-plus': '₹2.5 Crore+ (Signature Estate)',
    }

    const budgetText = budgetLabels[formData.budget] || formData.budget

    const encodedMessage = encodeURIComponent(
      `*New Consultation Request | Lionorca Architeriors*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Contact Phone:* ${formData.phone}\n` +
      `*Target Turnkey Budget:* ${budgetText}\n` +
      `*Property Category:* ${formData.propertyType}\n` +
      (preselectedArchitect ? `*Preferred Architect:* ${preselectedArchitect.name}\n` : '') +
      `*Project Scope:* ${formData.projectNeeds || 'Turnkey luxury home design and construction'}\n\n` +
      `---\n` +
      `_Hello! I would like to schedule a consultation for my upcoming residence in Indore._`
    )

    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/${targetPhone}?text=${encodedMessage}`, '_blank')
    }, 500)
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
            ? 'bg-neutral-900 border-[#E5C583]/30 text-white'
            : 'bg-white border-stone-300 text-stone-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-800/20 transition-colors text-neutral-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-1.5 text-xs font-soft tracking-wider uppercase font-bold mb-2 ${
              isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
            }`}
          >
            <Shield size={14} />
            <span>Free Consultation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-soft font-bold tracking-tight">
            Schedule a Consultation
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1 font-soft ${
              isDark ? 'text-neutral-400' : 'text-stone-600'
            }`}
          >
            Connect directly with the Lionorca senior turnkey team to review your plot & architectural vision.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">Consultation Initiated</h3>
            <p
              className={`text-sm font-soft max-w-md mx-auto mb-6 ${
                isDark ? 'text-neutral-300' : 'text-stone-600'
              }`}
            >
              Your inquiry has been routed directly to the founder. WhatsApp has opened to confirm your design requirements and timeline.
            </p>
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] text-neutral-950 font-bold text-xs tracking-wider uppercase border border-[#B3872E]/30"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            {/* Full Name */}
            <div>
              <label
                className={`block text-xs uppercase tracking-wider font-semibold mb-1.5 ${
                  isDark ? 'text-neutral-300' : 'text-stone-700'
                }`}
              >
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Agrawal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500 focus:border-[#E5C583]'
                    : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#8E651E]'
                }`}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                className={`block text-xs uppercase tracking-wider font-semibold mb-1.5 ${
                  isDark ? 'text-neutral-300' : 'text-stone-700'
                }`}
              >
                Phone Number (WhatsApp Preferred) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500 focus:border-[#E5C583]'
                    : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#8E651E]'
                }`}
              />
            </div>

            {/* Property Type & Mandatory Budget Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-xs uppercase tracking-wider font-semibold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-stone-700'
                  }`}
                >
                  Property Category
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-neutral-800 border-white/10 text-white focus:border-[#E5C583]'
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-[#8E651E]'
                  }`}
                >
                  <option value="Bespoke Villa / Bungalow">Bespoke Villa / Bungalow</option>
                  <option value="Luxury Farmhouse">Luxury Farmhouse</option>
                  <option value="Penthouse Interior">Penthouse Interior</option>
                  <option value="Ancestral Redevelopment">Ancestral Redevelopment</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-xs uppercase tracking-wider font-semibold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-stone-700'
                  }`}
                >
                  Target Turnkey Budget *
                </label>
                <select
                  required
                  value={formData.budget}
                  onChange={handleBudgetChange}
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-neutral-800 border-white/10 text-white focus:border-[#E5C583]'
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-[#8E651E]'
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
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                  isDark
                    ? 'bg-[#E5C583]/10 border-[#E5C583]/30 text-neutral-200'
                    : 'bg-[#8E651E]/10 border-[#8E651E]/30 text-stone-800'
                }`}
              >
                <AlertCircle
                  size={20}
                  className={`shrink-0 mt-0.5 ${
                    isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
                  }`}
                />
                <div>
                  <strong
                    className={`block font-bold mb-1 ${
                      isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
                    }`}
                  >
                    Project Scope
                  </strong>
                  Lionorca Architeriors handles full turnkey home design and construction starting from ₹25 Lakhs (with primary focus on ₹1Cr+ bespoke residences).
                </div>
              </div>
            )}

            {/* Project Needs / Plot Details */}
            <div>
              <label
                className={`block text-xs uppercase tracking-wider font-semibold mb-1.5 font-soft ${
                  isDark ? 'text-neutral-300' : 'text-stone-700'
                }`}
              >
                Plot Location / Project Scope (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 3,000 sq ft plot in Indore. Looking for modern 4 BHK villa with complete interior design and turnkey execution."
                value={formData.projectNeeds}
                onChange={(e) => setFormData({ ...formData, projectNeeds: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors font-soft ${
                  isDark
                    ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500 focus:border-[#E5C583]'
                    : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#8E651E]'
                }`}
              />
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={status === 'declined' || !formData.budget}
                className={`w-full py-3.5 px-6 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg font-soft ${
                  status === 'declined' || !formData.budget
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                    : 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-emerald-500/20 active:scale-98'
                }`}
              >
                <MessageCircle size={17} className="fill-white stroke-none" />
                <span>Confirm on WhatsApp & Book Consultation</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
