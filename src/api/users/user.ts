import type { User } from '@/contracts/user'
import { ctApi } from '../cachetur'
import { queryOptions } from '@tanstack/react-query'

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['users', { userId }],
    queryFn: () => fetchUser(userId),
  })

export const fetchUser = async (userId: string) => {
  console.info(`Fetching user with id ${userId}...`)
  const user = await ctApi.get<User>(`users/${userId}`).json()

  return user
}
