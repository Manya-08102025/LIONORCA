import { useState } from 'react'
import { useAdminData } from '../context/AdminDataContext'
import {
  Building2,
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  Briefcase,
  Phone,
  Mail,
  Eye,
  FileText,
  Search,
} from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const VENDOR_CATEGORIES = [
  'Structural Engineering',
  'Interior Finishing',
  'HVAC & MEP',
  'Landscape Architecture',
  'Stone & Marble',
  'Carpentry & Joinery',
  'Lighting & Electricals',
  'Civil Construction',
  'Plumbing & Sanitary',
  'Glass & Glazing',
  'Painting & Coating',
  'Smart Home & Automation',
]

const EMPTY_VENDOR = {
  businessName: '',
  category: '',
  contact: '',
  email: '',
  phone: '',
  status: 'Active',
}

// ── VendorTeamPortal ──────────────────────────────────────────────────────────

export default function VendorTeamPortal() {
  const {
    vendors,
    applicants,
    addVendor,
    updateVendor,
    deleteVendor,
    updateApplicant,
    deleteApplicant,
  } = useAdminData()

  const [activeTab, setActiveTab] = useState('vendors')

  // Vendor state
  const [vendorModal, setVendorModal] = useState(false)
  const [editingVendor, setEditingVendor] = useState(null)
  const [vendorForm, setVendorForm] = useState(EMPTY_VENDOR)
  const [vendorSearch, setVendorSearch] = useState('')

  // Applicant state
  const [applicantModal, setApplicantModal] = useState(false)
  const [viewingApplicant, setViewingApplicant] = useState(null)
  const [applicantNotes, setApplicantNotes] = useState('')
  const [applicantSearch, setApplicantSearch] = useState('')

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // ── Vendor handlers ───────────────────────────────────────────────────────

  function openAddVendor() {
    setEditingVendor(null)
    setVendorForm(EMPTY_VENDOR)
    setVendorModal(true)
  }

  function openEditVendor(vendor) {
    setEditingVendor(vendor)
    setVendorForm({
      businessName: vendor.businessName,
      category: vendor.category,
      contact: vendor.contact,
      email: vendor.email,
      phone: vendor.phone,
      status: vendor.status,
    })
    setVendorModal(true)
  }

  function handleVendorSubmit(e) {
    e.preventDefault()
    if (editingVendor) {
      updateVendor(editingVendor.id, vendorForm)
    } else {
      addVendor(vendorForm)
    }
    setVendorModal(false)
    setEditingVendor(null)
    setVendorForm(EMPTY_VENDOR)
  }

  function handleDeleteVendor(id) {
    deleteVendor(id)
    setDeleteConfirm(null)
  }

  // ── Applicant handlers ────────────────────────────────────────────────────

  function openApplicantDetail(applicant) {
    setViewingApplicant(applicant)
    setApplicantNotes(applicant.notes || '')
    setApplicantModal(true)
  }

  function handleSaveApplicantNotes() {
    if (viewingApplicant) {
      updateApplicant(viewingApplicant.id, { notes: applicantNotes })
    }
    setApplicantModal(false)
    setViewingApplicant(null)
  }

  function handleDeleteApplicant(id) {
    deleteApplicant(id)
    setDeleteConfirm(null)
  }

  // ── Filtered data ─────────────────────────────────────────────────────────

  const filteredVendors = vendors.filter(
    (v) =>
      v.businessName.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      v.category.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      v.contact.toLowerCase().includes(vendorSearch.toLowerCase())
  )

  const filteredApplicants = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.role.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(applicantSearch.toLowerCase())
  )

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FCFCFA]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#2E2D2B] tracking-tight">
          Vendor & Team Portal
        </h1>
        <p className="mt-1 text-[#7A7772] font-sans text-sm">
          Manage vendors, contractors, and job applicants in one place.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="mb-6">
        <div className="bg-[#F4F3EE] rounded-xl p-1 inline-flex gap-1">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-sans transition-all duration-200 cursor-pointer ${
              activeTab === 'vendors'
                ? 'bg-[#2E2D2B] text-white shadow-sm'
                : 'bg-transparent text-[#5C5A56] hover:bg-[#F4F3EE]/80'
            }`}
          >
            <Building2 size={16} />
            Vendors & Contractors
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-sans transition-all duration-200 cursor-pointer ${
              activeTab === 'applicants'
                ? 'bg-[#2E2D2B] text-white shadow-sm'
                : 'bg-transparent text-[#5C5A56] hover:bg-[#F4F3EE]/80'
            }`}
          >
            <Users size={16} />
            Job Applicants
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'vendors' ? (
        <VendorsTab
          vendors={filteredVendors}
          search={vendorSearch}
          onSearchChange={setVendorSearch}
          onAdd={openAddVendor}
          onEdit={openEditVendor}
          onDelete={(id) => setDeleteConfirm({ type: 'vendor', id })}
        />
      ) : (
        <ApplicantsTab
          applicants={filteredApplicants}
          search={applicantSearch}
          onSearchChange={setApplicantSearch}
          onView={openApplicantDetail}
          onDelete={(id) => setDeleteConfirm({ type: 'applicant', id })}
        />
      )}

      {/* Vendor Add/Edit Modal */}
      {vendorModal && (
        <VendorModal
          form={vendorForm}
          setForm={setVendorForm}
          isEditing={!!editingVendor}
          onSubmit={handleVendorSubmit}
          onClose={() => {
            setVendorModal(false)
            setEditingVendor(null)
            setVendorForm(EMPTY_VENDOR)
          }}
        />
      )}

      {/* Applicant Detail Modal */}
      {applicantModal && viewingApplicant && (
        <ApplicantDetailModal
          applicant={viewingApplicant}
          notes={applicantNotes}
          onNotesChange={setApplicantNotes}
          onSave={handleSaveApplicantNotes}
          onClose={() => {
            setApplicantModal(false)
            setViewingApplicant(null)
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          type={deleteConfirm.type}
          onConfirm={() =>
            deleteConfirm.type === 'vendor'
              ? handleDeleteVendor(deleteConfirm.id)
              : handleDeleteApplicant(deleteConfirm.id)
          }
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  )
}

// ── Vendors Tab ───────────────────────────────────────────────────────────────

function VendorsTab({ vendors, search, onSearchChange, onAdd, onEdit, onDelete }) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7772]"
          />
          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors"
          />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2E2D2B] text-white rounded-xl text-sm font-semibold font-sans hover:bg-[#3D3C39] transition-colors cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          Add Vendor
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-[#E6E4DD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E6E4DD] bg-[#FCFCFA]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Business Name
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Category
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden lg:table-cell">
                  Contact Person
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden xl:table-cell">
                  Phone
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Status
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E4DD]">
              {vendors.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center text-[#7A7772] font-sans text-sm"
                  >
                    <Building2
                      size={36}
                      className="mx-auto mb-3 text-[#E6E4DD]"
                    />
                    No vendors found. Add your first vendor to get started.
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-[#FCFCFA] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-[#2E2D2B] font-sans">
                        {vendor.businessName}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4F3EE] text-xs font-medium text-[#5C5A56] font-sans">
                        {vendor.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-sm text-[#5C5A56] font-sans">
                        {vendor.contact}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm text-[#5C5A56] font-sans">
                        {vendor.email}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell">
                      <span className="text-sm text-[#5C5A56] font-sans">
                        {vendor.phone}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={vendor.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(vendor)}
                          className="p-2 rounded-lg text-[#7A7772] hover:text-[#2E2D2B] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
                          title="Edit vendor"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => onDelete(vendor.id)}
                          className="p-2 rounded-lg text-[#7A7772] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete vendor"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {vendors.length > 0 && (
          <div className="px-5 py-3 border-t border-[#E6E4DD] bg-[#FCFCFA]">
            <p className="text-xs text-[#7A7772] font-sans">
              Showing {vendors.length} vendor{vendors.length !== 1 && 's'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Applicants Tab ────────────────────────────────────────────────────────────

function ApplicantsTab({ applicants, search, onSearchChange, onView, onDelete }) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7772]"
          />
          <input
            type="text"
            placeholder="Search applicants..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors"
          />
        </div>
        <div className="text-sm text-[#7A7772] font-sans">
          {applicants.length} applicant{applicants.length !== 1 && 's'}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-[#E6E4DD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E6E4DD] bg-[#FCFCFA]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Name
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Role Applied
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden lg:table-cell">
                  Phone
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden xl:table-cell">
                  Applied Date
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans hidden sm:table-cell">
                  Resume
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#7A7772] uppercase tracking-wider font-sans">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E4DD]">
              {applicants.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center text-[#7A7772] font-sans text-sm"
                  >
                    <Users
                      size={36}
                      className="mx-auto mb-3 text-[#E6E4DD]"
                    />
                    No applicants found.
                  </td>
                </tr>
              ) : (
                applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="hover:bg-[#FCFCFA] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-[#2E2D2B] font-sans">
                        {applicant.name}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4F3EE] text-xs font-medium text-[#5C5A56] font-sans">
                        <Briefcase size={12} />
                        {applicant.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm text-[#5C5A56] font-sans">
                        {applicant.email}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-sm text-[#5C5A56] font-sans">
                        {applicant.contact}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell">
                      <span className="text-sm text-[#5C5A56] font-sans">
                        {formatDate(applicant.appliedDate)}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {applicant.resumeUrl ? (
                        <a
                          href={applicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#C5A059] hover:text-[#A8863D] font-medium font-sans transition-colors"
                        >
                          <FileText size={14} />
                          View Resume
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-sm text-[#7A7772] italic font-sans">
                          Not provided
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onView(applicant)}
                          className="p-2 rounded-lg text-[#7A7772] hover:text-[#2E2D2B] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
                          title="View details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onDelete(applicant.id)}
                          className="p-2 rounded-lg text-[#7A7772] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete applicant"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {applicants.length > 0 && (
          <div className="px-5 py-3 border-t border-[#E6E4DD] bg-[#FCFCFA]">
            <p className="text-xs text-[#7A7772] font-sans">
              Showing {applicants.length} applicant{applicants.length !== 1 && 's'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Vendor Modal ──────────────────────────────────────────────────────────────

function VendorModal({ form, setForm, isEditing, onSubmit, onClose }) {
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6E4DD]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2E2D2B]">
              {isEditing ? 'Edit Vendor' : 'Add New Vendor'}
            </h2>
            <p className="text-xs text-[#7A7772] font-sans mt-0.5">
              {isEditing
                ? 'Update vendor information below.'
                : 'Fill in the details to register a new vendor.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#7A7772] hover:text-[#2E2D2B] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
          {/* Business Name */}
          <div>
            <label className="block text-xs font-semibold text-[#5C5A56] font-sans mb-1.5 uppercase tracking-wider">
              Business Name
            </label>
            <input
              type="text"
              required
              value={form.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              placeholder="e.g., Shree Marbles & Granites"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#5C5A56] font-sans mb-1.5 uppercase tracking-wider">
              Category
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select a category…</option>
              {VENDOR_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Person & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5C5A56] font-sans mb-1.5 uppercase tracking-wider">
                Contact Person
              </label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={(e) => updateField('contact', e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5C5A56] font-sans mb-1.5 uppercase tracking-wider">
                Phone
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#5C5A56] font-sans mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="vendor@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors"
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD]">
            <div>
              <p className="text-sm font-semibold text-[#2E2D2B] font-sans">
                Vendor Status
              </p>
              <p className="text-xs text-[#7A7772] font-sans mt-0.5">
                {form.status === 'Active'
                  ? 'This vendor is currently active and available.'
                  : 'This vendor is currently inactive.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateField(
                  'status',
                  form.status === 'Active' ? 'Inactive' : 'Active'
                )
              }
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
                form.status === 'Active' ? 'bg-[#2E2D2B]' : 'bg-[#E6E4DD]'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form.status === 'Active'
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#5C5A56] font-sans hover:bg-[#F4F3EE] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#2E2D2B] text-white text-sm font-semibold font-sans hover:bg-[#3D3C39] transition-colors cursor-pointer shadow-sm"
            >
              {isEditing ? 'Save Changes' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Applicant Detail Modal ────────────────────────────────────────────────────

function ApplicantDetailModal({ applicant, notes, onNotesChange, onSave, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6E4DD]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2E2D2B]">
              Applicant Details
            </h2>
            <p className="text-xs text-[#7A7772] font-sans mt-0.5">
              Review applicant information and add notes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#7A7772] hover:text-[#2E2D2B] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Applicant Info Card */}
          <div className="p-4 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#2E2D2B] flex items-center justify-center text-white font-serif text-lg font-bold">
                {applicant.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-[#2E2D2B] font-sans">
                  {applicant.name}
                </p>
                <p className="text-xs text-[#7A7772] font-sans flex items-center gap-1">
                  <Briefcase size={11} />
                  {applicant.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-[#5C5A56] font-sans">
                <Mail size={14} className="text-[#7A7772] shrink-0" />
                <span className="truncate">{applicant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5C5A56] font-sans">
                <Phone size={14} className="text-[#7A7772] shrink-0" />
                {applicant.contact}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5C5A56] font-sans">
                <Briefcase size={14} className="text-[#7A7772] shrink-0" />
                Applied {formatDate(applicant.appliedDate)}
              </div>
              <div className="flex items-center gap-2 text-sm font-sans">
                <FileText size={14} className="text-[#7A7772] shrink-0" />
                {applicant.resumeUrl ? (
                  <a
                    href={applicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A059] hover:text-[#A8863D] font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    View Resume
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-[#7A7772] italic">Not provided</span>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#5C5A56] font-sans mb-1.5 uppercase tracking-wider">
              Internal Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Add interview notes, impressions, next steps…"
              className="w-full px-4 py-3 rounded-xl bg-[#F4F3EE] border border-[#E6E4DD] text-sm text-[#2E2D2B] font-sans placeholder:text-[#7A7772] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#5C5A56] font-sans hover:bg-[#F4F3EE] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-6 py-2.5 rounded-xl bg-[#2E2D2B] text-white text-sm font-semibold font-sans hover:bg-[#3D3C39] transition-colors cursor-pointer shadow-sm"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Delete Confirmation Modal ─────────────────────────────────────────────────

function DeleteConfirmModal({ type, onConfirm, onCancel }) {
  const label = type === 'vendor' ? 'vendor' : 'applicant'

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#2E2D2B] mb-1">
          Delete {label}?
        </h3>
        <p className="text-sm text-[#7A7772] font-sans mb-6">
          This action cannot be undone. The {label} record will be permanently
          removed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#5C5A56] font-sans hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold font-sans hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const isActive = status === 'Active'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-sans ${
        isActive
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-[#F4F3EE] text-[#7A7772]'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? 'bg-emerald-500' : 'bg-[#7A7772]'
        }`}
      />
      {status}
    </span>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateString) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
