import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Info, KeyRound, MapPin, UserPlus } from 'lucide-react'
import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const loginSearchSchema = z.object({
  redirect: z.string().catch('').optional(),
})

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
  validateSearch: (search) => loginSearchSchema.parse(search),
})

function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()

  const { redirect } = useSearch({
    from: Route.fullPath,
  })

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      // Handle login logic here
      console.log('Login attempt:', value)
      const { data, error } = await authClient.signIn.username(
        {
          username: value.username,
          /**
           * The user password
           */
          password: value.password,

          /**
           * remember the user session after the browser is closed.
           * @default true
           */
          rememberMe: false,
        },
        {
          onSuccess: () => {
            if (redirect) router.history.push(redirect)
            else router.history.push('/')
          },
        },
      )

      if (error) {
        console.error('Login error:', error)
        return
      }

      console.log('Login successful:', data)
    },
  })

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Login Form */}
        <div className="space-y-6">
          <Card className="w-full max-w-md mx-auto lg:mx-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>{t('login.signIn')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
                className="space-y-4"
              >
                <form.Field
                  name="username"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? t('login.usernameRequired') : undefined,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>{t('login.username')}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t('login.enterUsername')}
                        className={
                          field.state.meta.errors.length > 0
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-600">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? t('login.passwordRequired') : undefined,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>{t('login.password')}</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t('login.enterPassword')}
                        className={
                          field.state.meta.errors.length > 0
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-600">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? t('login.signingIn') : t('login.signIn')}
                    </Button>
                  )}
                </form.Subscribe>
              </form>

              {/* Navigation Links under Sign In Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a
                    href="/about"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <Info className="h-4 w-4" />
                    <span>{t('login.whatIsCachetur')}</span>
                  </a>
                  <a
                    href="/signup"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>{t('login.signUp')}</span>
                  </a>
                  <a
                    href="/forgot-password"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <KeyRound className="h-4 w-4" />
                    <span>{t('login.forgotPassword')}</span>
                  </a>
                  <a
                    href="/help"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>{t('login.helpCenter')}</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Content */}
        <div className="space-y-6">
          {/* Registration Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t('login.notRegistered')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>{t('login.needUser')}</p>
              <p>
                {t('login.tripPlannerInfo')}{' '}
                <a
                  href="/signup"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {t('login.signUpHere')}
                </a>
              </p>
              <p>{t('login.freeAccountInfo')}</p>
              <p>{t('login.premiumInfo')}</p>
              <p>
                <a
                  href="/about"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {t('login.readMore')}
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
