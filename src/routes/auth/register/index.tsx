import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { NavigationButtons } from './-components/navigation-buttons'
import { ProgressIndicator } from './-components/progress-indicator'
import { StepFire } from './-components/step-fire'
import { StepOne } from './-components/step-one'
import { StepThree } from './-components/step-three'
import { StepTwo } from './-components/step-two'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

export const Route = createFileRoute('/auth/register/')({
  component: MultiStepSignupForm,
})

interface FormData {
  firstName: string
  lastName: string
  username: string
  howDidYouHear: string
  termsAndPrivacyAccepted: boolean // Changed from two separate fields
  email: string
  password: string
  confirmPassword: string
  verificationCode: string
}

export default function MultiStepSignupForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      username: '',
      howDidYouHear: '',
      termsAndPrivacyAccepted: false, // Single field instead of two
      email: '',
      password: '',
      confirmPassword: '',
      verificationCode: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
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

  const handleSendVerificationEmail = () => {
    setIsEmailSent(true)
    // Simulate sending email
    console.log('Verification email sent')
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
          {currentStep === 1 && <StepOne />}

          {/* Step 2: Terms Acceptance */}
          {currentStep === 2 && <StepTwo />}

          {/* Step 3: Email and Password Setup */}
          {currentStep === 3 && <StepThree />}

          {/* Step 4: Email Verification */}
          {currentStep === 4 && <StepFire />}

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
                  Welcome to our platform! You can now start using all the
                  features available to you.
                </p>
              </div>

              <Button type="button" className="w-full">
                Get Started
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && <NavigationButtons />}
        </form>
      </CardContent>
    </Card>
  )
}
