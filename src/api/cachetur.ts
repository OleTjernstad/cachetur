import { env } from '@/env'
import ky from 'ky'

export let url = `${env.VITE_API_URL}/api`

export const ctApi = ky.create({
  prefixUrl: url,
  credentials: 'include',
})
