import { UserPlus, Users, Building2, Briefcase, Plus, PenLine, ArrowRight } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

const statusColors = {
  New: 'bg-champagne/20 text-champagne',
  'In Progress': 'bg-sky-100 text-sky-700',
  Closed: 'bg-emerald-100 text-emerald-700',
};

function KpiCard({ icon: Icon, value, label, accentBg, accentText }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-ash/50 shadow-sm px-5 py-5">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${accentBg}`}>
        <Icon className={`w-5 h-5 ${accentText}`} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-3xl font-serif font-semibold text-charcoal leading-none">{value}</p>
        <p className="text-xs uppercase tracking-wider text-charcoal-light font-sans mt-1">{label}</p>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DashboardOverview({ onNavigate }) {
  const { leads, vendors, applicants } = useAdminData();

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0))
    .slice(0, 5);

  const kpis = [
    {
      icon: UserPlus,
      value: newLeadsCount,
      label: 'New Leads',
      accentBg: 'bg-champagne/15',
      accentText: 'text-champagne',
    },
    {
      icon: Users,
      value: leads.length,
      label: 'Total Leads',
      accentBg: 'bg-charcoal/8',
      accentText: 'text-charcoal',
    },
    {
      icon: Building2,
      value: vendors.length,
      label: 'Vendor Partners',
      accentBg: 'bg-slate-100',
      accentText: 'text-slate-500',
    },
    {
      icon: Briefcase,
      value: applicants.length,
      label: 'Job Applicants',
      accentBg: 'bg-amber-50',
      accentText: 'text-amber-600',
    },
  ];

  const quickActions = [
    { label: 'Add New Project', icon: Plus, onClick: () => onNavigate && onNavigate('portfolio') },
    { label: 'Write Article', icon: PenLine, onClick: () => onNavigate && onNavigate('articles') },
    { label: 'View All Leads', icon: ArrowRight, onClick: () => onNavigate && onNavigate('leads') },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-semibold text-charcoal">Dashboard</h1>
        <p className="font-sans text-charcoal-muted mt-1">Welcome back, Akshay</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Recent Leads + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-ash/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-ash/40">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Recent Leads</h2>
          </div>

          {recentLeads.length === 0 ? (
            <div className="px-6 py-10 text-center text-charcoal-light font-sans text-sm">
              No leads yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-charcoal-light border-b border-ash/30">
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Phone</th>
                    <th className="px-6 py-3 font-medium">Project Type</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead, idx) => (
                    <tr
                      key={lead.id || idx}
                      className="border-b border-ash/20 last:border-b-0 hover:bg-alabaster/60 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-charcoal-muted whitespace-nowrap">
                        {formatDate(lead.date || lead.createdAt)}
                      </td>
                      <td className="px-6 py-3.5 text-charcoal font-medium whitespace-nowrap">
                        {lead.name || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-charcoal-muted whitespace-nowrap">
                        {lead.phone || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-charcoal-muted whitespace-nowrap">
                        {lead.projectType || '—'}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}
                        >
                          {lead.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-ash/50 shadow-sm p-6 flex flex-col gap-3 h-fit">
          <h2 className="font-serif text-lg font-semibold text-charcoal mb-1">Quick Actions</h2>
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-ash/40 text-charcoal font-sans text-sm font-medium hover:bg-alabaster hover:border-champagne/50 transition-all cursor-pointer group"
            >
              <action.icon className="w-4 h-4 text-charcoal-light group-hover:text-champagne transition-colors" strokeWidth={1.8} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
