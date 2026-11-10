import React, { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import {
  Briefcase,
  HardHat,
  CheckCircle2,
  ArrowRight,
  Check,
} from 'lucide-react'

export default function WorkWithUs() {
  const [activeTab, setActiveTab] = useState('careers') // 'careers' | 'vendors'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedCareer, setSubmittedCareer] = useState(false)
  const [submittedVendor, setSubmittedVendor] = useState(false)

  // ── Form A: Careers (3 Clean Fields) ──
  const [careerData, setCareerData] = useState({
    fullName: '',
    phone: '',
    role: '',
  })

  // ── Form B: Vendors (3 Clean Fields) ──
  const [vendorData, setVendorData] = useState({
    businessName: '',
    phone: '',
    trade: '',
  })

  // ════════════════════════════════════════════════════════════════
  // BACKEND PREP HANDLERS (Ready for CMS / Webhook Routing)
  // ════════════════════════════════════════════════════════════════
  const handleCareerSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      type: 'CAREER_APPLICATION',
      fullName: careerData.fullName,
      phone: careerData.phone,
      role: careerData.role,
      submittedAt: new Date().toISOString(),
    }

    console.log('[WorkWithUs] Career Application Payload:', payload)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedCareer(true)
    }, 600)
  }

  const handleVendorSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      type: 'VENDOR_PARTNERSHIP',
      businessName: vendorData.businessName,
      phone: vendorData.phone,
      trade: vendorData.trade,
      submittedAt: new Date().toISOString(),
    }

    console.log('[WorkWithUs] Vendor Application Payload:', payload)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedVendor(true)
    }, 600)
  }

  return (
    <div className="w-full min-h-screen bg-[#F9F8F6] text-gray-900 font-sans selection:bg-[#DEB853]/20 selection:text-gray-900">
      {/* ─── 1. Page Header & Hero Section ─── */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Soft Ambient Radial Glaze */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DEB853]/6 rounded-full blur-3xl pointer-events-none -mt-32" />

        <ScrollReveal delay={0} duration={0.8} y={25} className="max-w-2xl mx-auto relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-stone-500 hover:text-[#9A7228] transition-colors mb-5 group cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            <span>Back to Home</span>
          </a>

          <p className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#9A7228] mb-3">
            Careers &amp; Partnerships
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.14] mb-3.5">
            Partner with Lionorca
          </h1>
          <p className="font-sans text-gray-600 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl mx-auto font-normal">
            Build the extraordinary with us. Select your path below to join our team or become an execution partner.
          </p>
        </ScrollReveal>
      </section>

      {/* ─── 2. Selection UI & Form Container (Max-W-XL Layout) ─── */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {/* Two Paths Selector Cards */}
          <ScrollReveal delay={100} duration={0.8} y={30} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
            {/* Card 1: Join the Team */}
            <button
              type="button"
              onClick={() => setActiveTab('careers')}
              className={`p-5 rounded-[20px] border text-left transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                activeTab === 'careers'
                  ? 'bg-white border-[#C5A059] shadow-[0_10px_30px_rgba(197,160,89,0.12)] ring-1 ring-[#C5A059]'
                  : 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeTab === 'careers'
                        ? 'bg-[#F5EFE6] text-[#8E651E]'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Briefcase size={19} className="stroke-[1.8]" />
                  </div>
                  {activeTab === 'careers' ? (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#8E651E] text-[10.5px] font-bold uppercase tracking-wider">
                      <Check size={11} className="stroke-[2.5]" />
                      Selected
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-stone-500">Select</span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 leading-snug">
                  Join the Team
                </h3>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                  For Architects, Interior Designers, and 3D Visualizers.
                </p>
              </div>
            </button>

            {/* Card 2: Become a Vendor / Contractor */}
            <button
              type="button"
              onClick={() => setActiveTab('vendors')}
              className={`p-5 rounded-[20px] border text-left transition-all duration-300 relative cursor-pointer flex flex-col justify-between ${
                activeTab === 'vendors'
                  ? 'bg-white border-[#C5A059] shadow-[0_10px_30px_rgba(197,160,89,0.12)] ring-1 ring-[#C5A059]'
                  : 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeTab === 'vendors'
                        ? 'bg-[#F5EFE6] text-[#8E651E]'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <HardHat size={19} className="stroke-[1.8]" />
                  </div>
                  {activeTab === 'vendors' ? (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#8E651E] text-[10.5px] font-bold uppercase tracking-wider">
                      <Check size={11} className="stroke-[2.5]" />
                      Selected
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-stone-500">Select</span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 leading-snug">
                  Become a Vendor
                </h3>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                  For Civil, Plumbing, Carpentry, and Material Partners.
                </p>
              </div>
            </button>
          </ScrollReveal>

          {/* ─── 3. Form Container ─── */}
          <ScrollReveal delay={150} duration={0.8} y={30}>
            {activeTab === 'careers' && (
              <div className="bg-white rounded-[24px] border border-stone-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all animate-in fade-in duration-300">
              {submittedCareer ? (
                <div className="py-10 text-center max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-full bg-[#F5EFE6] text-[#8E651E] flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <CheckCircle2 size={28} className="stroke-[2]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                    Application Received
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    Thank you for applying. Our design leadership team will review your profile and reach out on your phone number shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedCareer(false)
                      setCareerData({ fullName: '', phone: '', role: '' })
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 text-xs font-semibold text-gray-800 hover:border-[#9A7228] hover:text-[#9A7228] transition-colors cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-5">
                  <div className="border-b border-stone-100 pb-4 mb-5">
                    <h2 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                      Join the Team
                    </h2>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Share your contact and role to start the conversation.
                    </p>
                  </div>

                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohini Sharma"
                      value={careerData.fullName}
                      onChange={(e) =>
                        setCareerData({ ...careerData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={careerData.phone}
                      onChange={(e) =>
                        setCareerData({ ...careerData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* 3. Role / Specialization */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Role / Specialization <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Architect, Visualizer, Project Manager"
                      value={careerData.role}
                      onChange={(e) =>
                        setCareerData({ ...careerData, role: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#262626] to-[#1A1A1A] hover:from-[#2B2B2B] hover:to-[#2B2B2B] text-white font-sans font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ─── 4. Form B: Contractors & Vendors (3 Clean Fields) ─── */}
          {activeTab === 'vendors' && (
            <div className="bg-white rounded-[24px] border border-stone-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all animate-in fade-in duration-300">
              {submittedVendor ? (
                <div className="py-10 text-center max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-full bg-[#F5EFE6] text-[#8E651E] flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <CheckCircle2 size={28} className="stroke-[2]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                    Registration Submitted
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    Thank you for applying. Our procurement and project management teams will review your details and contact you for upcoming tenders.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedVendor(false)
                      setVendorData({ businessName: '', phone: '', trade: '' })
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 text-xs font-semibold text-gray-800 hover:border-[#9A7228] hover:text-[#9A7228] transition-colors cursor-pointer"
                  >
                    Register Another Vendor
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVendorSubmit} className="space-y-5">
                  <div className="border-b border-stone-100 pb-4 mb-5">
                    <h2 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                      Vendor &amp; Contractor Registration
                    </h2>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Join Lionorca's verified network of specialized execution partners.
                    </p>
                  </div>

                  {/* 1. Name / Business Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Name / Business Name <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Civil & Interiors / Rajesh Kumar"
                      value={vendorData.businessName}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, businessName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98111 22233"
                      value={vendorData.phone}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* 3. Trade / Service Provided */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Trade / Service Provided <span className="text-[#9A7228]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Civil, Carpentry, Bespoke Furniture, Electrical"
                      value={vendorData.trade}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, trade: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5]/80 border border-stone-200 text-gray-900 text-sm transition-all focus:outline-none focus:bg-white focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/40"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#262626] to-[#1A1A1A] hover:from-[#2B2B2B] hover:to-[#2B2B2B] text-white font-sans font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Apply as Vendor</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
