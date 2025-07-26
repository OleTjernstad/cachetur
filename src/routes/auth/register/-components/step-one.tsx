import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StepOneProps {
  // Define any props needed for StepOne component
}
export function StepOne({}: StepOneProps) {
  // Step one component logic here
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">
          Information and username selection
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Please provide your basic information
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'First name is required' : undefined,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your first name"
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
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Last name is required' : undefined,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your last name"
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

      <form.Field
        name="username"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Username is required' : undefined,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Choose a username"
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
        name="howDidYouHear"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Please select how you heard about us' : undefined,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search Engine</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="friend">Friend/Colleague</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
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
