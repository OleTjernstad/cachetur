import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function StepFire() {
  return (
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
        <form.Field
          name="verificationCode"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Verification code is required' : undefined,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter the 6-digit code"
                maxLength={6}
              />
              {field.state.meta.errors && (
                <p className="text-red-500 text-xs mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
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
        </form.Field>
      )}
    </div>
  )
}
