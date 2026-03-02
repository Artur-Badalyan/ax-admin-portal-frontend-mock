const SESSION_STORAGE_KEY = "auth_session"
const SESSION_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export interface SessionUser {
  id: string
  email: string
  displayName?: string
  picture?: string
  oid?: string // Azure object ID
  cryptlexUserId?: string
  cryptlexOrganizationId?: string 
}

export interface Session {
  user: SessionUser
  createdAt: number
  expiresAt: number
}

/**
 * Session service - handles client-side session management for React
 * Uses localStorage to persist session data
 */
export const sessionService = {
  /**
   * Create a session in localStorage
   */
  createSession(user: SessionUser): void {
    const session: Session = {
      user,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_AGE,
    }

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    } catch (error) {
      console.error("[sessionService] Failed to create session:", error)
    }
  },

  /**
   * Get session from localStorage
   */
  getSession(): Session | null {
    try {
      const sessionData = localStorage.getItem(SESSION_STORAGE_KEY)
      
      if (!sessionData) return null

      const session: Session = JSON.parse(sessionData)

      // Check expiration
      if (session.expiresAt < Date.now()) {
        console.warn("[sessionService] Session expired")
        sessionService.clearSession()
        return null
      }

      return session
    } catch (error) {
      console.error("[sessionService] Failed to parse session:", error)
      return null
    }
  },

  /**
   * Clear session from localStorage
   */
  clearSession(): void {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    } catch (error) {
      console.error("[sessionService] Failed to clear session:", error)
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const session = sessionService.getSession()
    return session !== null
  },
}

export default sessionService
