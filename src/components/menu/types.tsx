export interface MenuItem {
  label: string
  to?: string
  href?: string // For external links
  onClick?: () => void
  items?: MenuItem[]
  align?: 'left' | 'right'
  icon?: React.ReactNode
  image?: string
  imageAlt?: string
  search?: Record<string, any>
  params?: Record<string, any>
  hash?: string
  replace?: boolean
  disabled?: boolean
}
