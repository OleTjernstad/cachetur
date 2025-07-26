import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Info, KeyRound, MapPin, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  console.log('Current language:', selectedLanguage)
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setSelectedLanguage(lng)
  }

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      // Handle login logic here
      console.log('Login attempt:', value)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const languages = [
    { code: 'en_US', name: 'English', flag: '/flag/us.png' },
    { code: 'nb_NO', name: 'Norsk', flag: '/flag/no.png' },
    { code: 'sv_SE', name: 'Svenska', flag: '/flag/se.png' },
    { code: 'da_DK', name: 'Dansk', flag: '/flag/dk.png' },
    { code: 'de_DE', name: 'Deutsch', flag: '/flag/de.png' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Landscape Image and Logo */}
      <div className="relative h-80  overflow-hidden">
        <img
          src="/login-background-2016.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover  transform scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        {/* Large Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <img
              src="/cachetur_white_plain.svg"
              alt="Cachetur.no"
              className="h-16 w-auto"
            />
          </div>
        </div>

        {/* Language Selection Row */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`hover:scale-110 transition-transform duration-200 ${
                    selectedLanguage === lang.code
                      ? 'ring-2 ring-white rounded'
                      : ''
                  }`}
                  title={lang.name}
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="h-4 w-4 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                        <Label htmlFor={field.name}>
                          {t('login.username')}
                        </Label>
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
                        <Label htmlFor={field.name}>
                          {t('login.password')}
                        </Label>
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
                        {isSubmitting
                          ? t('login.signingIn')
                          : t('login.signIn')}
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
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Geocaching API Attribution */}
          <div className="mb-6 pb-6 border-b border-slate-700">
            <div className="flex items-start space-x-3">
              <img
                src="/Geocaching_API_Logo_vCOMP2_090716_SM.png"
                alt="Geocaching API"
                width="120"
                height="40"
                className="mt-1"
              />
              <div className="text-sm text-gray-300">
                <p>
                  Powered by the Geocaching API. Made possible through the
                  support of Geocaching Premium Memberships, the API program
                  gives third-party developers the opportunity to work with
                  Geocaching HQ on a full suite of integrated products and
                  services for the community. API developer applications are
                  designed to work with the core services of geocaching.com and
                  provide additional features to the geocaching community.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2024 Cachetur.no - {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
