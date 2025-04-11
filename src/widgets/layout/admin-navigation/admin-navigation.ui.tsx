'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from 'shared/ui'
import { adminNavigationConfig } from './admin-navigation.config'

export const AdminNavigation = () => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-2">
      {adminNavigationConfig.map((item) => {
        const Icon = item.icon

        return (
          <Button
            key={item.path}
            variant={pathname === item.path ? 'default' : 'secondary'}
            className="justify-start"
            asChild
          >
            <Link href={item.path}>
              <Icon />
              {item.title}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
