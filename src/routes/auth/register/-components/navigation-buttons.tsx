import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface NavigationButtonsProps {
  currentStep: number
  isEmailSent: boolean
  handleNext: () => void
  handlePrevious: () => void
  isTermsAccepted?: boolean
}

export function NavigationButtons({
  currentStep,
  isEmailSent,
  handleNext,
  handlePrevious,
  isTermsAccepted = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <Button
        type="button"
        onClick={handleNext}
        disabled={
          (currentStep === 2 && !isTermsAccepted) ||
          (currentStep === 4 && !isEmailSent)
        }
      >
        {currentStep === 4 ? 'Verify & Continue' : 'Next'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
