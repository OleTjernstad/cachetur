import { ChevronDown, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'
import type { MenuItem } from './types'
import { MenuItemContent } from './item-content'

export function MobileMenuItems({
  allMenuItems,
  handleItemClick,
  mobileMenuOpen,
  setMobileMenuOpen,
  toggleSection,
  expandedSections,
}: {
  allMenuItems: MenuItem[]
  handleItemClick: (item: MenuItem) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleSection: (index: number) => void
  expandedSections: Set<number>
}) {
  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col space-y-2 mt-6 pb-6">
            {allMenuItems.map((item, index) => (
              <div key={index} className="space-y-1">
                {item.items && item.items.length > 0 ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between flex items-center gap-2 px-2"
                      onClick={() => toggleSection(index)}
                      disabled={item.disabled}
                    >
                      <div className="flex items-center gap-2">
                        <MenuItemContent item={item} />
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedSections.has(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </Button>
                    {expandedSections.has(index) && (
                      <div className="pl-4 space-y-1 mt-1">
                        {item.items.map((subItem, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            className="w-full justify-start flex items-center gap-2 text-sm"
                            onClick={() => handleItemClick(subItem)}
                            disabled={subItem.disabled}
                            asChild={
                              !!(subItem.to || subItem.href) &&
                              !subItem.disabled
                            }
                          >
                            {subItem.to && !subItem.disabled ? (
                              <Link
                                to={subItem.to}
                                search={subItem.search}
                                params={subItem.params}
                                hash={subItem.hash}
                                replace={subItem.replace}
                                className="flex items-center gap-2 w-full text-left"
                              >
                                <MenuItemContent item={subItem} />
                              </Link>
                            ) : subItem.href && !subItem.disabled ? (
                              <a
                                href={subItem.href}
                                className="flex items-center gap-2 w-full text-left"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MenuItemContent item={subItem} />
                              </a>
                            ) : (
                              <div className="flex items-center gap-2 w-full text-left">
                                <MenuItemContent item={subItem} />
                              </div>
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start flex items-center gap-2 px-2"
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    asChild={!!(item.to || item.href) && !item.disabled}
                  >
                    {item.to && !item.disabled ? (
                      <Link
                        to={item.to}
                        search={item.search}
                        params={item.params}
                        hash={item.hash}
                        replace={item.replace}
                        className="flex items-center gap-2 w-full text-left"
                      >
                        <MenuItemContent item={item} />
                      </Link>
                    ) : item.href && !item.disabled ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-2 w-full text-left"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MenuItemContent item={item} />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 w-full text-left">
                        <MenuItemContent item={item} />
                      </div>
                    )}
                  </Button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
