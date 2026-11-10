import { useState } from 'react'
import { MapPin, CheckCircle2, Home } from 'lucide-react'
import ImageUploader from '../components/ImageUploader'
import { useSimpleCms } from '../context/SimpleCmsContext'

export default function ProjectPublishPage() {
  const { publishProject } = useSimpleCms()

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
  })

  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedSuccess, setPublishedSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.imageUrl) {
      alert('Please enter a Project Title and select an Image.')
      return
    }

    setIsPublishing(true)
    await publishProject(formData)
    setIsPublishing(false)
    setPublishedSuccess(true)

    // Reset to clean empty form
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
    })

    setTimeout(() => setPublishedSuccess(false), 5000)
  }

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
          Add Signature Project / Design Vision
        </h1>
        <p className="text-sm text-neutral-500 mt-1.5 font-normal">
          Fill in the details below to add a new project to the Design Visions section.
        </p>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span className="font-medium">
            Signature project published successfully to the website!
          </span>
        </div>
      )}

      {/* Clean Empty Form Card (No Clutter, No Dividers) */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title and Subtitle/Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">
                Project Title <span className="text-amber-700">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Minimalist Villa or The Courtyard Estate"
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">
                Subtitle / Location <span className="text-amber-700">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Bypass Corridor, Indore"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: High-Res Image Upload */}
          <ImageUploader
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="High-Res Image"
            hint="Upload or paste image URL (Landscape photo or 3D render)"
          />

          {/* Row 3: Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-2">
              Brief Description <span className="text-amber-700">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Clean geometry, cantilevered pergolas, and an internal light courtyard designed for passive cross-ventilation..."
              className="w-full px-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all leading-relaxed"
            />
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={isPublishing || !formData.title || !formData.imageUrl}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm ${
                !formData.title || !formData.imageUrl
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-98'
              }`}
            >
              <Home size={17} />
              <span>{isPublishing ? 'Publishing...' : 'Publish Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
