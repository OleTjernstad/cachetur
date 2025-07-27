import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { NavigationButtons } from './-components/navigation-buttons'
import { ProgressIndicator } from './-components/progress-indicator'
import { StepFire } from './-components/step-fire'
import { StepOne } from './-components/step-one'
import { StepThree } from './-components/step-three'
import { StepTwo } from './-components/step-two'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'
import { formOpts } from './-components/options'
import { useAppForm } from '@/components/form/form-context'
import { useState } from 'react'

export const Route = createFileRoute('/auth/register/')({
  component: MultiStepSignupForm,
})

export default function MultiStepSignupForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
      const data = await authClient.signUp.email({
        email: value.email,
        name: value.username,
        password: value.password,
        username: value.username,
      })
      console.log('Sign up response:', data)
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
      }
    },
  })

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-2">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          {/* Step 1: Information and Username Selection */}
          {currentStep === 1 && <StepOne form={form} />}

          {/* Step 2: Terms Acceptance */}
          {currentStep === 2 && <StepTwo form={form} />}

          {/* Step 3: Email and Password Setup */}
          {currentStep === 3 && <StepThree form={form} />}

          {/* Step 4: Email Verification */}
          {currentStep === 4 && (
            <StepFire
              form={form}
              isEmailSent={isEmailSent}
              setIsEmailSent={setIsEmailSent}
            />
          )}

          {/* Step 5: Account Creation Complete */}
          {currentStep === 5 && (
            <div className="space-y-4 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Creation of user</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Congratulations! Your account has been created successfully.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  Welcome to cachetur.no! You can now start planning your trips
                </p>
              </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? '...' : 'Get started'}
                    </Button>

                    <button
                      type="reset"
                      onClick={(e) => {
                        // Avoid unexpected resets of form elements (especially <select> elements)
                        e.preventDefault()
                        form.reset()
                      }}
                    >
                      Reset
                    </button>
                  </>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <form.Subscribe
              selector={(state) => state.values.terms}
              children={(terms) => (
                <NavigationButtons
                  currentStep={currentStep}
                  isEmailSent={isEmailSent}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  isTermsAccepted={terms}
                />
              )}
            />
          )}
        </form>
      </CardContent>
    </Card>
  )
}
