import { HeadphonesIcon, Home, Info, LogIn } from 'lucide-react'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import { MenuToolbar } from '@/components/menu/menu'

export const Route = createFileRoute('/(main)')({
  component: MainLayout,
})

function MainLayout() {
  const leftMenuItems = [
    {
      label: 'Home',
      to: '/',
      icon: <Home className="h-4 w-4" />,
    },
  ]

  const rightMenuItems = [
    {
      label: 'Support',
      icon: <HeadphonesIcon className="h-4 w-4" />,
      items: [
        {
          label: 'Help Center',
          to: '/help',
          icon: <Info className="h-4 w-4" />,
        },
      ],
    },
    {
      label: 'Login',
      to: '/auth/login',
      icon: <LogIn className="h-4 w-4" />,
    },
  ]
  return (
    <div className="min-h-screen bg-background">
      <MenuToolbar
        logo={
          <div className="flex items-center space-x-2">
            <img src="/logo600.png" alt="Cachetur.no" className="h-8 w-auto" />
          </div>
        }
        logoTo="/"
        leftMenuItems={leftMenuItems}
        rightMenuItems={rightMenuItems}
        onLogoClick={() => console.log('Logo clicked!')}
      />
      <main className="container mx-auto px-4 py-12">
        <Outlet />
      </main>
    </div>
  )
}
