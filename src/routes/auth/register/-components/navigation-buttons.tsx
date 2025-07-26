import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function NavigationButtons() {
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
          (currentStep === 2 &&
            !form.getFieldValue('termsAndPrivacyAccepted')) ||
          (currentStep === 4 && !isEmailSent)
        }
      >
        {currentStep === 4 ? 'Verify & Continue' : 'Next'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
