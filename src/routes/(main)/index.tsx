import { Link, createFileRoute } from '@tanstack/react-router'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usersQueryOptions } from '@/api/users/users'

export const Route = createFileRoute('/(main)/')({
  component: MainScreen,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(usersQueryOptions),
})

function MainScreen() {
  const usersQuery = useSuspenseQuery(usersQueryOptions)
  const { data: users, isLoading, isError, error } = usersQuery
  console.log('Users:', users)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isLoading && <div className="mb-4 text-blue-500">Loading users...</div>}
      {isError && (
        <div className="mb-4 text-red-500">
          Error loading users: {error?.message || String(error)}
        </div>
      )}
      <ul className="space-y-2">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="bg-gray-100 text-black rounded px-4 py-2 flex items-center gap-4"
            >
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name || user.username || user.id}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold">
                  <Link to={`/users/$userId`} params={{ userId: user.id }}>
                    {user.name}
                  </Link>{' '}
                  <span className="text-gray-500">
                    ({user.username || user.displayUsername || user.id})
                  </span>
                </div>
                <div className="text-sm text-gray-700">Email: {user.email}</div>
                <div className="text-xs text-gray-500">ID: {user.id}</div>
                <div className="text-xs text-gray-400">
                  Created:{' '}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : ''}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  )
}
