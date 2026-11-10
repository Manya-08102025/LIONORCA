import { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Shield, CheckCircle2, AlertCircle, ArrowRight, Clock } from 'lucide-react'

export default function Contact({ onOpenConsult }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: 'Private Villa / Independent House',
    notes: '',
  })
  const [status, setStatus] = useState('idle')

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

    const budgetLabels = {
      'under-25l': 'Under ₹25 Lakhs',
      '25l-50l': '₹25 Lakhs – ₹50 Lakhs',
      '50l-1cr': '₹50 Lakhs – ₹1.0 Crore',
      '1cr-2.5cr': '₹1.0 Crore – ₹2.5 Crore (Bespoke Villa)',
      '2.5cr-plus': '₹2.5 Crore+ (Signature Estate)',
    }

    const budgetText = budgetLabels[formData.budget] || formData.budget
    const encodedMessage = encodeURIComponent(
      `*New Discovery Session Inquiry | Lionorca Architeriors*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Expected Investment Range:* ${budgetText}\n` +
      `*Type of Project:* ${formData.propertyType}\n` +
      `*Approximate Area & Location:* ${formData.notes || 'Full Turnkey Planning & Execution'}\n\n` +
      `_Hello! I would like to schedule a dedicated Discovery Session with the Lionorca team._`
    )

    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/919755667695?text=${encodedMessage}`, '_blank')
    }, 500)
  }

  return (
    <div className="pt-24 min-h-screen bg-[#FFFFFF] text-[#0F172A]">
      {/* Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF] border-b border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1B67F]/15 border border-[#D1B67F]/30 text-[#9E7D3B] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
            <Shield size={13} className="text-[#D1B67F]" />
            <span>Dedicated Consultation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-5">
            Contact & Discovery Session
          </h1>
          <p className="font-soft text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            Schedule an in-person or virtual discovery session with our turnkey luxury directors in Indore.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Coordinates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#0F172A] mb-2">
                Book Your Discovery Session
              </h2>
              <p className="font-soft text-sm text-slate-500">
                Share your plot location and estimated budget. We will review site viability and match you with our senior design team.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Session Scheduled</h3>
                <p className="font-soft text-sm text-slate-600 max-w-md mx-auto mb-6">
                  Thank you! WhatsApp has been opened with your inquiry parameters. Our team will confirm the appointment slot promptly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-[#D1B67F] text-[#0F172A] font-semibold text-xs tracking-wider uppercase"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Agrawal"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-[#D1B67F] focus:ring-1 focus:ring-[#D1B67F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                    Phone Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-[#D1B67F] focus:ring-1 focus:ring-[#D1B67F] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                      Type of Project
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-[#D1B67F] transition-colors bg-white"
                    >
                      <option value="Private Villa / Independent House">Private Villa / Independent House</option>
                      <option value="Luxury Apartment / Penthouse">Luxury Apartment / Penthouse</option>
                      <option value="Farmhouse / Country Estate">Farmhouse / Country Estate</option>
                      <option value="Boutique Office / Hospitality">Boutique Office / Hospitality</option>
                      <option value="Full Home Renovation / Extension">Full Home Renovation / Extension</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                      Expected Investment Range *
                    </label>
                    <select
                      required
                      value={formData.budget}
                      onChange={handleBudgetChange}
                      className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-[#D1B67F] transition-colors bg-white"
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
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
                    <AlertCircle size={18} className="shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <strong className="block font-semibold text-amber-950 mb-0.5">Project Scope Notice</strong>
                      Linorga specializes in end-to-end turnkey architectural delivery starting from ₹25 Lakhs, with core focus on ₹1 Crore+ bespoke residences.
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-slate-700 mb-1.5">
                    Approximate Area (Sq. Ft.) &amp; Location (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 3,500 sq ft plot in Indore Bypass. Need modern architecture with Italian marble finishes and home theater."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-[#D1B67F] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'declined' || !formData.budget}
                    className={`w-full py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer ${
                      status === 'declined' || !formData.budget
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-emerald-500/20'
                    }`}
                  >
                    <MessageCircle size={17} className="fill-white stroke-none" />
                    <span>Confirm Session on WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-4">
                Indore Design Headquarters
              </h3>
              <div className="space-y-4 text-sm font-soft text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#9E7D3B] shrink-0 mt-0.5" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Central+Business+Park,+Scheme+No+94,+Indore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9E7D3B] transition-colors leading-relaxed"
                  >
                    204, FA1, Central Business Park, HDFC Bank Building,<br />
                    Bengali to Pipliyahana Service Rd, Sch. No. 94,<br />
                    Indore, Madhya Pradesh 452016
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#9E7D3B] shrink-0" />
                  <a href="tel:+919755667695" className="hover:text-[#9E7D3B] transition-colors font-medium">
                    +91 97556 67695
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#9E7D3B] shrink-0" />
                  <a href="mailto:lionorca.architeriors@gmail.com" className="hover:text-[#9E7D3B] transition-colors">
                    lionorca.architeriors@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#9E7D3B] shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 7:30 PM (By Appointment)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#D1B67F] block mb-2">
                Turnkey Transparency
              </span>
              <h4 className="font-serif text-lg font-bold mb-2">
                What to Expect at Your Discovery Session
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-soft">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#D1B67F] shrink-0 mt-0.5" />
                  <span>Honest feasibility and cost breakdown for your specific plot size.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#D1B67F] shrink-0 mt-0.5" />
                  <span>Architect style matching without preliminary commitments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#D1B67F] shrink-0 mt-0.5" />
                  <span>Clear explanation of our 5% token lock-in and milestones.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
