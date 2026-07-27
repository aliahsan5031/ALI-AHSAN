import React, { useState, useEffect } from 'react';
import {
  X,
  Key,
  ShieldCheck,
  Lock,
  Unlock,
  Copy,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Database,
  Plus,
  Terminal,
  Play,
  Check,
  AlertCircle,
  Clock,
  HelpCircle,
  Eye,
  EyeOff,
  Zap,
  RefreshCw,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ApiKeyRecord } from '../types';
import {
  getStoredApiKeys,
  generateApiKey,
  validateApiKeyRequest,
  revokeApiKey,
  deleteApiKey,
  hashSha256
} from '../utils/apiKeyManager';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'keys' | 'generate' | 'validate' | 'schema'>('keys');

  // Generation form state
  const [passcode, setPasscode] = useState('');
  const [keyName, setKeyName] = useState('');
  const [genError, setGenError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // One-time plain text key reveal state
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Validation Playground state
  const [testTokenInput, setTestTokenInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    valid?: boolean;
    incomingHash?: string;
    keyRecord?: ApiKeyRecord;
    error?: string;
  }>({ tested: false });
  const [isValidating, setIsValidating] = useState(false);

  // Copy hash helper state
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setKeys(getStoredApiKeys());
      setGenError('');
      setNewlyCreatedKey(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const refreshKeys = () => {
    setKeys(getStoredApiKeys());
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenError('');
    setIsGenerating(true);

    try {
      const result = await generateApiKey(keyName, 'aliA_', passcode);
      setNewlyCreatedKey(result.plainTextKey);
      refreshKeys();
      setKeyName('');
      setPasscode('');
    } catch (err: any) {
      setGenError(err.message || 'Failed to generate API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPlainTextKey = () => {
    if (newlyCreatedKey) {
      navigator.clipboard.writeText(newlyCreatedKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2500);
    }
  };

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  const handleRevoke = (id: string) => {
    const updated = revokeApiKey(id);
    setKeys(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteApiKey(id);
    setKeys(updated);
  };

  const handleTestValidation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!testTokenInput.trim()) return;

    setIsValidating(true);
    const header = testTokenInput.startsWith('Bearer ') ? testTokenInput : `Bearer ${testTokenInput.trim()}`;
    const result = await validateApiKeyRequest(header);
    setValidationResult({
      tested: true,
      valid: result.valid,
      incomingHash: result.incomingHash,
      keyRecord: result.keyRecord,
      error: result.error,
    });
    setIsValidating(false);
    refreshKeys();
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

      {/* Main Dialog Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-[#161717] dark-code-block border border-[#383A39] rounded-2xl shadow-2xl z-10 text-slate-200 my-auto overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#383A39] bg-[#1d1f1e] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#CD6E4E]/10 border border-[#CD6E4E]/30 text-[#CD6E4E] rounded-xl">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                  API Key Security & Hashing System
                </h2>
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase tracking-wider">
                  SHA-256 Encrypted
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cryptographically secure plain-text generation & SHA-256 database token verification.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#242625] hover:bg-[#383A39] text-slate-300 hover:text-white rounded-lg border border-[#383A39] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#383A39] pb-3 overflow-x-auto text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'keys'
                  ? 'bg-[#CD6E4E] text-[#161717]'
                  : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Table ({keys.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('generate')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'generate'
                  ? 'bg-[#CD6E4E] text-[#161717]'
                  : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate New Key</span>
            </button>

            <button
              onClick={() => setActiveTab('validate')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'validate'
                  ? 'bg-[#CD6E4E] text-[#161717]'
                  : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Request Validator Tester</span>
            </button>

            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'schema'
                  ? 'bg-[#CD6E4E] text-[#161717]'
                  : 'bg-[#1d1f1e] text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security Architecture</span>
            </button>
          </div>

          {/* ONE-TIME PLAIN TEXT KEY DISPLAY BANNER */}
          {newlyCreatedKey && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-amber-950/40 via-[#1d1f1e] to-amber-950/40 border-2 border-amber-500/60 rounded-xl space-y-3 shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Important: Copy Your API Key Now!</span>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                  Visible Once Only
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Your plain-text API key has been generated. For maximum security, <strong className="text-white">this plain-text string is never saved in the database</strong>. Only its cryptographic <code className="text-amber-300">SHA-256</code> hash is stored.
              </p>

              <div className="p-3 bg-[#121313] border border-[#383A39] rounded-lg flex items-center justify-between gap-3">
                <code className="text-xs sm:text-sm font-mono text-emerald-400 break-all select-all">
                  {newlyCreatedKey}
                </code>
                <button
                  onClick={handleCopyPlainTextKey}
                  className="px-3 py-1.5 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-extrabold text-xs rounded-md transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow"
                >
                  {copiedKey ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#161717]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Key</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 1: DATABASE TABLE VIEW */}
          {activeTab === 'keys' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#CD6E4E]" />
                    <span>Database Record Table (`api_keys`)</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Showing stored cryptographic SHA-256 hashes, prefixes, and key metadata.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('generate')}
                  className="px-3 py-1.5 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-black text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Key</span>
                </button>
              </div>

              {keys.length === 0 ? (
                <div className="p-8 text-center bg-[#1d1f1e] rounded-xl border border-[#383A39] text-slate-400 space-y-2">
                  <Key className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs">No API keys found in the database.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#383A39] rounded-xl bg-[#1d1f1e]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#383A39] bg-[#242625] text-[10px] text-slate-400 font-mono uppercase">
                        <th className="py-2.5 px-3">Prefix</th>
                        <th className="py-2.5 px-3">Label Name</th>
                        <th className="py-2.5 px-3">Cryptographic SHA-256 Hash (`key_hash`)</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Created</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#383A39]">
                      {keys.map((record) => (
                        <tr key={record.id} className="hover:bg-[#242625]/60 transition-colors text-slate-300">
                          <td className="py-3 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                            {record.prefix}
                          </td>
                          <td className="py-3 px-3 font-semibold text-white">{record.name}</td>
                          <td className="py-3 px-3 font-mono text-[11px]">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-slate-400 truncate max-w-[180px] sm:max-w-[240px] inline-block font-mono bg-[#121313] px-2 py-0.5 rounded border border-[#383A39]"
                                title={record.key_hash}
                              >
                                {record.key_hash}
                              </span>
                              <button
                                onClick={() => handleCopyHash(record.key_hash, record.id)}
                                className="p-1 hover:bg-[#383A39] text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                                title="Copy Full SHA-256 Hash"
                              >
                                {copiedHashId === record.id ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            {record.status === 'active' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
                                Revoked
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-slate-400 whitespace-nowrap">
                            {new Date(record.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap space-x-1">
                            {record.status === 'active' && (
                              <button
                                onClick={() => handleRevoke(record.id)}
                                className="px-2 py-1 bg-[#242625] hover:bg-amber-900/40 text-amber-400 border border-[#383A39] rounded text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                Revoke
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(record.id)}
                              className="p-1 bg-[#242625] hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-[#383A39] rounded transition-colors cursor-pointer"
                              title="Delete key record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GENERATE NEW KEY FORM */}
          {activeTab === 'generate' && (
            <div className="max-w-2xl mx-auto space-y-6 p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39]">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#CD6E4E]" />
                  <span>Generate Cryptographic API Key</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Creates a 32-byte secure random token, hashes with SHA-256 for database storage, and restricts generation to authenticated admin sessions.
                </p>
              </div>

              <form onSubmit={handleGenerateKey} className="space-y-4">
                {/* Admin Auth Passcode Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Passcode Required</span>
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter admin passcode..."
                    required
                    className="w-full px-3.5 py-2.5 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] text-white rounded-lg text-xs font-mono outline-none transition-colors"
                  />
                </div>

                {/* Key Label Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200">
                    Key Label Name <span className="text-[#CD6E4E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder='e.g., "Production AI Engine", "Client Webhook Integration"'
                    required
                    className="w-full px-3.5 py-2.5 bg-[#161717] border border-[#383A39] focus:border-[#CD6E4E] text-white rounded-lg text-xs outline-none transition-colors"
                  />
                </div>

                {genError && (
                  <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{genError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 bg-[#CD6E4E] hover:bg-[#E07E5D] text-[#161717] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{isGenerating ? 'Generating Key & Hashing...' : 'Generate API Key & Save Hash'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: STEP 4 VALIDATION TESTER PLAYGROUND */}
          {activeTab === 'validate' && (
            <div className="space-y-6">
              <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Step 4: Live Key Interceptor & SHA-256 Match Validator</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Test how the backend interceptor extracts the incoming <code className="text-emerald-400">Authorization: Bearer &lt;KEY&gt;</code> header, hashes it with SHA-256, and queries the database for a matching record.
                  </p>
                </div>

                {/* Pre-fill Quick Test Button from Database */}
                {keys.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-mono whitespace-nowrap">
                      Select Key to Test:
                    </span>
                    {keys.map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => {
                          setTestTokenInput(`${k.prefix}32byte_example_key_for_testing`);
                          setValidationResult({ tested: false });
                        }}
                        className="px-2.5 py-1 bg-[#242625] hover:bg-[#383A39] text-amber-400 border border-[#383A39] rounded font-mono text-[11px] whitespace-nowrap cursor-pointer"
                      >
                        {k.prefix} ({k.name})
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={handleTestValidation} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={testTokenInput}
                      onChange={(e) => setTestTokenInput(e.target.value)}
                      placeholder="Bearer aliA_3f28d901a8..."
                      className="w-full px-4 py-3 bg-[#121313] border border-[#383A39] focus:border-emerald-500 text-emerald-400 placeholder-slate-500 rounded-xl font-mono text-xs outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isValidating}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Send Request & Validate Header</span>
                  </button>
                </form>
              </div>

              {/* Validation Steps Pipeline Result */}
              {validationResult.tested && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl border space-y-4 ${
                    validationResult.valid
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : 'bg-rose-950/30 border-rose-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {validationResult.valid ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <h4 className="text-sm font-black text-white uppercase tracking-wider">
                        {validationResult.valid ? 'HTTP 200 OK — Request Authorized' : 'HTTP 401 Unauthorized'}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase font-mono ${
                        validationResult.valid
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {validationResult.valid ? 'Match Found' : 'Validation Failed'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#121313] rounded-lg border border-[#383A39] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase">1. Extract Header</span>
                      <p className="text-white truncate">{testTokenInput || 'Bearer ...'}</p>
                    </div>

                    <div className="p-3 bg-[#121313] rounded-lg border border-[#383A39] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase">2. Incoming SHA-256 Hash</span>
                      <p className="text-amber-400 truncate">{validationResult.incomingHash || 'N/A'}</p>
                    </div>

                    <div className="p-3 bg-[#121313] rounded-lg border border-[#383A39] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase">3. Database Match</span>
                      <p className={validationResult.valid ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {validationResult.valid ? validationResult.keyRecord?.name : validationResult.error}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 4: SECURITY ARCHITECTURE SCHEMA EXPLANATION */}
          {activeTab === 'schema' && (
            <div className="space-y-6">
              <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#CD6E4E]" />
                  <span>Database Table Schema (`api_keys`)</span>
                </h3>

                <div className="overflow-x-auto border border-[#383A39] rounded-lg">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-[#242625] border-b border-[#383A39] text-[10px] text-slate-400 uppercase">
                        <th className="py-2.5 px-3">Column Name</th>
                        <th className="py-2.5 px-3">Data Type</th>
                        <th className="py-2.5 px-3">Description / Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#383A39] text-slate-300">
                      <tr>
                        <td className="py-2.5 px-3 text-amber-400 font-bold">id</td>
                        <td className="py-2.5 px-3 text-slate-400">UUID / Integer</td>
                        <td className="py-2.5 px-3">Primary key identifier (e.g. `key-uuid-101`)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-amber-400 font-bold">prefix</td>
                        <td className="py-2.5 px-3 text-slate-400">VARCHAR(16)</td>
                        <td className="py-2.5 px-3">The visible part of the key for identification (e.g., `aliA_`)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-emerald-400 font-bold">key_hash</td>
                        <td className="py-2.5 px-3 text-slate-400">VARCHAR(64)</td>
                        <td className="py-2.5 px-3">Cryptographic SHA-256 hash of the plain-text string</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-amber-400 font-bold">name</td>
                        <td className="py-2.5 px-3 text-slate-400">VARCHAR(255)</td>
                        <td className="py-2.5 px-3">Descriptive label (e.g. `"Production AI Key"`)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 text-amber-400 font-bold">created_at</td>
                        <td className="py-2.5 px-3 text-slate-400">TIMESTAMP</td>
                        <td className="py-2.5 px-3">Creation timestamp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-5 bg-[#1d1f1e] rounded-xl border border-[#383A39] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Why Plain-Text Keys Must Never Be Stored</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If a database is leaked or stolen, plain-text API keys give attackers immediate access to user accounts and backend services. By storing only a <strong className="text-emerald-400 font-mono">SHA-256 cryptographic digest</strong>, the database holds zero usable key material. Incoming requests are hashed in-memory and compared against the stored hash in constant time.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
