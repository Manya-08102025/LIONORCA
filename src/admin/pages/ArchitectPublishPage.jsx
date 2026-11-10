import { useState } from 'react'
import { MapPin, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react'
import ImageUploader from '../components/ImageUploader'
import { useSimpleCms } from '../context/SimpleCmsContext'

export default function ArchitectPublishPage() {
  const { publishArchitect } = useSimpleCms()

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    specialization: '',
    bio: '',
    imageUrl: '',
  })

  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedSuccess, setPublishedSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.imageUrl) {
      alert('Please provide the Architect Name and an Image.')
      return
    }

    setIsPublishing(true)
    await publishArchitect(formData)
    setIsPublishing(false)
    setPublishedSuccess(true)

    // Reset to clean empty form
    setFormData({
      name: '',
      location: '',
      specialization: '',
      bio: '',
      imageUrl: '',
    })

    setTimeout(() => setPublishedSuccess(false), 5000)
  }

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
          Add New Architect Flashcard
        </h1>
        <p className="text-sm text-neutral-500 mt-1.5 font-normal">
          Fill in the details below to add an architect to the website showcase.
        </p>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span className="font-medium">
            Architect flashcard published successfully to the website!
          </span>
        </div>
      )}

      {/* Clean Empty Form Card (No Clutter, No Dividers) */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Architect Name & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">
                Architect Name <span className="text-amber-700">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ar. Rohit Saxena or Architect Name"
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">
                City / Location <span className="text-amber-700">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Central India, Indore, Mumbai"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Specialization */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-2">
              Specialization / Style <span className="text-amber-700">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g. Modern Minimalist & Courtyard Villas"
              className="w-full px-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
            />
          </div>

          {/* Row 3: Profile Image Upload */}
          <ImageUploader
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Profile Image"
            hint="Upload or paste image URL (Portrait or Elevation)"
          />

          {/* Row 4: Short Bio */}
          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-2">
              Short Bio / Design Description
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief summary of design philosophy and experience..."
              className="w-full px-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all leading-relaxed"
            />
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={isPublishing || !formData.name || !formData.imageUrl}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm ${
                !formData.name || !formData.imageUrl
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-98'
              }`}
            >
              <UserCheck size={17} />
              <span>{isPublishing ? 'Publishing...' : 'Publish Architect'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
