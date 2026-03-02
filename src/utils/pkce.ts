/**
 * Generate PKCE code verifier (43-128 characters)
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32)
  window.crypto.getRandomValues(array)
  return base64UrlEncode(array)
}

/**
 * Generate PKCE code challenge from verifier
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const hash = await window.crypto.subtle.digest("SHA-256", data)
  return base64UrlEncode(new Uint8Array(hash))
}

/**
 * Helper function to encode Uint8Array to base64url format
 */
function base64UrlEncode(array: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...array))
  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}
