import { useState, useMemo, useCallback } from "react";
import { useAdminData } from "../context/AdminDataContext";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Save,
  Inbox,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = ["New", "In Progress", "Closed"];

const STATUS_STYLES = {
  New: "bg-amber-100 text-amber-800 border border-amber-200",
  "In Progress": "bg-blue-100 text-blue-800 border border-blue-200",
  Closed: "bg-green-100 text-green-800 border border-green-200",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ConsultationLeads() {
  const { leads = [], updateLead, deleteLead } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalStatus, setModalStatus] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          (lead.name && lead.name.toLowerCase().includes(q)) ||
          (lead.email && lead.email.toLowerCase().includes(q)) ||
          (lead.phone && lead.phone.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    return result;
  }, [leads, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length);
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleRowStatusChange = useCallback(
    async (leadId, newStatus) => {
      if (updateLead) {
        await updateLead(leadId, { status: newStatus });
      }
    },
    [updateLead]
  );

  // Modal handlers
  const openModal = useCallback((lead) => {
    setSelectedLead(lead);
    setModalStatus(lead.status || "New");
    setModalNotes(lead.notes || "");
  }, []);

  const closeModal = useCallback(() => {
    setSelectedLead(null);
    setModalStatus("");
    setModalNotes("");
    setIsSaving(false);
  }, []);

  const handleModalSave = useCallback(async () => {
    if (!selectedLead || !updateLead) return;
    setIsSaving(true);
    try {
      await updateLead(selectedLead.id, {
        status: modalStatus,
        notes: modalNotes,
      });
      closeModal();
    } catch {
      setIsSaving(false);
    }
  }, [selectedLead, modalStatus, modalNotes, updateLead, closeModal]);

  // Delete handlers
  const confirmDelete = useCallback((lead) => {
    setDeleteTarget(lead);
  }, []);

  const cancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget || !deleteLead) return;
    await deleteLead(deleteTarget.id);
    setDeleteTarget(null);
  }, [deleteTarget, deleteLead]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-serif font-bold text-[#2C2C2C]">
          Consultation Leads
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7772]"
            />
            <input
              type="text"
              placeholder="Search name, email, phone…"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none transition-colors placeholder:text-[#7A7772]/60"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7772] pointer-events-none"
            />
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="pl-9 pr-8 py-2 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none appearance-none cursor-pointer transition-colors"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-white rounded-2xl border border-[#E6E4DD]/50 shadow-sm overflow-hidden">
        {paginatedLeads.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F4F3EE] flex items-center justify-center mb-4">
              <Inbox size={28} className="text-[#7A7772]/60" />
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-1 font-serif">
              No leads found
            </h3>
            <p className="text-sm text-[#7A7772] max-w-sm">
              {searchQuery || statusFilter !== "All"
                ? "Try adjusting your search or filter criteria to find what you're looking for."
                : "When consultation inquiries come in, they'll appear here for you to manage."}
            </p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F4F3EE]">
                    {[
                      "Date",
                      "Name",
                      "Phone",
                      "Email",
                      "Project Type",
                      "Investment Range",
                      "Status",
                      "Actions",
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs uppercase tracking-wider font-semibold text-[#7A7772] font-sans whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#F4F3EE]/50 transition border-b border-[#E6E4DD]/30"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-[#2C2C2C]">
                        {formatDate(lead.date || lead.createdAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-[#2C2C2C]">
                        {lead.name || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-[#7A7772]">
                        {lead.phone || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-[#7A7772]">
                        {lead.email || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-[#2C2C2C]">
                        {lead.projectType || lead.project_type || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-[#2C2C2C]">
                        {lead.investmentRange || lead.investment_range || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={lead.status || "New"}
                          onChange={(e) =>
                            handleRowStatusChange(lead.id, e.target.value)
                          }
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 appearance-none ${
                            STATUS_STYLES[lead.status] || STATUS_STYLES["New"]
                          }`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openModal(lead)}
                            className="p-1.5 rounded-lg text-[#7A7772] hover:bg-[#F4F3EE] hover:text-[#2C2C2C] transition-colors"
                            title="View / Edit"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => confirmDelete(lead)}
                            className="p-1.5 rounded-lg text-[#7A7772] hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E6E4DD]/30">
              <p className="text-sm text-[#7A7772]">
                Showing{" "}
                <span className="font-medium text-[#2C2C2C]">
                  {startIndex + 1}–{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-medium text-[#2C2C2C]">
                  {filteredLeads.length}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={safeCurrentPage <= 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl border border-[#E6E4DD] text-[#2C2C2C] hover:bg-[#F4F3EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>
                <span className="text-sm text-[#7A7772] px-2">
                  {safeCurrentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={safeCurrentPage >= totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-xl border border-[#E6E4DD] text-[#2C2C2C] hover:bg-[#F4F3EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E4DD]/30">
              <h2 className="text-lg font-serif font-bold text-[#2C2C2C]">
                Lead Details
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-[#7A7772] hover:bg-[#F4F3EE] hover:text-[#2C2C2C] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="Name" value={selectedLead.name} />
                <DetailField
                  label="Date"
                  value={formatDate(selectedLead.date || selectedLead.createdAt)}
                />
                <DetailField label="Email" value={selectedLead.email} />
                <DetailField label="Phone" value={selectedLead.phone} />
                <DetailField
                  label="Project Type"
                  value={
                    selectedLead.projectType || selectedLead.project_type
                  }
                />
                <DetailField
                  label="Investment Range"
                  value={
                    selectedLead.investmentRange ||
                    selectedLead.investment_range
                  }
                />
              </div>

              {/* Message */}
              {(selectedLead.message || selectedLead.description) && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#7A7772] mb-1.5 font-sans">
                    Message
                  </label>
                  <p className="text-sm text-[#2C2C2C] bg-[#F4F3EE]/50 rounded-xl p-3 leading-relaxed">
                    {selectedLead.message || selectedLead.description}
                  </p>
                </div>
              )}

              {/* Status Edit */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#7A7772] mb-1.5 font-sans">
                  Status
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none transition-colors"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#7A7772] mb-1.5 font-sans">
                  <MessageSquare size={13} />
                  Internal Notes
                </label>
                <textarea
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this lead…"
                  className="w-full px-3 py-2 text-sm rounded-xl bg-[#F4F3EE]/70 border border-[#E6E4DD] focus:border-[#C5A059] focus:outline-none resize-none transition-colors placeholder:text-[#7A7772]/60"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E6E4DD]/30">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded-xl border border-[#E6E4DD] text-[#7A7772] hover:bg-[#F4F3EE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-[#2C2C2C] text-white hover:bg-[#C5A059] disabled:opacity-50 transition-colors"
              >
                <Save size={14} />
                {isSaving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2C2C2C] mb-1">
              Delete Lead
            </h3>
            <p className="text-sm text-[#7A7772] mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#2C2C2C]">
                {deleteTarget.name || "this lead"}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded-xl border border-[#E6E4DD] text-[#7A7772] hover:bg-[#F4F3EE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider font-semibold text-[#7A7772] mb-0.5 font-sans">
        {label}
      </p>
      <p className="text-sm text-[#2C2C2C]">{value || "—"}</p>
    </div>
  );
}
