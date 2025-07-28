import type { User } from '@/contracts/user'
import { ctApi } from '../cachetur'
import { queryOptions } from '@tanstack/react-query'

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: () => fetchUsers(),
})

export const fetchUsers = async () => {
  try {
    console.info(`Fetching users...`)
    const users = await ctApi.get<User[]>(`users`).json()

    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}
