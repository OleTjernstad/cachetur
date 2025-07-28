import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/api/users/user'

export const Route = createFileRoute('/(main)/users/$userId')({
  component: UserPage,
  loader: ({ context: { queryClient }, params: { userId } }) => {
    return queryClient.ensureQueryData(userQueryOptions(userId))
  },
})

function UserPage() {
  const userId = Route.useParams().userId
  const { data: user } = useSuspenseQuery(userQueryOptions(userId))
  if (!user) return <div>User not found.</div>

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #eee',
        borderRadius: 8,
      }}
    >
      <h2>User Profile</h2>
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          rowGap: 8,
          columnGap: 16,
        }}
      >
        <dt>ID:</dt>
        <dd>{user.id}</dd>
        <dt>Name:</dt>
        <dd>{user.name}</dd>
        <dt>Email:</dt>
        <dd>{user.email}</dd>
        <dt>Email Verified:</dt>
        <dd>{user.emailVerified ? 'Yes' : 'No'}</dd>
        <dt>Image:</dt>
        <dd>
          {user.image ? (
            <img
              src={user.image}
              alt="User avatar"
              style={{ maxWidth: 80, borderRadius: '50%' }}
            />
          ) : (
            'None'
          )}
        </dd>
        <dt>Created At:</dt>
        <dd>
          {user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}
        </dd>
        <dt>Updated At:</dt>
        <dd>
          {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : ''}
        </dd>
        <dt>Username:</dt>
        <dd>{user.username || 'None'}</dd>
        <dt>Display Username:</dt>
        <dd>{user.displayUsername || 'None'}</dd>
      </dl>
    </div>
  )
}
