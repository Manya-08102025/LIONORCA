import { useState, useMemo, useRef, useCallback } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Bold,
  Italic,
  Heading3,
  Quote,
  Link,
  List,
  Eye,
  FileText,
  Calendar,
  Save,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

// ── Helpers ─────────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const EMPTY_ARTICLE = {
  title: '',
  date: todayISO(),
  coverImage: '',
  author: 'Akshay Jadaun',
  status: 'Draft',
  body: '',
};

// ── Status Badge ────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles =
    status === 'Published'
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-amber-50 text-amber-700';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

// ── Toolbar Button ──────────────────────────────────────────────────────────────

function ToolbarBtn({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="p-2 rounded-lg hover:bg-[#F4F3EE] text-[#5C5A56] hover:text-[#2E2D2B] transition-colors cursor-pointer"
    >
      <Icon className="w-4 h-4" strokeWidth={1.8} />
    </button>
  );
}

// ── Delete Confirmation Modal ───────────────────────────────────────────────────

function DeleteConfirm({ articleTitle, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="font-serif text-lg font-semibold text-[#2E2D2B]">Delete Article</h3>
        <p className="text-sm text-[#5C5A56] mt-2 font-sans">
          Are you sure you want to delete{' '}
          <span className="font-medium text-[#2E2D2B]">"{articleTitle}"</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[#5C5A56] rounded-xl border border-[#E6E4DD] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Article Editor Modal ────────────────────────────────────────────────────────

function ArticleEditor({ article, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_ARTICLE, ...article });
  const textareaRef = useRef(null);

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  // ── Toolbar actions – insert HTML tags around selection ──────────────────
  const wrapSelection = useCallback(
    (before, after) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = form.body.slice(start, end);
      const wrapped = `${before}${selected}${after}`;
      const newBody = form.body.slice(0, start) + wrapped + form.body.slice(end);
      set('body', newBody);
      // restore cursor after React re-render
      requestAnimationFrame(() => {
        ta.focus();
        ta.selectionStart = start + before.length;
        ta.selectionEnd = start + before.length + selected.length;
      });
    },
    [form.body]
  );

  const handleBold = () => wrapSelection('<strong>', '</strong>');
  const handleItalic = () => wrapSelection('<em>', '</em>');
  const handleHeading = () => wrapSelection('<h3>', '</h3>');
  const handleQuote = () => wrapSelection('<blockquote>', '</blockquote>');
  const handleList = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.body.slice(start, end);
    const items = selected
      ? selected
          .split('\n')
          .map((line) => `  <li>${line}</li>`)
          .join('\n')
      : '  <li></li>';
    const wrapped = `<ul>\n${items}\n</ul>`;
    const newBody = form.body.slice(0, start) + wrapped + form.body.slice(end);
    set('body', newBody);
  };
  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (!url) return;
    wrapSelection(`<a href="${url}">`, '</a>');
  };

  const handleSave = (statusOverride) => {
    const payload = { ...form };
    if (statusOverride) payload.status = statusOverride;
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-8">
      <div className="bg-[#FCFCFA] rounded-2xl shadow-2xl w-full max-w-4xl mx-4 my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E4DD]/60 shrink-0">
          <h2 className="font-serif text-xl font-semibold text-[#2E2D2B]">
            {article?.id ? 'Edit Article' : 'New Article'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl hover:bg-[#F4F3EE] text-[#7A7772] hover:text-[#2E2D2B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A7772] font-sans font-medium mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Article title…"
              className="w-full px-4 py-3 rounded-xl border border-[#E6E4DD] bg-white font-serif text-lg text-[#2E2D2B] placeholder:text-[#C5B89A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition"
            />
          </div>

          {/* Date + Author Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7A7772] font-sans font-medium mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6E4DD] bg-white text-sm text-[#2E2D2B] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition font-sans"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7A7772] font-sans font-medium mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                placeholder="Author name"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6E4DD] bg-white text-sm text-[#2E2D2B] placeholder:text-[#C5B89A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition font-sans"
              />
            </div>
          </div>

          {/* Cover Image URL + Preview */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A7772] font-sans font-medium mb-1.5">
              Cover Image URL
            </label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => set('coverImage', e.target.value)}
              placeholder="https://…"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E6E4DD] bg-white text-sm text-[#2E2D2B] placeholder:text-[#C5B89A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] transition font-sans"
            />
            {form.coverImage && (
              <div className="mt-2 w-48 h-32 rounded-xl overflow-hidden border border-[#E6E4DD]">
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}
          </div>

          {/* Status Toggle */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A7772] font-sans font-medium mb-1.5">
              Status
            </label>
            <div className="inline-flex rounded-xl border border-[#E6E4DD] overflow-hidden">
              <button
                type="button"
                onClick={() => set('status', 'Draft')}
                className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  form.status === 'Draft'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-white text-[#7A7772] hover:bg-[#F4F3EE]'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => set('status', 'Published')}
                className={`px-4 py-2 text-sm font-medium border-l border-[#E6E4DD] transition-colors cursor-pointer ${
                  form.status === 'Published'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-white text-[#7A7772] hover:bg-[#F4F3EE]'
                }`}
              >
                Published
              </button>
            </div>
          </div>

          {/* Body Editor */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7A7772] font-sans font-medium mb-1.5">
              Body
            </label>

            {/* Toolbar */}
            <div className="flex items-center gap-0.5 bg-white rounded-t-xl border border-b-0 border-[#E6E4DD] px-2 py-1.5">
              <ToolbarBtn icon={Bold} label="Bold" onClick={handleBold} />
              <ToolbarBtn icon={Italic} label="Italic" onClick={handleItalic} />
              <ToolbarBtn icon={Heading3} label="Heading" onClick={handleHeading} />
              <ToolbarBtn icon={Quote} label="Quote" onClick={handleQuote} />
              <ToolbarBtn icon={Link} label="Link" onClick={handleLink} />
              <ToolbarBtn icon={List} label="List" onClick={handleList} />
              <div className="flex-1" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7772] font-sans select-none pr-1">
                HTML
              </span>
            </div>

            {/* Two-column: editor + preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-[#E6E4DD] rounded-b-xl overflow-hidden">
              {/* Textarea */}
              <div className="relative">
                <div className="absolute top-2 left-3 flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#7A7772] font-sans select-none pointer-events-none">
                  <FileText className="w-3 h-3" />
                  Editor
                </div>
                <textarea
                  ref={textareaRef}
                  value={form.body}
                  onChange={(e) => set('body', e.target.value)}
                  placeholder="Write your article body in HTML…"
                  className="w-full h-72 md:h-80 px-3 pt-8 pb-3 bg-white text-sm font-mono text-[#2E2D2B] placeholder:text-[#C5B89A] resize-none focus:outline-none border-r-0 md:border-r border-[#E6E4DD]"
                />
              </div>

              {/* Preview */}
              <div className="relative bg-[#FCFCFA]">
                <div className="absolute top-2 left-3 flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#7A7772] font-sans select-none pointer-events-none">
                  <Eye className="w-3 h-3" />
                  Preview
                </div>
                <div
                  className="h-72 md:h-80 px-4 pt-8 pb-3 overflow-y-auto article-preview"
                  dangerouslySetInnerHTML={{ __html: form.body }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E6E4DD]/60 shrink-0">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-[#5C5A56] rounded-xl border border-[#E6E4DD] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave('Draft')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#2E2D2B] bg-white rounded-xl border border-[#E6E4DD] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" strokeWidth={1.8} />
            Save Draft
          </button>
          <button
            onClick={() => handleSave('Published')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#C5A059] rounded-xl hover:bg-[#b8923e] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" strokeWidth={1.8} />
            Publish
          </button>
        </div>
      </div>

      {/* Inline prose-like styles for the preview panel */}
      <style>{`
        .article-preview {
          font-family: ui-sans-serif, system-ui, sans-serif;
          color: #2E2D2B;
          font-size: 0.9rem;
          line-height: 1.75;
        }
        .article-preview h1,
        .article-preview h2,
        .article-preview h3,
        .article-preview h4 {
          font-family: ui-serif, Georgia, serif;
          font-weight: 600;
          margin-top: 1.25em;
          margin-bottom: 0.5em;
          color: #2E2D2B;
        }
        .article-preview h3 { font-size: 1.15rem; }
        .article-preview p {
          margin-bottom: 0.85em;
        }
        .article-preview strong { font-weight: 600; }
        .article-preview em { font-style: italic; }
        .article-preview blockquote {
          border-left: 3px solid #C5A059;
          padding-left: 1rem;
          margin: 1em 0;
          color: #5C5A56;
          font-style: italic;
        }
        .article-preview a {
          color: #C5A059;
          text-decoration: underline;
        }
        .article-preview ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.85em;
        }
        .article-preview li {
          margin-bottom: 0.25em;
        }
      `}</style>
    </div>
  );
}

// ── Article Card ────────────────────────────────────────────────────────────────

function ArticleCard({ article, onEdit, onDelete }) {
  const preview = stripHtml(article.body).slice(0, 100);

  return (
    <div className="bg-white rounded-2xl border border-[#E6E4DD]/50 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow group">
      {/* Cover thumbnail */}
      {article.coverImage ? (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-32 h-24 rounded-xl object-cover shrink-0 bg-[#F4F3EE]"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
          }}
        />
      ) : null}
      {/* Fallback placeholder – always rendered, hidden when image loads */}
      <div
        className={`w-32 h-24 rounded-xl bg-[#F4F3EE] shrink-0 flex items-center justify-center ${
          article.coverImage ? 'hidden' : ''
        }`}
      >
        <FileText className="w-6 h-6 text-[#C5A059]/50" strokeWidth={1.5} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg font-semibold text-[#2E2D2B] truncate">{article.title || 'Untitled'}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-[#7A7772] font-sans">
            <Calendar className="w-3 h-3" strokeWidth={1.8} />
            {formatDate(article.date)}
          </span>
          <StatusBadge status={article.status} />
        </div>
        {preview && (
          <p className="text-sm text-[#5C5A56] font-sans mt-1.5 line-clamp-2">
            {preview}{preview.length >= 100 ? '…' : ''}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(article)}
          title="Edit"
          className="p-2 rounded-xl hover:bg-[#F4F3EE] text-[#7A7772] hover:text-[#2E2D2B] transition-colors cursor-pointer"
        >
          <Pencil className="w-4 h-4" strokeWidth={1.8} />
        </button>
        <button
          onClick={() => onDelete(article)}
          title="Delete"
          className="p-2 rounded-xl hover:bg-red-50 text-[#7A7772] hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────────

export default function InsightsArticles() {
  const { articles, addArticle, updateArticle, deleteArticle } = useAdminData();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filtered & sorted articles
  const displayedArticles = useMemo(() => {
    let list = [...articles];

    // Filter
    if (filterStatus !== 'All') {
      list = list.filter((a) => a.status === filterStatus);
    }

    // Sort by date
    list.sort((a, b) => {
      const da = new Date(a.date || 0);
      const db = new Date(b.date || 0);
      return sortOrder === 'newest' ? db - da : da - db;
    });

    return list;
  }, [articles, filterStatus, sortOrder]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const openNew = () => {
    setEditingArticle(null);
    setEditorOpen(true);
  };

  const openEdit = (article) => {
    setEditingArticle(article);
    setEditorOpen(true);
  };

  const handleSave = (payload) => {
    if (editingArticle?.id) {
      const { id, ...updates } = payload;
      updateArticle(editingArticle.id, updates);
    } else {
      addArticle(payload);
    }
    setEditorOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteArticle(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const filterButtons = ['All', 'Draft', 'Published'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-[#2E2D2B]">Insights & Articles</h1>
          <p className="font-sans text-[#7A7772] mt-1 text-sm">
            Write and publish editorial content for Media & Insights
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#C5A059] rounded-xl hover:bg-[#b8923e] transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          New Article
        </button>
      </div>

      {/* Filter / Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Status filters */}
        <div className="flex items-center gap-1">
          {filterButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setFilterStatus(btn)}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                filterStatus === btn
                  ? 'bg-[#2E2D2B] text-white'
                  : 'text-[#5C5A56] hover:bg-[#F4F3EE]'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border border-[#E6E4DD] bg-white text-[#2E2D2B] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 cursor-pointer font-sans"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Article List */}
      {displayedArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E6E4DD]/50 py-16 flex flex-col items-center justify-center text-center">
          <FileText className="w-10 h-10 text-[#C5A059]/40 mb-3" strokeWidth={1.5} />
          <p className="font-serif text-lg text-[#2E2D2B]">No articles yet</p>
          <p className="text-sm text-[#7A7772] font-sans mt-1">
            Start writing your first insight.
          </p>
          <button
            onClick={openNew}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#C5A059] border border-[#C5A059]/40 rounded-xl hover:bg-[#C5A059]/5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            New Article
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editorOpen && (
        <ArticleEditor
          article={editingArticle}
          onSave={handleSave}
          onCancel={() => {
            setEditorOpen(false);
            setEditingArticle(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteConfirm
          articleTitle={deleteTarget.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
