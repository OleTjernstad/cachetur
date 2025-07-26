import { CheckCircle, Mail, Shield, User, UserCheck } from 'lucide-react'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    {
      id: 1,
      title: 'Information and username selection',
      icon: User,
      description: 'Basic information and username',
    },
    {
      id: 2,
      title: 'Accept terms',
      icon: Shield,
      description: 'Terms of service and privacy policy',
    },
    {
      id: 3,
      title: 'Register your e-mail and set your password',
      icon: Mail,
      description: 'Email and password setup',
    },
    {
      id: 4,
      title: 'Email verification',
      icon: CheckCircle,
      description: 'Verify your email address',
    },
    {
      id: 5,
      title: 'Creation of user',
      icon: UserCheck,
      description: 'Account creation complete',
    },
  ]
  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id
          const Icon = step.icon

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Fixed height container for circles and lines */}
              <div className="flex items-center w-full h-10">
                {/* Circle at fixed position */}
                <div className="flex justify-center w-full">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200',
                      isActive
                        ? 'bg-yellow-400 border-yellow-400 text-white'
                        : isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-gray-100 border-gray-300 text-gray-400',
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Connecting line between circles */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 transition-all duration-200',
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200',
                    )}
                  />
                )}
              </div>

              {/* Text container - can resize without affecting circle position */}
              <div className="text-center mt-3 px-1">
                <div className="text-xs font-medium text-gray-600">
                  Step {step.id}
                </div>
                <div
                  className={cn(
                    'text-xs mt-1 leading-tight',
                    isActive ? 'text-gray-900 font-medium' : 'text-gray-500',
                  )}
                >
                  {step.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Progress value={progressPercentage} className="h-1" />
    </div>
  )
}
