import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { formOpts } from './options'
import { withForm } from '@/components/form/form-context'

export const StepFire = withForm({
  // These values are only used for type-checking, and are not used at runtime
  // This allows you to `...formOpts` from `formOptions` without needing to redeclare the options
  ...formOpts,
  // Optional, but adds props to the `render` function in addition to `form`
  props: {},
  render: function Render({ form }) {
    const handleSendVerificationEmail = () => {
      // Simulate sending email
      form.setFieldValue('isEmailSent', true)
      console.log('Verification email sent')
    }
    return (
      <form.Subscribe
        selector={(state) => state.values.isEmailSent}
        children={(isEmailSent) => (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">Email verification</h2>
              <p className="text-gray-600 text-sm mt-1">
                {isEmailSent
                  ? "We've sent a verification code to your email"
                  : 'Click the button below to send a verification email'}
              </p>
            </div>

            {!isEmailSent ? (
              <div className="text-center">
                <Button
                  type="button"
                  onClick={handleSendVerificationEmail}
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Verification Email
                </Button>
              </div>
            ) : (
              <form.AppField
                name="verificationCode"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Verification code is required' : undefined,
                }}
                children={(field) => (
                  <div>
                    <field.TextField
                      label="Verification Code"
                      placeholder="Enter the 6-digit code"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Didn't receive the code?{' '}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={handleSendVerificationEmail}
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                )}
              />
            )}
          </div>
        )}
      />
    )
  },
})
