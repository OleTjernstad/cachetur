import { formOpts } from './options'
import { withForm } from '@/components/form/form-context'

export const StepThree = withForm({
  // These values are only used for type-checking, and are not used at runtime
  // This allows you to `...formOpts` from `formOptions` without needing to redeclare the options
  ...formOpts,
  // Optional, but adds props to the `render` function in addition to `form`
  props: {},
  render: function Render({ form }) {
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

        <form.AppField
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
          children={(field) => (
            <field.TextField
              label="Email Address"
              placeholder="Enter your email address"
            />
          )}
        />

        <form.AppField
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Password is required'
              if (value.length < 8)
                return 'Password must be at least 8 characters'
              return undefined
            },
          }}
          children={(field) => (
            <field.TextField
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          )}
        />
        <form.AppField
          name="confirmPassword"
          validators={{
            onChangeListenTo: ['password'],
            onChange: ({ value, fieldApi }) => {
              if (!value) return 'Please confirm your password'
              if (value !== fieldApi.form.getFieldValue('password')) {
                return 'Passwords do not match'
              }
              return undefined
            },
          }}
          children={(field) => (
            <field.TextField
              label="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
            />
          )}
        />
      </div>
    )
  },
})
