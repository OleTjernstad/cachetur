import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function StepTwo() {
  // Step two component logic here
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Accept terms</h2>
        <p className="text-gray-600 text-sm mt-1">
          Please review and accept our terms
        </p>
      </div>

      <Tabs defaultValue="terms" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="terms" className="mt-4">
          <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
            <h3 className="font-medium mb-3">Terms of Service</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                By using our service, you agree to these terms. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
              <p>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4">
          <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
            <h3 className="font-medium mb-3">Privacy Policy</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                We respect your privacy and are committed to protecting your
                personal data. This privacy policy will inform you about how we
                look after your personal data when you visit our website.
              </p>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact us for
                support. This may include your name, email address, phone
                number, and payment information.
              </p>
              <p>
                We use your information to provide, maintain, and improve our
                services, process transactions, send you technical notices and
                support messages, and communicate with you about products,
                services, and events.
              </p>
              <p>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the internet is 100% secure.
              </p>
              <p>
                You have the right to access, update, or delete your personal
                information. You may also opt out of certain communications from
                us. Contact us if you have any questions about your privacy
                rights.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <form.Field name="termsAndPrivacyAccepted">
        {(field) => (
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="termsAndPrivacy"
              checked={field.state.value}
              onCheckedChange={field.handleChange}
            />
            <Label htmlFor="termsAndPrivacy" className="text-sm">
              I accept the Terms of Service and Privacy Policy
            </Label>
          </div>
        )}
      </form.Field>
    </div>
  )
}
