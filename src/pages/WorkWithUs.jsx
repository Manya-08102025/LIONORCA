import React, { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import {
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

export default function WorkWithUs() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roleCategory: 'Architect / Interior Designer',
    location: '',
  })

  const roleCategories = [
    'Architect / Interior Designer',
    'Civil / General Contractor',
    'Material / Vendor Partner',
    'Specialized Artisan / Craftsman',
    'Career / Join the Team',
    'Other Collaboration',
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      type: 'WORK_WITH_US_APPLICATION',
      ...formData,
      submittedAt: new Date().toISOString(),
    }

    console.log('[WorkWithUs] Application Submitted:', payload)

    // Save locally for persistence / lead tracking
    try {
      const existing = JSON.parse(localStorage.getItem('lionorca_partner_leads') || '[]')
      existing.unshift(payload)
      localStorage.setItem('lionorca_partner_leads', JSON.stringify(existing))
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 500)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      phone: '',
      roleCategory: 'Architect / Interior Designer',
      location: '',
    })
  }

  return (
    <div className="w-full min-h-screen bg-[#F9F8F6] text-gray-900 font-sans selection:bg-[#DEB853]/20 selection:text-gray-900">
      {/* ─── 1. Header Section ─── */}
      <section className="pt-28 sm:pt-32 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Soft Ambient Radial Glaze */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[#DEB853]/6 rounded-full blur-3xl pointer-events-none -mt-32" />

        <ScrollReveal delay={0} duration={0.8} y={20} className="max-w-xl mx-auto relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-stone-500 hover:text-[#9A7228] transition-colors mb-5 group cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            <span>Back to Home</span>
          </a>

          <p className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#9A7228] mb-3">
            Partnerships &amp; Careers
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-3">
            Work With Us
          </h1>
          <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-normal">
            Whether you are an architect, designer, contractor, or specialized artisan — collaborate with Lionorca on Central India's finest luxury residences.
          </p>
        </ScrollReveal>
      </section>

      {/* ─── 2. Single Unified Form Section (Minimum Details) ─── */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <ScrollReveal delay={100} duration={0.8} y={25}>
            <div className="bg-white rounded-[24px] border border-stone-200/90 p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              {submitted ? (
                <div className="py-10 text-center max-w-sm mx-auto animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#F5EFE6] text-[#8E651E] flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <CheckCircle2 size={28} className="stroke-[2]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                    Details Received
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 font-normal">
                    Thank you for reaching out. Our team will review your details and connect with you on your phone number shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-300 text-xs font-semibold uppercase tracking-wider text-gray-800 hover:border-[#9A7228] hover:text-[#9A7228] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Form Header */}
                  <div className="border-b border-stone-100 pb-4 mb-1">
                    <h2 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                      Collaborate with Lionorca
                    </h2>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Share your basic details to initiate a partnership or join our execution network.
                    </p>
                  </div>

                  {/* 1. Name / Business Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Name / Business Name <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma / Studio Form"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone / WhatsApp Number <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* 3. Role / Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      I am applying as / Role <span className="text-[#9A7228]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.roleCategory}
                        onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40 cursor-pointer appearance-none pr-10"
                      >
                        {roleCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 4. City / Base Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Indore, Bhopal, Mumbai, etc."
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#262626] to-[#1A1A1A] hover:from-[#2B2B2B] hover:to-[#2B2B2B] text-white font-sans font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Details</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
