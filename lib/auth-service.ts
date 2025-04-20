// Interface for user credentials
interface User {
  username: string
  passwordHash: string
}

// The single authorized user (with hashed password)
// In a real app, this would be stored in a secure database
const AUTHORIZED_USER: User = {
  username: "anandam",
  // We're not storing the actual password, but rather checking it directly in the login method
  passwordHash: "akusukamadu0909@",
}

// Auth token name in localStorage
const AUTH_TOKEN_KEY = "video_editor_auth_token"
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

class AuthService {
  // Check if user is logged in
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false

    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return false

    try {
      const tokenData = JSON.parse(token)
      // Check if token is expired
      if (new Date().getTime() > tokenData.expiry) {
        this.logout()
        return false
      }
      return true
    } catch (error) {
      this.logout()
      return false
    }
  }

  // Login with username and password
  login(username: string, password: string): boolean {
    // Check credentials
    if (
      username.toLowerCase() === AUTHORIZED_USER.username.toLowerCase() &&
      password === AUTHORIZED_USER.passwordHash
    ) {
      // Create token with expiry
      const token = {
        username,
        expiry: new Date().getTime() + TOKEN_EXPIRY,
      }

      // Store token in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token))
      return true
    }

    return false
  }

  // Logout user
  logout(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  // Get current user
  getCurrentUser(): string | null {
    if (!this.isAuthenticated()) return null

    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      if (!token) return null

      const tokenData = JSON.parse(token)
      return tokenData.username
    } catch (error) {
      return null
    }
  }
}

// Export a singleton instance
export const authService = new AuthService()
