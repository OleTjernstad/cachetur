import { createAuthClient } from 'better-auth/react'
import { env } from '@/env'
import { usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.VITE_API_URL,
  plugins: [usernameClient()],
})
