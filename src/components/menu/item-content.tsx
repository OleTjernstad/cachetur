import type { MenuItem } from './types'

export function MenuItemContent({ item }: { item: MenuItem }) {
  return (
    <>
      {item.image && (
        <img
          src={item.image || '/placeholder.svg'}
          alt={item.imageAlt || item.label}
          className="h-4 w-4 rounded-sm object-cover flex-shrink-0"
        />
      )}
      {item.icon && (
        <span className="flex items-center flex-shrink-0">{item.icon}</span>
      )}
      <span className={`${item.disabled ? 'opacity-50' : ''}`}>
        {item.label}
      </span>
    </>
  )
}
