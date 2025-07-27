import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { MenuItem } from './types'
import { MenuItemContent } from './item-content'
import React from 'react'

export function DesktopMenuItems({
  items,
  handleItemClick,
}: {
  items: MenuItem[]
  handleItemClick: (item: MenuItem) => void
}) {
  return (
    <nav className="flex items-center space-x-1">
      {items.map((item, index) => {
        if (item.items && item.items.length > 0) {
          return (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  disabled={item.disabled}
                >
                  {<MenuItemContent item={item} />}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {item.items.map((subItem, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <DropdownMenuItem
                      className={`cursor-pointer flex items-center gap-2 ${
                        subItem.disabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={() => handleItemClick(subItem)}
                      disabled={subItem.disabled}
                    >
                      {subItem.to && !subItem.disabled ? (
                        <Link
                          to={subItem.to}
                          search={subItem.search}
                          params={subItem.params}
                          hash={subItem.hash}
                          replace={subItem.replace}
                          className="flex items-center gap-2 flex-1"
                        >
                          <MenuItemContent item={subItem} />
                        </Link>
                      ) : subItem.href && !subItem.disabled ? (
                        <a
                          href={subItem.href}
                          className="flex items-center gap-2 flex-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MenuItemContent item={subItem} />
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 flex-1">
                          <MenuItemContent item={subItem} />
                        </div>
                      )}
                    </DropdownMenuItem>
                    {subIndex < item.items!.length - 1 && (
                      <DropdownMenuSeparator />
                    )}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }

        return (
          <Button
            key={index}
            variant="ghost"
            className="flex items-center gap-2"
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
                className="flex items-center gap-2"
              >
                <MenuItemContent item={item} />
              </Link>
            ) : item.href && !item.disabled ? (
              <a
                href={item.href}
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MenuItemContent item={item} />
              </a>
            ) : (
              <div className="flex items-center gap-2">
                <MenuItemContent item={item} />
              </div>
            )}
          </Button>
        )
      })}
    </nav>
  )
}
