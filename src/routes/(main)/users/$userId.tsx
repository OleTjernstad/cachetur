import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/api/users/user'

export const Route = createFileRoute('/(main)/users/$userId')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { userId } }) => {
    return queryClient.ensureQueryData(userQueryOptions(userId))
  },
})

function RouteComponent() {
  const userId = Route.useParams().userId
  const { data: user } = useSuspenseQuery(userQueryOptions(userId))
  console.log('User:', user)

  return <div>Hello "/(main)/users/$userId"!</div>
}
