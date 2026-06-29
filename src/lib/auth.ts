export const SESSION_COOKIE = 'buddy_blocks_session';
export const CHILD_COOKIE = 'buddy_blocks_child';
const ITERATIONS = 100_000;
const KEY_LENGTH_BYTES = 32;

export function randomId(prefix = '') {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return prefix + Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function toHex(buffer: ArrayBuffer | Uint8Array) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function fromHex(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index++) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

export async function hashPassword(password: string, saltHex?: string) {
  const salt = saltHex ? fromHex(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
    key,
    KEY_LENGTH_BYTES * 8,
  );
  return { salt: toHex(salt), hash: toHex(hash) };
}

export async function verifyPassword(password: string, saltHex: string, expectedHash: string) {
  const { hash } = await hashPassword(password, saltHex);
  return timingSafeEqual(hash, expectedHash);
}

export function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index++) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

export function parseCookies(header: string | null) {
  const cookies = new Map<string, string>();
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const [name, ...valueParts] = part.trim().split('=');
    if (!name) continue;
    cookies.set(name, decodeURIComponent(valueParts.join('=')));
  }
  return cookies;
}

export function sessionCookie(value: string, expires: Date) {
  return `${SESSION_COOKIE}=${encodeURIComponent(value)}; Expires=${expires.toUTCString()}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

export function childCookie(value: string, expires: Date) {
  return `${CHILD_COOKIE}=${encodeURIComponent(value)}; Expires=${expires.toUTCString()}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

export function clearChildCookie() {
  return `${CHILD_COOKIE}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; Secure; SameSite=Lax`;
}
