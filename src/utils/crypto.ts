/**
 * Generate a secure random state string for CSRF protection
 */
export function generateState(): string {
  const array = new Uint8Array(32)
  window.crypto.getRandomValues(array)
  return arrayToHex(array)
}

/**
 * Generate a secure random string
 */
export function generateRandomString(length = 32): string {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return arrayToHex(array)
}

/**
 * Sign data with secret (for session validation)
 */
export async function signData(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(data)

  // Import the secret as a CryptoKey
  const key = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )

  // Sign the data
  const signature = await window.crypto.subtle.sign("HMAC", key, messageData)
  return arrayToHex(new Uint8Array(signature))
}

/**
 * Verify signed data
 */
export async function verifySignedData(
  data: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const expectedSignature = await signData(data, secret)

  // Convert both from HEX to Uint8Array
  const sigArray = hexToArray(signature)
  const expectedArray = hexToArray(expectedSignature)

  // Required: lengths must match for timing-safe comparison
  if (sigArray.length !== expectedArray.length) {
    return false
  }

  // Timing-safe comparison
  return timingSafeEqual(sigArray, expectedArray)
}

/**
 * Helper: Convert Uint8Array to hex string
 */
function arrayToHex(array: Uint8Array): string {
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

/**
 * Helper: Convert hex string to Uint8Array
 */
function hexToArray(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
  }
  return bytes
}

/**
 * Helper: Timing-safe equality comparison
 */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i]
  }
  return result === 0
}
