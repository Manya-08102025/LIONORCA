import { useState, useRef } from 'react'
import { UploadCloud, Image as ImageIcon, Link, X, Check } from 'lucide-react'

export default function ImageUploader({
  value,
  onChange,
  label = 'Upload Image',
  hint = 'High-resolution JPG, PNG or WebP',
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP)')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      onChange(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setShowUrlInput(false)
      setUrlInput('')
    }
  }

  return (
    <div className="space-y-2.5 font-sans">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-neutral-800">
          {label} <span className="text-amber-700">*</span>
        </label>
        <span className="text-xs text-neutral-400 font-normal">
          {hint}
        </span>
      </div>

      {value ? (
        // Clean Live Preview State
        <div className="rounded-2xl overflow-hidden bg-neutral-50 shadow-sm transition-all">
          <div className="relative aspect-[16/9] max-h-72 w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/images/hero-arch-1.jpg'
              }}
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 text-xs font-medium text-neutral-800 bg-white/95 hover:bg-white backdrop-blur-md rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Change Photo
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 text-neutral-600 hover:text-red-600 bg-white/95 hover:bg-white backdrop-blur-md rounded-lg shadow-sm transition-all cursor-pointer"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <Check size={13} className="text-amber-400" />
              <span>Image loaded</span>
            </div>
          </div>
        </div>
      ) : (
        // Open, Minimal Drag & Drop Zone
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
            isDragging
              ? 'bg-amber-50/70 ring-2 ring-amber-500/40'
              : 'bg-neutral-50 hover:bg-neutral-100/70'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm text-neutral-700 flex items-center justify-center mb-3">
            <UploadCloud size={24} strokeWidth={1.75} />
          </div>

          <p className="text-sm font-medium text-neutral-800 mb-1">
            Drag &amp; drop image here, or{' '}
            <span className="text-amber-700 underline font-medium">browse device</span>
          </p>
          <p className="text-xs text-neutral-400">
            Click anywhere in this box to pick a file
          </p>

          {/* Paste URL Option */}
          <div className="mt-4 pt-3 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowUrlInput(!showUrlInput)
              }}
              className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white transition-colors shadow-xs cursor-pointer"
            >
              <Link size={13} />
              <span>Or enter image link (URL)</span>
            </button>

            {showUrlInput && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-2 w-full max-w-sm flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm"
              >
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://... or /images/..."
                  className="flex-1 px-3 py-1.5 text-xs bg-transparent focus:outline-none text-neutral-800 placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden File Picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
