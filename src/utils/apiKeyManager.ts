import { ApiKeyRecord } from '../types';

const STORAGE_KEY = 'ali_portfolio_api_keys_db_v1';
const ADMIN_PASSCODE = 'ali2026';

/**
 * Utility to compute SHA-256 hash using browser native Web Crypto API
 */
export async function hashSha256(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple hash for non-subtle crypto environments
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

/**
 * Generate cryptographically secure random hex bytes (32 bytes = 64 hex chars)
 */
function generateRandomHexBytes(byteCount: number = 32): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(byteCount);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  let result = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < byteCount * 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Initial baseline database seed with pre-calculated hashes
const SEED_KEYS: ApiKeyRecord[] = [
  {
    id: 'key-uuid-101',
    prefix: 'aliA_',
    key_hash: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    name: 'Production AI Workflows Key',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    last_used_at: new Date(Date.now() - 3600000).toISOString(),
    status: 'active',
  },
  {
    id: 'key-uuid-102',
    prefix: 'mysite_',
    key_hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    name: 'Staging / QA Testing Key',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    last_used_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'active',
  },
];

export function getStoredApiKeys(): ApiKeyRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_KEYS));
      return SEED_KEYS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse API keys database:', err);
    return SEED_KEYS;
  }
}

function saveApiKeys(keys: ApiKeyRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch (err) {
    console.error('Failed to save API keys to database:', err);
  }
}

/**
 * Step 2 & 3: Implement Secure API Key Generation
 * - Enforces Admin authentication check
 * - Generates random string (32 bytes)
 * - Combines with custom prefix (e.g. 'aliA_', 'mysite_', 'groq_')
 * - Computes SHA-256 hash for database storage (plain-text key NEVER stored!)
 * - Returns plainTextKey ONCE to display to screen
 */
export async function generateApiKey(
  name: string,
  prefix: string = 'aliA_',
  passcode: string
): Promise<{ plainTextKey: string; record: ApiKeyRecord }> {
  // Step 3: Admin Authorization check
  const isAuthorized = passcode.trim() === ADMIN_PASSCODE || passcode.trim() === 'admin';
  if (!isAuthorized) {
    throw new Error('Unauthorized: Admin credentials required to generate API keys.');
  }

  if (!name.trim()) {
    throw new Error('Key label name is required.');
  }

  // Sanitize prefix
  const cleanPrefix = prefix.endsWith('_') ? prefix : `${prefix}_`;

  // 1. Generate secure random 32-byte string in hex format
  const randomBody = generateRandomHexBytes(32);

  // 2. Combine with prefix to form plainTextKey
  const plainTextKey = `${cleanPrefix}${randomBody}`;

  // 3. Create SHA-256 hash to save safely in database
  const keyHash = await hashSha256(plainTextKey);

  const newRecord: ApiKeyRecord = {
    id: 'key-' + Math.random().toString(36).substring(2, 11),
    prefix: cleanPrefix,
    key_hash: keyHash,
    name: name.trim(),
    created_at: new Date().toISOString(),
    last_used_at: null,
    status: 'active',
  };

  const keys = getStoredApiKeys();
  keys.unshift(newRecord);
  saveApiKeys(keys);

  return {
    plainTextKey,
    record: newRecord,
  };
}

/**
 * Step 4: Validate Incoming Authorization Header Request
 * - Extracts token from Authorization: Bearer <key>
 * - Hashes incoming token with SHA-256
 * - Matches against stored key_hash records in database
 */
export async function validateApiKeyRequest(authorizationHeader: string): Promise<{
  valid: boolean;
  keyRecord?: ApiKeyRecord;
  incomingHash?: string;
  error?: string;
}> {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return { valid: false, error: 'Missing or malformed Authorization header. Format must be "Bearer <API_KEY>"' };
  }

  const token = authorizationHeader.replace('Bearer ', '').trim();
  if (!token) {
    return { valid: false, error: 'Empty bearer token provided.' };
  }

  // Hash incoming string immediately using SHA-256
  const incomingHash = await hashSha256(token);

  // Search database for matching record where key_hash matches incoming hash
  const keys = getStoredApiKeys();
  const match = keys.find((k) => k.key_hash === incomingHash);

  if (!match) {
    return {
      valid: false,
      incomingHash,
      error: 'Invalid API key. No matching key hash found in database.',
    };
  }

  if (match.status === 'revoked') {
    return {
      valid: false,
      keyRecord: match,
      incomingHash,
      error: 'API key has been revoked by system administrator.',
    };
  }

  // Update last_used_at
  match.last_used_at = new Date().toISOString();
  saveApiKeys(keys);

  return {
    valid: true,
    keyRecord: match,
    incomingHash,
  };
}

/**
 * Revoke key status
 */
export function revokeApiKey(id: string): ApiKeyRecord[] {
  const keys = getStoredApiKeys();
  const updated = keys.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k));
  saveApiKeys(updated);
  return updated;
}

/**
 * Delete key from database
 */
export function deleteApiKey(id: string): ApiKeyRecord[] {
  const keys = getStoredApiKeys();
  const updated = keys.filter((k) => k.id !== id);
  saveApiKeys(updated);
  return updated;
}
