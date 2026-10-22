import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { MessageCircle, CheckCircle2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function DiscoverySessionSection() {
  const { isDark } = useTheme()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    propertyType: 'Bespoke Villa',
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
      '25l-50l': '₹25 Lakhs – ₹50 Lakhs',
      '50l-1cr': '₹50 Lakhs – ₹1.0 Crore',
      '1cr-2.5cr': '₹1.0 Crore – ₹2.5 Crore (Turnkey Villa)',
      '2.5cr-plus': '₹2.5 Crore+ (Signature Estate)',
    }

    const budgetText = budgetLabels[formData.budget] || formData.budget
    const encodedMessage = encodeURIComponent(
      `*New Discovery Session Inquiry | Lionorca Architeriors*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Target Turnkey Budget:* ${budgetText}\n` +
      `*Typology:* ${formData.propertyType}\n` +
      `*Plot Location / Notes:* ${formData.plotLocation || 'Central India (Indore/Bhopal/Ujjain)'}\n\n` +
      `_Hello! I would like to schedule a formal Discovery Session with the Lionorca team._`
    )

    setTimeout(() => {
      setStatus('success')
      window.open(`https://wa.me/919893000000?text=${encodedMessage}`, '_blank')
    }, 500)
  }

  const handleDirectWhatsApp = () => {
    const defaultMsg = encodeURIComponent(
      `*Quick Consultation Request | Lionorca Architeriors*\n\n` +
      `_Hello! I would like to speak directly with the founder regarding turnkey villa construction in Indore._`
    )
    window.open(`https://wa.me/919893000000?text=${defaultMsg}`, '_blank')
  }

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#D4AC55]/30 bg-[#FAF7F2] text-stone-900 relative overflow-hidden"
    >
      {/* Clearly Visible Luxury Villa Background with Refined Soft Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/bg-villa.jpg"
          alt=""
          className="w-full h-full object-cover ambient-bg-float"
          style={{
            filter: 'blur(6px)',
            transform: 'scale(1.10)',
            opacity: 0.52,
          }}
        />
        {/* Soft, Transparent Light Glaze to keep consultation form crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/35" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-96 bg-[#D4AC55]/15 rounded-full blur-[110px] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal animation="blur-up" duration={900}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-soft tracking-[0.25em] uppercase font-bold block mb-2 text-[#8E651E]">
              Final Step &bull; Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-soft font-bold tracking-tight mb-3 text-stone-900">
              Book a Discovery Session
            </h2>
            <p className="text-sm sm:text-base font-soft font-normal leading-relaxed text-stone-600">
              Share your plot details and target budget. Our team will review site viability and match you with the ideal architectural director.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Card with Smooth Scale-In Scroll Reveal */}
        <ScrollReveal animation="soft-scale" delay={140} duration={850}>
          <div className="rounded-3xl border-2 border-[#D4AC55]/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white/92 backdrop-blur-2xl transition-all">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2 text-stone-900">Session Scheduled</h3>
              <p className="text-sm font-soft max-w-md mx-auto mb-6 text-stone-600">
                Your parameters have been logged and WhatsApp has opened to confirm your appointment time with the founder.
              </p>
              <button
                onClick={() => setStatus('idle')}
                type="button"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] text-neutral-950 font-bold text-xs tracking-wider uppercase border border-[#B3872E]/40 shadow-sm cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider font-bold mb-1.5 font-soft ${
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
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors font-soft ${
                      isDark
                        ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500 focus:border-[#E5C583]'
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#8E651E]'
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider font-bold mb-1.5 font-soft ${
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
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors font-soft ${
                      isDark
                        ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500 focus:border-[#E5C583]'
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#8E651E]'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider font-bold mb-1.5 font-soft ${
                      isDark ? 'text-neutral-300' : 'text-stone-700'
                    }`}
                  >
                    Architectural Typology
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors font-soft ${
                      isDark
                        ? 'bg-neutral-800 border-white/10 text-white focus:border-[#E5C583]'
                        : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-[#8E651E]'
                    }`}
                  >
                    <option value="Bespoke Villa">Bespoke Villa</option>
                    <option value="Luxury Penthouse">Luxury Penthouse</option>
                    <option value="Signature Bungalow">Signature Bungalow</option>
                    <option value="Luxury Farmhouse">Luxury Farmhouse</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider font-bold mb-1.5 font-soft ${
                      isDark ? 'text-neutral-300' : 'text-stone-700'
                    }`}
                  >
                    Target Turnkey Budget *
                  </label>
                  <select
                    required
                    value={formData.budget}
                    onChange={handleBudgetChange}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors font-soft ${
                      isDark
                        ? 'bg-neutral-800 border-white/10 text-white focus:border-[#E5C583]'
                        : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-[#8E651E]'
                    }`}
                  >
                    <option value="" disabled>Select Budget Bracket</option>
                    <option value="under-25l">Under ₹25 Lakhs</option>
                    <option value="25l-50l">₹25 Lakhs – ₹50 Lakhs</option>
                    <option value="50l-1cr">₹50 Lakhs – ₹1.0 Crore</option>
                    <option value="1cr-2.5cr">₹1.0 Crore – ₹2.5 Crore (Turnkey Villa)</option>
                    <option value="2.5cr-plus">₹2.5 Crore+ (Signature Estate)</option>
                  </select>
                </div>
              </div>

              {status === 'declined' && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    isDark
                      ? 'bg-[#E5C583]/10 border-[#E5C583]/30 text-neutral-200'
                      : 'bg-[#8E651E]/10 border-[#8E651E]/30 text-stone-800'
                  }`}
                >
                  <AlertCircle
                    size={18}
                    className={`shrink-0 mt-0.5 ${
                      isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
                    }`}
                  />
                  <div>
                    <strong
                      className={`block font-bold mb-0.5 ${
                        isDark ? 'text-[#E5C583]' : 'text-[#8E651E]'
                      }`}
                    >
                      Project Scope Notice
                    </strong>
                    Lionorca Architeriors delivers turnkey architectural planning and execution starting from ₹25 Lakhs (with core focus on ₹1Cr+ residences).
                  </div>
                </div>
              )}

              <div>
                <label
                  className={`block text-xs uppercase tracking-wider font-bold mb-1.5 font-soft ${
                    isDark ? 'text-neutral-300' : 'text-stone-700'
                  }`}
                >
                  Plot Location & Dimensions (e.g. 4,000 sq ft, Indore Bypass)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share plot area, preferred architectural style, or specific requirements..."
                  value={formData.plotLocation}
                  onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-colors font-soft ${
                    isDark
                      ? 'bg-neutral-800/80 border-white/10 text-white placeholder-neutral-500 focus:border-[#E5C583]'
                      : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[#8E651E]'
                  }`}
                />
              </div>

              {/* Primary Form Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'declined' || !formData.budget}
                  className={`w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 font-soft ${
                    status === 'declined' || !formData.budget
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#D4AC55] via-[#C99E4A] to-[#B88D38] hover:from-[#C99E4A] hover:to-[#A87D2A] text-neutral-950 border border-[#B3872E]/30 shadow-md'
                  }`}
                >
                  <Sparkles size={16} />
                  <span>Submit Discovery Session Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Secondary Option: WhatsApp Direct */}
              <div className="pt-4 border-t border-stone-200 text-center">
                <span className="text-xs font-soft block mb-3 text-stone-500">
                  Prefer instant messaging? Connect directly:
                </span>
                <button
                  onClick={handleDirectWhatsApp}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1E7E34] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <MessageCircle size={15} className="fill-[#1E7E34] stroke-none" />
                  <span>WhatsApp Secondary Option &bull; Chat Directly</span>
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
