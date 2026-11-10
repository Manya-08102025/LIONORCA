import { useState, useMemo } from 'react'
import { useAdminData } from '../context/AdminDataContext'
import { Plus, Pencil, Trash2, X, Camera, Image, Eye, Filter } from 'lucide-react'

const CATEGORIES = [
  'Luxury Villa',
  'Penthouse',
  'Farmhouse',
  'Commercial',
  'Renovation',
]

const EMPTY_FORM = {
  title: '',
  description: '',
  imageUrl: '',
  category: CATEGORIES[0],
  status: 'Draft',
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function PortfolioManager() {
  const { projects, addProject, updateProject, deleteProject } = useAdminData()

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null) // null = add, object = edit
  const [form, setForm] = useState(EMPTY_FORM)

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Filters
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // ── Derived data ───────────────────────────────────────────────────────────

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== 'All' && p.status !== statusFilter) return false
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false
      return true
    })
  }, [projects, statusFilter, categoryFilter])

  const uniqueCategories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category))
    return ['All', ...cats]
  }, [projects])

  // ── Handlers ───────────────────────────────────────────────────────────────

  function openAddModal() {
    setEditingProject(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  function openEditModal(project) {
    setEditingProject(project)
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      category: project.category,
      status: project.status,
    })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingProject(null)
    setForm(EMPTY_FORM)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return

    if (editingProject) {
      updateProject(editingProject.id, { ...form })
    } else {
      addProject({ ...form })
    }
    closeModal()
  }

  function confirmDelete(project) {
    setDeleteTarget(project)
  }

  function handleDelete() {
    if (deleteTarget) {
      deleteProject(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2E2D2B] tracking-tight">
            Portfolio Manager
          </h1>
          <p className="mt-1 text-[#5C5A56] text-sm">
            Manage your Signature Projects &amp; Design Visions
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2E2D2B] hover:bg-[#C5A059] text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-[#E6E4DD]/50">
        <div className="flex items-center gap-2 text-[#5C5A56] text-sm font-medium">
          <Filter className="w-4 h-4" />
          Filters
        </div>

        <div className="h-6 w-px bg-[#E6E4DD]" />

        {/* Status pills */}
        <div className="flex items-center gap-1.5">
          {['All', 'Published', 'Draft'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                statusFilter === s
                  ? 'bg-[#2E2D2B] text-white'
                  : 'bg-[#F4F3EE]/70 text-[#5C5A56] hover:bg-[#E6E4DD]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-[#E6E4DD]" />

        {/* Category dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#F4F3EE]/70 text-[#5C5A56] border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
        >
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Categories' : c}
            </option>
          ))}
        </select>
      </div>

      {/* ── Project Grid / Empty State ──────────────────────────────────────── */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-[#F4F3EE] flex items-center justify-center mb-6">
            <Image className="w-8 h-8 text-[#C5A059]" />
          </div>
          <h3 className="font-serif text-xl text-[#2E2D2B] mb-2">No projects yet</h3>
          <p className="text-[#5C5A56] text-sm mb-6 max-w-xs">
            Add your first signature project to start building your portfolio.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2E2D2B] hover:bg-[#C5A059] text-white font-medium rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => openEditModal(project)}
              onDelete={() => confirmDelete(project)}
            />
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ────────────────────────────────────────────────── */}
      {modalOpen && (
        <ProjectModal
          form={form}
          isEditing={!!editingProject}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      {/* ── Delete Confirmation ─────────────────────────────────────────────── */}
      {deleteTarget && (
        <DeleteDialog
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

// ── Project Card ───────────────────────────────────────────────────────────────

function ProjectCard({ project, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false)
  const hasImage = project.imageUrl && !imgError

  return (
    <div className="group bg-white rounded-2xl border border-[#E6E4DD]/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-[#F4F3EE] overflow-hidden">
        {hasImage ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#B8B5AD]">
            <Camera className="w-10 h-10 mb-2" />
            <span className="text-xs font-medium">No image</span>
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-lg backdrop-blur-sm ${
            project.status === 'Published'
              ? 'bg-emerald-500/90 text-white'
              : 'bg-amber-400/90 text-[#2E2D2B]'
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-serif text-lg font-semibold text-[#2E2D2B] leading-snug">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-[#5C5A56] line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {project.category && (
          <span className="mt-3 self-start px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 rounded-md">
            {project.category}
          </span>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center gap-2 border-t border-[#E6E4DD]/50 mt-4">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5C5A56] bg-[#F4F3EE]/70 hover:bg-[#E6E4DD] rounded-lg transition-colors cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Project Modal ──────────────────────────────────────────────────────────────

function ProjectModal({ form, isEditing, onChange, onSubmit, onClose }) {
  const [imgPreviewError, setImgPreviewError] = useState(false)
  const hasPreview = form.imageUrl && !imgPreviewError

  // Reset preview error when URL changes
  function handleUrlChange(e) {
    setImgPreviewError(false)
    onChange(e)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#E6E4DD]/50 rounded-t-2xl">
          <h2 className="font-serif text-xl font-semibold text-[#2E2D2B]">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C5A56] hover:text-[#2E2D2B] hover:bg-[#F4F3EE] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#2E2D2B] mb-1.5">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={onChange}
              required
              placeholder="e.g. The Ivory Manor"
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none placeholder:text-[#B8B5AD] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#2E2D2B] mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              placeholder="Describe the project scope, features, and highlights…"
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none placeholder:text-[#B8B5AD] transition-colors resize-none"
            />
          </div>

          {/* Image URL + Preview */}
          <div>
            <label className="block text-sm font-medium text-[#2E2D2B] mb-1.5">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/project-image.jpg"
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none placeholder:text-[#B8B5AD] transition-colors"
            />
            {/* Preview */}
            {form.imageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-[#E6E4DD] aspect-video bg-[#F4F3EE]">
                {hasPreview ? (
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    onError={() => setImgPreviewError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#B8B5AD]">
                    <Camera className="w-8 h-8 mb-1" />
                    <span className="text-xs">Unable to load image</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#2E2D2B] mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-[#2E2D2B] mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={onChange}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          {/* Created date (read-only) */}
          <div>
            <label className="block text-sm font-medium text-[#2E2D2B] mb-1.5">
              Created Date
            </label>
            <input
              type="text"
              readOnly
              value={
                isEditing
                  ? new Date().toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Auto-filled on creation'
              }
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F4F3EE]/40 border border-[#E6E4DD] text-[#5C5A56] cursor-not-allowed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium border border-[#E6E4DD] text-[#5C5A56] rounded-xl hover:bg-[#F4F3EE] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium bg-[#2E2D2B] hover:bg-[#C5A059] text-white rounded-xl transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Delete Confirmation Dialog ─────────────────────────────────────────────────

function DeleteDialog({ title, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>

        <h3 className="font-serif text-lg font-semibold text-[#2E2D2B] mb-1">
          Delete Project
        </h3>
        <p className="text-sm text-[#5C5A56] mb-6">
          Are you sure you want to delete{' '}
          <span className="font-medium text-[#2E2D2B]">&ldquo;{title}&rdquo;</span>?
          This action cannot be undone.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-sm font-medium border border-[#E6E4DD] text-[#5C5A56] rounded-xl hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
