import { useState } from 'react'
import { MessageCircle, CheckCircle2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function DiscoverySessionSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: 'Private Villa / Independent House',
    plotLocation: '',
  })
  const [status, setStatus] = useState('idle')

  const handleBudgetChange = (e) => {
    const val = e.target.value
    setFormData({ ...formData, budget: val })
    if (val === 'under-25l') {
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
      `*Approximate Area & Location:* ${formData.plotLocation || 'Indore & Central India'}\n\n` +
      `_Hello! I would like to schedule a formal Discovery Session with the Lionorca team._`
    )

    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/919755667695?text=${encodedMessage}`, '_blank')
    }, 500)
  }

  const handleDirectWhatsApp = () => {
    const defaultMsg = encodeURIComponent(
      `*Quick Consultation Request | Lionorca Architeriors*\n\n` +
      `_Hello! I would like to speak directly with the founder regarding turnkey villa construction in Indore._`
    )
    window.open(`https://wa.me/919755667695?text=${defaultMsg}`, '_blank')
  }

  return (
    <section id="contact" className="py-28 sm:py-36 lg:py-40 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] text-charcoal border-t border-stone-200/80 relative overflow-hidden">
      {/* Clearly Visible Luxury Interior Design Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-luxury-suite.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(8px)',
            transform: 'scale(1.10)',
            opacity: 0.38,
          }}
        />
        {/* Transparent Soft Light Glaze */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/45" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-[#8E651E] mb-4">
            Final Step • Discovery
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.18] mb-5">
            Book a Discovery Session
          </h2>
          <p className="font-sans text-lg sm:text-xl lg:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Share your plot details and target budget. Our team will review site viability and match you with the ideal architectural director.
          </p>
        </ScrollReveal>

        {/* Main Form Card */}
        <ScrollReveal delay={120}>
          <div className="rounded-3xl border border-stone-200/90 p-8 sm:p-14 lg:p-16 bg-white/95 text-stone-900 transition-all shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-2xl bg-[#8E651E]/15 text-[#8E651E] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-stone-900">Session Scheduled</h3>
                <p className="text-base sm:text-lg font-sans font-normal max-w-lg mx-auto mb-8 text-stone-600 leading-relaxed">
                  Your parameters have been logged and WhatsApp has opened to confirm your appointment time with the founder.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  type="button"
                  className="px-10 py-4 rounded-full bg-stone-900 hover:bg-[#8E651E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer transition-all shadow-sm"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm uppercase tracking-wider font-bold mb-2.5 font-sans text-stone-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Agrawal"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl text-base border focus:outline-none transition-colors font-sans bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#8E651E] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm uppercase tracking-wider font-bold mb-2.5 font-sans text-stone-700">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl text-base border focus:outline-none transition-colors font-sans bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#8E651E] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm uppercase tracking-wider font-bold mb-2.5 font-sans text-stone-700">
                      Type of Project
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl text-base border focus:outline-none transition-colors font-sans bg-stone-50 border-stone-200 text-stone-900 focus:border-[#8E651E] focus:bg-white"
                    >
                      <option value="Private Villa / Independent House">Private Villa / Independent House</option>
                      <option value="Luxury Apartment / Penthouse">Luxury Apartment / Penthouse</option>
                      <option value="Farmhouse / Country Estate">Farmhouse / Country Estate</option>
                      <option value="Boutique Office / Hospitality">Boutique Office / Hospitality</option>
                      <option value="Full Home Renovation / Extension">Full Home Renovation / Extension</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm uppercase tracking-wider font-bold mb-2.5 font-sans text-stone-700">
                      Expected Investment Range *
                    </label>
                    <select
                      required
                      value={formData.budget}
                      onChange={handleBudgetChange}
                      className="w-full px-6 py-4 rounded-2xl text-base border focus:outline-none transition-colors font-sans bg-stone-50 border-stone-200 text-stone-900 focus:border-[#8E651E] focus:bg-white"
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
                  <div className="p-6 rounded-2xl border flex items-start gap-4 text-sm leading-relaxed bg-[#8E651E]/10 border-[#8E651E]/30 text-stone-800">
                    <AlertCircle size={22} className="shrink-0 mt-0.5 text-[#8E651E]" />
                    <div>
                      <strong className="block font-bold mb-1 text-[#8E651E] text-base">Project Scope Notice</strong>
                      Lionorca Architeriors delivers turnkey architectural planning and execution starting from ₹25 Lakhs (with core focus on ₹1Cr+ residences).
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-wider font-bold mb-2.5 font-sans text-stone-700">
                    Approximate Area (Sq. Ft.) &amp; Location
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share plot area, preferred architectural style, or specific requirements..."
                    value={formData.plotLocation}
                    onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl text-base border focus:outline-none transition-colors font-sans bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#8E651E] focus:bg-white"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'declined' || !formData.budget}
                    className={`w-full py-5 px-6 rounded-2xl text-sm sm:text-base font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-98 ${
                      status === 'declined' || !formData.budget
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-stone-900 hover:bg-[#8E651E] text-white'
                    }`}
                  >
                    <Sparkles size={18} />
                    <span>Submit Discovery Session Request</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* WhatsApp secondary option */}
                <div className="pt-6 border-t border-stone-200 text-center">
                  <span className="text-sm font-sans block mb-3.5 text-stone-500 font-medium">
                    Prefer instant messaging? Connect directly:
                  </span>
                  <button
                    onClick={handleDirectWhatsApp}
                    type="button"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-stone-300 text-stone-800 hover:text-[#8E651E] hover:border-[#8E651E] hover:bg-stone-50 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    <MessageCircle size={17} className="text-[#8E651E]" />
                    <span>Chat Directly on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
