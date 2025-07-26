import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function StepThree() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">
          Register your e-mail and set your password
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Create your login credentials
        </p>
      </div>

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'Email is required'
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return 'Please enter a valid email address'
            }
            return undefined
          },
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your email address"
            />
            {field.state.meta.errors && (
              <p className="text-red-500 text-xs mt-1">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'Password is required'
            if (value.length < 8)
              return 'Password must be at least 8 characters'
            return undefined
          },
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Create a password"
            />
            {field.state.meta.errors && (
              <p className="text-red-500 text-xs mt-1">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="confirmPassword"
        validators={{
          onChange: ({ value, fieldApi }) => {
            if (!value) return 'Please confirm your password'
            if (value !== fieldApi.form.getFieldValue('password')) {
              return 'Passwords do not match'
            }
            return undefined
          },
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Confirm your password"
            />
            {field.state.meta.errors && (
              <p className="text-red-500 text-xs mt-1">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>
    </div>
  )
}
