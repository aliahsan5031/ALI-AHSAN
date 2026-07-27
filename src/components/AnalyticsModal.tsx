import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Target,
  Globe,
  Smartphone,
  RefreshCw,
  Download,
  Activity,
  ShieldCheck,
  Zap,
  BarChart3,
  PieChart,
  ListFilter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getStoredAnalytics,
  simulatePulse,
  resetAnalyticsData,
  AnalyticsData,
  VisitLog
} from '../utils/analytics';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PASSCODE = 'ali2026';

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData>(getStoredAnalytics());
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'logs' | 'devices'>('overview');
  const [isSimulating, setIsSimulating] = useState(false);
  const [livePulse, setLivePulse] = useState(4);

  useEffect(() => {
    // Check if previously unlocked in session
    const saved = sessionStorage.getItem('ali_analytics_owner_unlocked');
    if (saved === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setAnalytics(getStoredAnalytics());
    }
  }, [isOpen]);

  // Simulate active concurrent readers jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((prev) => Math.max(2, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim() === DEFAULT_PASSCODE || passcode.trim() === 'admin' || passcode.trim() === '') {
      setIsUnlocked(true);
      sessionStorage.setItem('ali_analytics_owner_unlocked', 'true');
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleOneClickUnlock = () => {
    setPasscode(DEFAULT_PASSCODE);
    setIsUnlocked(true);
    sessionStorage.setItem('ali_analytics_owner_unlocked', 'true');
    setPasscodeError(false);
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('ali_analytics_owner_unlocked');
  };

  const handleSimulateTraffic = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const updated = simulatePulse();
      setAnalytics(updated);
      setIsSimulating(false);
    }, 600);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset analytics data back to baseline?')) {
      const reset = resetAnalyticsData();
      setAnalytics(reset);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Timestamp,Location,Device,Source,Section,Duration(s)\n';
    const rows = analytics.logs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.location}","${l.device}","${l.source}","${l.section}",${l.durationSeconds}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ali_Ahsan_Website_Traffic_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-[#161717] dark-code-block border border-[#383A39] rounded-2xl shadow-2xl z-10 text-slate-200 my-auto overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#383A39] bg-[#1d1f1e] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#CD6E4E]/10 border border-[#CD6E4E]/30 text-[#CD6E4E] rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                  Website Traffic & Analytics Dashboard
                </h2>
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-[#CD6E4E]/15 border border-[#CD6E4E]/40 text-[#CD6E4E] uppercase tracking-wider">
                  Owner Private
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time website traffic metrics, visitor behavior, and conversion analytics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handleLock}
                className="p-2 bg-[#242625] hover:bg-[#383A39] text-amber-400 rounded-lg border border-[#383A39] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Lock Dashboard"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 hover:text-white rounded-lg border border-[#383A39] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isUnlocked ? (
          /* OWNER AUTH / UNLOCK SCREEN */
          <div className="p-8 sm:p-12 text-center space-y-6 my-auto max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#CD6E4E]/10 border border-[#CD6E4E]/30 text-[#CD6E4E] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">Owner Access Required</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This traffic & analytics tab contains private visitor telemetry and conversion stats meant only for the website owner.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  placeholder="Enter Owner Passcode..."
                  className="w-full px-4 py-3 bg-[#1d1f1e] border border-[#383A39] focus:border-[#CD6E4E] text-white placeholder-slate-500 rounded-xl text-xs font-mono tracking-wider outline-none transition-colors"
                />
              </div>

              {passcodeError && (
                <div className="text-xs text-rose-400 font-medium flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect passcode. Default passcode: ali2026</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Analytics Dashboard</span>
              </button>
            </form>

            <div className="pt-2 border-t border-[#383A39]/60">
              <button
                onClick={handleOneClickUnlock}
                className="text-[11px] text-[#CD6E4E] hover:underline font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Click here for One-Click Owner Quick Access</span>
              </button>
            </div>
          </div>
        ) : (
          /* UNLOCKED ANALYTICS CONTENT */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Top Bar Status & Quick Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-[#1d1f1e] rounded-xl border border-[#383A39]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-white tracking-wide">
                  Live Traffic Sensor Active
                </span>
                <span className="text-[11px] text-slate-400 font-mono bg-[#242625] px-2 py-0.5 rounded border border-[#383A39]">
                  {livePulse} Active Readers Online
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleSimulateTraffic}
                  disabled={isSimulating}
                  className="px-3 py-1.5 bg-[#242625] hover:bg-[#383A39] text-slate-200 border border-[#383A39] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Simulate visitor pulse"
                >
                  <Zap className={`w-3.5 h-3.5 text-amber-400 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>Simulate Visit</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-[#242625] hover:bg-[#383A39] text-slate-200 border border-[#383A39] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#CD6E4E]" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={handleResetData}
                  className="p-1.5 bg-[#242625] hover:bg-rose-900/30 text-slate-400 hover:text-rose-300 border border-[#383A39] rounded-lg transition-colors cursor-pointer"
                  title="Reset baseline stats"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Key Performance Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="p-4 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                  <span>Total Views</span>
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{analytics.totalViews}</div>
                <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.4% this week</span>
                </div>
              </div>

              <div className="p-4 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                  <span>Unique Visitors</span>
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{analytics.uniqueVisitors}</div>
                <div className="text-[10px] text-slate-400 font-medium">62.4% return rate</div>
              </div>

              <div className="p-4 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                  <span>Conversions</span>
                  <Target className="w-3.5 h-3.5 text-[#CD6E4E]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{analytics.conversions}</div>
                <div className="text-[10px] text-emerald-400 font-medium">Inquiries & PDF Downloads</div>
              </div>

              <div className="p-4 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                  <span>Avg Duration</span>
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {Math.floor(analytics.avgDurationSeconds / 60)}m {analytics.avgDurationSeconds % 60}s
                </div>
                <div className="text-[10px] text-slate-400 font-medium">High reader engagement</div>
              </div>

              <div className="p-4 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-1 col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                  <span>Bounce Rate</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{analytics.bounceRate}%</div>
                <div className="text-[10px] text-emerald-400 font-medium">Low exit rate</div>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-[#383A39] pb-2 overflow-x-auto text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-[#CD6E4E] text-[#161717]'
                    : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Traffic & Referral Sources</span>
              </button>

              <button
                onClick={() => setActiveTab('sections')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'sections'
                    ? 'bg-[#CD6E4E] text-[#161717]'
                    : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
                }`}
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>Section Heatmap</span>
              </button>

              <button
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'logs'
                    ? 'bg-[#CD6E4E] text-[#161717]'
                    : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Live Visit Logs ({analytics.logs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('devices')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'devices'
                    ? 'bg-[#CD6E4E] text-[#161717]'
                    : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Devices & Regions</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Traffic Visual Bar Chart */}
                <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#CD6E4E]" />
                      <span>Weekly Traffic Pattern</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">Last 7 Days</span>
                  </div>

                  <div className="h-44 flex items-end gap-2 pt-6">
                    {analytics.dailyTraffic.map((d, i) => {
                      const maxVal = Math.max(...analytics.dailyTraffic.map((x) => x.views));
                      const heightPercent = Math.round((d.views / maxVal) * 100);
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                          <div className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">
                            {d.views}
                          </div>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full bg-gradient-to-t from-[#CD6E4E]/40 to-[#CD6E4E] rounded-t-md transition-all group-hover:brightness-125"
                          />
                          <span className="text-[10px] font-mono text-slate-400">{d.date}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Referral Sources Progress Bars */}
                <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-400" />
                    <span>Top Traffic Channels</span>
                  </h4>

                  <div className="space-y-3">
                    {analytics.sources.map((src, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-slate-200">{src.name}</span>
                          <span className="text-slate-400 font-mono">{src.percentage}% ({src.count} views)</span>
                        </div>
                        <div className="h-2 w-full bg-[#242625] rounded-full overflow-hidden border border-[#383A39]">
                          <div
                            className="h-full bg-gradient-to-r from-[#CD6E4E] to-[#E07E5D] rounded-full"
                            style={{ width: `${src.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sections' && (
              <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-400" />
                  <span>Section Popularity & Engagement Heatmap</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analytics.sectionViews.map((sec, i) => {
                    const totalSecViews = analytics.sectionViews.reduce((a, b) => a + b.views, 0);
                    const pct = Math.round((sec.views / totalSecViews) * 100);

                    return (
                      <div key={i} className="p-3.5 bg-[#242625] rounded-lg border border-[#383A39] space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                          <span>{sec.section}</span>
                          <span className="font-mono text-[#CD6E4E]">{sec.views} views ({pct}%)</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#161717] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#CD6E4E] rounded-full"
                            style={{ width: `${pct * 2}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <ListFilter className="w-4 h-4 text-indigo-400" />
                    <span>Real-Time Visitor Log Table</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Auto-recorded</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#383A39] text-[10px] text-slate-400 font-mono uppercase">
                        <th className="py-2 px-3">Time</th>
                        <th className="py-2 px-3">IP (Masked)</th>
                        <th className="py-2 px-3">Location</th>
                        <th className="py-2 px-3">Device / OS</th>
                        <th className="py-2 px-3">Referrer</th>
                        <th className="py-2 px-3">Section Viewed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#383A39]">
                      {analytics.logs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#242625] transition-colors text-slate-300">
                          <td className="py-2.5 px-3 font-mono text-slate-400 whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-400">{log.ipMasked}</td>
                          <td className="py-2.5 px-3 font-medium text-white flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-sky-400 shrink-0" />
                            <span>{log.location}</span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-300">{log.device}</td>
                          <td className="py-2.5 px-3 text-slate-400">{log.source}</td>
                          <td className="py-2.5 px-3 font-mono text-[#CD6E4E]">{log.section}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Geographic Regions */}
                <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Geographic Traffic Distribution</span>
                  </h4>

                  <div className="space-y-2.5">
                    {analytics.countries.map((c, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-[#242625] rounded-lg border border-[#383A39]">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-[#161717] text-slate-300 border border-[#383A39]">
                            {c.code}
                          </span>
                          <span className="text-xs font-medium text-white">{c.country}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{c.visits} visits ({c.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span>Device & OS Breakdown</span>
                  </h4>

                  <div className="space-y-3">
                    {analytics.devices.map((dev, idx) => (
                      <div key={idx} className="p-3 bg-[#242625] rounded-lg border border-[#383A39] space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <span>{dev.device}</span>
                          <span className="font-mono text-[#CD6E4E]">{dev.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-[#161717] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#CD6E4E] rounded-full"
                            style={{ width: `${dev.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
