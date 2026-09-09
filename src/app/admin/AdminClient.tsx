'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Mail,
  Phone,
  Building2,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Download,
  Trash2,
  RefreshCw,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  Check,
  Copy,
  Database,
  ShieldCheck,
  ArrowUpRight,
  Package,
  Layers,
  Sparkles,
} from 'lucide-react';
import { EnquiryRecord } from '@/lib/enquiryService';

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  new: { label: 'New Lead', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  in_progress: { label: 'In Progress', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  contacted: { label: 'Contacted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  closed: { label: 'Closed', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
};

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('admin@salasaraluminium.shop');
  const [password, setPassword] = useState('Salasar@2026');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [records, setRecords] = useState<EnquiryRecord[]>([]);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [sqlModalOpen, setSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EnquiryRecord | null>(null);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check-auth');
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) {
          loadRecords();
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const loadRecords = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries');
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setRecords(data.records || []);
        setIsFromSupabase(Boolean(data.isFromSupabase));
      }
    } catch (err) {
      console.error('Failed to load records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Invalid credentials');
        return;
      }

      setIsAuthenticated(true);
      loadRecords();
    } catch {
      setLoginError('Login request failed. Please check network.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryRecord['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setRecords((prev) =>
          prev.map((item) => (item.id === id || item.lead_id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry lead?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRecords((prev) => prev.filter((item) => item.id !== id && item.lead_id !== id));
        if (selectedRecord?.id === id) setSelectedRecord(null);
      }
    } catch (err) {
      console.error('Failed to delete record:', err);
    }
  };

  const handleExportCSV = () => {
    if (records.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'Lead ID',
      'Date (IST)',
      'Customer Name',
      'Phone',
      'Email',
      'Company',
      'Business Type',
      'Product Code',
      'Category',
      'Quantity',
      'Finish',
      'Destination',
      'State',
      'Status',
      'Requirements',
    ];

    const rows = records.map((r) => [
      r.lead_id,
      new Date(r.created_at).toLocaleString('en-IN'),
      `"${(r.full_name || '').replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${(r.company_name || '').replace(/"/g, '""')}"`,
      `"${r.business_type || ''}"`,
      `"${r.sa_product_code || ''}"`,
      `"${r.product_category || ''}"`,
      `"${r.estimated_quantity || ''}"`,
      `"${r.preferred_finish || ''}"`,
      `"${(r.delivery_location || '').replace(/"/g, '""')}"`,
      `"${r.state || ''}"`,
      r.status,
      `"${(r.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `salasar_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesStatus;

      const matchesSearch =
        (r.full_name || '').toLowerCase().includes(q) ||
        (r.phone || '').toLowerCase().includes(q) ||
        (r.email || '').toLowerCase().includes(q) ||
        (r.company_name || '').toLowerCase().includes(q) ||
        (r.sa_product_code || '').toLowerCase().includes(q) ||
        (r.delivery_location || '').toLowerCase().includes(q) ||
        (r.lead_id || '').toLowerCase().includes(q) ||
        (r.message || '').toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [records, statusFilter, searchQuery]);

  // Metric stats
  const metrics = useMemo(() => {
    const total = records.length;
    const newCount = records.filter((r) => r.status === 'new').length;
    const inProgressCount = records.filter((r) => r.status === 'in_progress').length;
    const contactedCount = records.filter((r) => r.status === 'contacted').length;
    const closedCount = records.filter((r) => r.status === 'closed').length;
    return { total, newCount, inProgressCount, contactedCount, closedCount };
  }, [records]);

  const copySqlCode = () => {
    const sql = `-- Salasar Aluminium & Hardware: Schema for enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  business_type TEXT,
  product_category TEXT,
  sa_product_code TEXT,
  estimated_quantity TEXT,
  preferred_finish TEXT,
  delivery_location TEXT,
  state TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert into enquiries"
ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow service_role full access"
ON public.enquiries FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Loading screen during auth check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#071322] flex items-center justify-center p-4">
        <div className="flex items-center space-x-3 text-slate-300">
          <RefreshCw className="w-5 h-5 animate-spin text-[#C9A227]" />
          <span className="text-sm font-medium">Verifying Salasar Admin Portal...</span>
        </div>
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071322] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-[#0B1F3A] border border-[#1E3A5F] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Logo / Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#C9A227]/20 border border-[#C9A227]/40 rounded-xl flex items-center justify-center mx-auto text-[#C9A227] shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-widest block">
              Direct Trade Desk • Raipur
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal Login</h1>
            <p className="text-xs text-slate-300">
              Manage live wholesale enquiries, customer quotes, and Supabase leads.
            </p>
          </div>

          {/* Dummy Credentials Callout */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-700/70 rounded-xl text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#C9A227] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Admin Credentials:</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@salasaraluminium.shop');
                  setPassword('Salasar@2026');
                }}
                className="text-[10px] text-sky-400 hover:text-sky-300 underline font-medium cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-200">
              <div>Email: <span className="text-white">admin@salasaraluminium.shop</span></div>
              <div>Pass: <span className="text-white">Salasar@2026</span></div>
            </div>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 text-red-200 rounded-xl text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@salasaraluminium.shop"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#C9A227] hover:bg-[#b08b1f] text-[#071322] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Admin Portal</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            Backed by Supabase Database & Resend Notifications
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navbar */}
      <header className="bg-[#0B1F3A] border-b border-[#1E3A5F] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9A227] text-[#0B1F3A] font-extrabold flex items-center justify-center text-sm shadow">
              SA
            </div>
            <div>
              <span className="text-[10px] text-[#C9A227] font-bold uppercase tracking-wider block leading-none">
                Salasar Aluminium & Hardware
              </span>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                Admin Leads & Quotes Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Supabase Status Chip */}
            <div
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${
                isFromSupabase
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
              }`}
            >
              <Database className="w-3 h-3" />
              <span>{isFromSupabase ? 'Supabase Live' : 'Local Storage Sync'}</span>
            </div>

            <button
              onClick={() => setSqlModalOpen(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="View Supabase SQL Schema"
            >
              <Layers className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="hidden md:inline">Supabase SQL</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Total Leads
            </span>
            <span className="text-2xl font-bold text-slate-900 mt-1 block">{metrics.total}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 block">
              New Enquiries
            </span>
            <span className="text-2xl font-bold text-emerald-700 mt-1 block">{metrics.newCount}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 block">
              In Progress
            </span>
            <span className="text-2xl font-bold text-amber-700 mt-1 block">{metrics.inProgressCount}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200/80 shadow-2xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 block">
              Contacted
            </span>
            <span className="text-2xl font-bold text-blue-700 mt-1 block">{metrics.contactedCount}</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Closed / Deals
            </span>
            <span className="text-2xl font-bold text-slate-700 mt-1 block">{metrics.closedCount}</span>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by customer, phone, code (e.g. SA-101), city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              {(['all', 'new', 'in_progress', 'contacted', 'closed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={loadRecords}
              disabled={isLoading}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Leads Table / Feed */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          {isLoading && records.length === 0 ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin text-[#C9A227]" />
              <p className="text-xs font-medium">Fetching enquiries from database...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No matching enquiry records found</p>
              <p className="text-xs text-slate-500">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try clearing the search or status filter'
                  : 'New customer enquiries will appear here in real-time'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Lead ID & Date</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Product / SKU</th>
                    <th className="py-3 px-4">Order Specifications</th>
                    <th className="py-3 px-4">Project Note</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredRecords.map((lead) => {
                    const cleanPhone = (lead.phone || '').replace(/\D/g, '');
                    const waPhone = cleanPhone.length === 10 ? cleanPhone : cleanPhone.replace(/^91/, '');
                    const waUrl = `https://wa.me/91${waPhone}?text=${encodeURIComponent(
                      `Hello ${lead.full_name}, thank you for contacting Salasar Aluminium & Hardware regarding your trade enquiry (${lead.lead_id}).`
                    )}`;
                    const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Lead & Date */}
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-mono font-bold text-slate-900 block">
                            {lead.lead_id}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(lead.created_at).toLocaleDateString('en-IN')}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {new Date(lead.created_at).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>

                        {/* Customer Info */}
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-bold text-slate-900 block">{lead.full_name}</span>
                          {lead.company_name && (
                            <span className="text-[11px] text-slate-600 flex items-center space-x-1 mt-0.5">
                              <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{lead.company_name}</span>
                            </span>
                          )}
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
                            >
                              <Phone className="w-2.5 h-2.5 text-slate-500" />
                              <span>{lead.phone}</span>
                            </a>
                            <a
                              href={`mailto:${lead.email}`}
                              className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
                            >
                              <Mail className="w-2.5 h-2.5 text-slate-500" />
                              <span>Email</span>
                            </a>
                          </div>
                        </td>

                        {/* Product SKU */}
                        <td className="py-3.5 px-4 align-top">
                          {lead.sa_product_code ? (
                            <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-mono font-bold rounded border border-amber-200 text-[11px]">
                              {lead.sa_product_code}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">General Quote</span>
                          )}
                          {lead.product_category && (
                            <span className="text-[11px] text-slate-500 block mt-1">
                              {lead.product_category}
                            </span>
                          )}
                        </td>

                        {/* Order Specifications */}
                        <td className="py-3.5 px-4 align-top space-y-1 text-[11px]">
                          {lead.estimated_quantity && (
                            <div>
                              <span className="text-slate-400">Qty:</span>{' '}
                              <span className="font-semibold text-slate-800">{lead.estimated_quantity}</span>
                            </div>
                          )}
                          {lead.preferred_finish && (
                            <div>
                              <span className="text-slate-400">Finish:</span>{' '}
                              <span className="font-semibold text-slate-800">{lead.preferred_finish}</span>
                            </div>
                          )}
                          {(lead.delivery_location || lead.state) && (
                            <div className="text-slate-500">
                              {[lead.delivery_location, lead.state].filter(Boolean).join(', ')}
                            </div>
                          )}
                        </td>

                        {/* Requirements Message */}
                        <td className="py-3.5 px-4 align-top max-w-xs">
                          <p className="text-xs text-slate-700 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                            {lead.message}
                          </p>
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4 align-top">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as EnquiryRecord['status'])
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none transition-colors ${cfg.bg} ${cfg.text} ${cfg.border}`}
                          >
                            <option value="new">New Lead</option>
                            <option value="in_progress">In Progress</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed Deal</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 align-top text-right space-x-1.5 whitespace-nowrap">
                          {/* 1-click WhatsApp */}
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-bold transition-all shadow-2xs"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span className="hidden lg:inline">WhatsApp</span>
                          </a>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Supabase Schema Modal */}
      {sqlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-5 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-[#1E3A5F]">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-[#C9A227]" />
                <h3 className="font-bold text-base">Supabase SQL Schema (1-Click)</h3>
              </div>
              <button
                onClick={() => setSqlModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="leading-relaxed">
                If the <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-900">enquiries</code> table has not been run in Supabase yet, simply copy this SQL and run it inside your Supabase project dashboard (<span className="font-semibold text-slate-900">SQL Editor &gt; New Query &gt; Run</span>):
              </p>

              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto max-h-60 leading-relaxed">
{`CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_id TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  business_type TEXT,
  product_category TEXT,
  sa_product_code TEXT,
  estimated_quantity TEXT,
  preferred_finish TEXT,
  delivery_location TEXT,
  state TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert into enquiries"
ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow service_role full access"
ON public.enquiries FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);`}
                </pre>

                <button
                  onClick={copySqlCode}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#C9A227] hover:bg-[#b08b1f] text-[#0B1F3A] font-bold rounded-lg text-xs flex items-center space-x-1 shadow cursor-pointer"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSqlModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
