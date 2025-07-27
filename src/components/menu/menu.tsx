'use client'

import * as React from 'react'

import { Link, useNavigate } from '@tanstack/react-router'

import { DesktopMenuItems } from './desktop-menu-items'
import type { MenuItem } from './types'
import { MobileMenuItems } from './mobile-menu-items'

export interface MenuToolbarProps {
  logo?: React.ReactNode
  logoTo?: string
  logoHref?: string
  menuItems?: MenuItem[]
  leftMenuItems?: MenuItem[]
  rightMenuItems?: MenuItem[]
  className?: string
  onLogoClick?: () => void
}

export function MenuToolbar({
  logo,
  logoTo = '/',
  logoHref,
  menuItems = [],
  leftMenuItems = [],
  rightMenuItems = [],
  className = '',
  onLogoClick,
}: MenuToolbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [expandedSections, setExpandedSections] = React.useState<Set<number>>(
    new Set(),
  )
  const navigate = useNavigate()

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Combine all menu items for mobile, prioritizing the new props over legacy menuItems
  const allMenuItems = React.useMemo(() => {
    if (leftMenuItems.length > 0 || rightMenuItems.length > 0) {
      return [...leftMenuItems, ...rightMenuItems]
    }
    return menuItems
  }, [leftMenuItems, rightMenuItems, menuItems])

  // Determine left and right items
  const leftItems = React.useMemo(() => {
    if (leftMenuItems.length > 0) return leftMenuItems
    return menuItems.filter((item) => item.align !== 'right')
  }, [leftMenuItems, menuItems])

  const rightItems = React.useMemo(() => {
    if (rightMenuItems.length > 0) return rightMenuItems
    return menuItems.filter((item) => item.align === 'right')
  }, [rightMenuItems, menuItems])

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return

    if (item.onClick) {
      item.onClick()
    } else if (item.to) {
      navigate({
        to: item.to,
        search: item.search,
        params: item.params,
        hash: item.hash,
        replace: item.replace,
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo and Left Menu Items */}
          <div className="flex items-center space-x-4">
            {/* Logo Section */}
            <div className="flex items-center">
              {logo ? (
                logoTo ? (
                  <Link
                    to={logoTo}
                    onClick={onLogoClick}
                    className="flex items-center"
                  >
                    {logo}
                  </Link>
                ) : logoHref ? (
                  <a
                    href={logoHref}
                    onClick={onLogoClick}
                    className="flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {logo}
                  </a>
                ) : (
                  <button onClick={onLogoClick} className="flex items-center">
                    {logo}
                  </button>
                )
              ) : (
                <Link
                  to={logoTo}
                  onClick={onLogoClick}
                  className="flex items-center space-x-2"
                >
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      L
                    </span>
                  </div>
                  <span className="font-semibold text-lg">Logo</span>
                </Link>
              )}
            </div>

            {/* Left Menu Items */}
            <div className="hidden md:block">
              <DesktopMenuItems
                items={leftItems}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>

          {/* Right Section - Right Menu Items and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Right Menu Items */}
            <div className="hidden md:block">
              <DesktopMenuItems
                items={rightItems}
                handleItemClick={handleItemClick}
              />
            </div>

            {/* Mobile Navigation */}
            <MobileMenuItems
              allMenuItems={allMenuItems}
              handleItemClick={handleItemClick}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              toggleSection={toggleSection}
              expandedSections={expandedSections}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
