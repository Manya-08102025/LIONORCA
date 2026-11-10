import { useState } from 'react'
import { X, CheckCircle2, MessageCircle, Shield, ArrowRight, AlertCircle } from 'lucide-react'

export default function LeadModal({ isOpen, onClose, preselectedArchitect = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: 'Private Villa / Independent House',
    projectNeeds: preselectedArchitect ? `Interested in consultation with ${preselectedArchitect.name}` : '',
  })

  const [status, setStatus] = useState('idle')

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

    const encodedMessage = encodeURIComponent(
      `*New Consultation Request | Lionorca Architeriors*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Contact Phone:* ${formData.phone}\n` +
      `*Expected Investment Range:* ${budgetText}\n` +
      `*Type of Project:* ${formData.propertyType}\n` +
      (preselectedArchitect ? `*Preferred Architect:* ${preselectedArchitect.name}\n` : '') +
      `*Project Scope / Area:* ${formData.projectNeeds || 'Turnkey luxury home design and construction'}\n\n` +
      `---\n` +
      `_Hello! I would like to schedule a consultation for my upcoming residence in Indore._`
    )

    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/${targetPhone}?text=${encodedMessage}`, '_blank')
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl shadow-2xl border border-ash p-8 sm:p-10 my-8 z-10 bg-alabaster text-charcoal">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-greige transition-colors text-charcoal-light hover:text-charcoal cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase font-semibold mb-2 text-champagne">
            <Shield size={14} />
            <span>Private Briefing</span>
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
                  className="w-full px-5 py-3.5 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal focus:border-champagne"
                >
                  <option value="Private Villa / Independent House">Private Villa / Independent House</option>
                  <option value="Luxury Apartment / Penthouse">Luxury Apartment / Penthouse</option>
                  <option value="Farmhouse / Country Estate">Farmhouse / Country Estate</option>
                  <option value="Boutique Office / Hospitality">Boutique Office / Hospitality</option>
                  <option value="Full Home Renovation / Extension">Full Home Renovation / Extension</option>
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
              <div className="p-5 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed bg-champagne/10 border-champagne/25 text-charcoal">
                <AlertCircle size={20} className="shrink-0 mt-0.5 text-champagne" />
                <div>
                  <strong className="block font-semibold mb-1 text-champagne">Project Scope</strong>
                  Lionorca Architeriors handles full turnkey home design and construction starting from ₹25 Lakhs (with primary focus on ₹1Cr+ bespoke residences).
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold mb-2 text-charcoal-muted">
                Approximate Area (Sq. Ft.) &amp; Location (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 3,000 sq ft plot in Indore. Looking for a modern 4 BHK villa with bespoke interior execution."
                value={formData.projectNeeds}
                onChange={(e) => setFormData({ ...formData, projectNeeds: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl text-sm border focus:outline-none transition-colors bg-greige/70 border-ash text-charcoal placeholder-charcoal-light/60 focus:border-champagne"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={status === 'declined' || !formData.budget}
                className={`w-full py-4 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs ${
                  status === 'declined' || !formData.budget
                    ? 'bg-greige text-charcoal-light cursor-not-allowed'
                    : 'bg-charcoal hover:bg-champagne text-alabaster active:scale-98'
                }`}
              >
                <MessageCircle size={17} className="fill-alabaster stroke-none" />
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
