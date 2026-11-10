import { useState, useRef } from 'react'
import { Calendar, CheckCircle2, FileText, Bold, Italic, Heading3, Quote, List, Eye, Edit2 } from 'lucide-react'
import ImageUploader from '../components/ImageUploader'
import { useSimpleCms } from '../context/SimpleCmsContext'

export default function ArticlePublishPage() {
  const { publishArticle } = useSimpleCms()

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    coverImage: '',
    body: '',
  })

  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedSuccess, setPublishedSuccess] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const textareaRef = useRef(null)

  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = formData.body.substring(start, end) || 'Text'
    const replacement = `${prefix}${selected}${suffix}`

    const newBody =
      formData.body.substring(0, start) + replacement + formData.body.substring(end)

    setFormData({ ...formData, body: newBody })

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      )
    }, 50)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.coverImage || !formData.body) {
      alert('Please fill in the Article Title, Cover Image, and Body text.')
      return
    }

    setIsPublishing(true)
    await publishArticle(formData)
    setIsPublishing(false)
    setPublishedSuccess(true)

    // Reset to clean empty form
    setFormData({
      title: '',
      date: new Date().toISOString().slice(0, 10),
      coverImage: '',
      body: '',
    })

    setTimeout(() => setPublishedSuccess(false), 5000)
  }

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
          Add Media &amp; Insights Article
        </h1>
        <p className="text-sm text-neutral-500 mt-1.5 font-normal">
          Draft and publish an editorial article or podcast breakdown to the Media &amp; Insights section.
        </p>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span className="font-medium">
            Article published successfully to the website!
          </span>
        </div>
      )}

      {/* Clean Empty Form Card (No Clutter, No Dividers) */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title and Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-800 mb-2">
                Article Title <span className="text-amber-700">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Episode 12: Why Metro Architects Need Local Site Rigor in MP"
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">
                Publication Date <span className="text-amber-700">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                />
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Cover Image Upload */}
          <ImageUploader
            value={formData.coverImage}
            onChange={(url) => setFormData({ ...formData, coverImage: url })}
            label="Cover Image"
            hint="Upload or paste image URL (Cover photo or video thumbnail)"
          />

          {/* Row 3: Simple Rich Text Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-neutral-800">
                Article Body <span className="text-amber-700">*</span>
              </label>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    !showPreview
                      ? 'bg-white text-neutral-900 shadow-xs font-medium'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Edit2 size={12} />
                    <span>Write</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    showPreview
                      ? 'bg-white text-neutral-900 shadow-xs font-medium'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Eye size={12} />
                    <span>Preview</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Formatting Bar */}
            {!showPreview && (
              <div className="flex items-center gap-1 px-3 py-2 bg-neutral-100/60 rounded-t-xl">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  title="Bold"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors cursor-pointer"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  title="Italic"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors cursor-pointer"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n### ', '\n')}
                  title="Heading"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors cursor-pointer"
                >
                  <Heading3 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n> ', '\n')}
                  title="Quote"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors cursor-pointer"
                >
                  <Quote size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n• ', '\n')}
                  title="Bullet list"
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-white rounded transition-colors cursor-pointer"
                >
                  <List size={14} />
                </button>
              </div>
            )}

            {showPreview ? (
              <div className="w-full min-h-56 p-5 rounded-xl bg-neutral-50 text-neutral-800 text-sm leading-relaxed whitespace-pre-wrap">
                {formData.body ? (
                  formData.body
                ) : (
                  <p className="text-neutral-400 italic">No content written yet.</p>
                )}
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                rows={7}
                required
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                placeholder="Write article content here..."
                className="w-full px-4 py-3.5 rounded-b-xl text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all leading-relaxed"
              />
            )}
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={isPublishing || !formData.title || !formData.coverImage || !formData.body}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm ${
                !formData.title || !formData.coverImage || !formData.body
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-98'
              }`}
            >
              <FileText size={17} />
              <span>{isPublishing ? 'Publishing...' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
