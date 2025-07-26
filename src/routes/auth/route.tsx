import { Outlet, createFileRoute } from '@tanstack/react-router'

import { languages } from '@/utils/languages'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setSelectedLanguage(lng)
  }

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
        <Outlet />
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
