'use client'

import { Heart, ShoppingBag, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactNode, useMemo } from 'react'
import { routes } from 'shared/config'
import { Button, Sheet, SheetContent, SheetTitle } from 'shared/ui'

interface IProps extends PropsWithChildren {
  open: boolean
  onOpenChange: (value: boolean) => void
  logoSlot: ReactNode
  cartSlot: ReactNode
  profileSlot: ReactNode
  adminNavigationSlot: ReactNode
}

export const MobileSheet = ({
  open,
  onOpenChange,
  logoSlot,
  cartSlot,
  profileSlot,
  adminNavigationSlot,
}: IProps) => {
  const pathname = usePathname()

  const isAdminRoute = useMemo(
    () => (pathname ? pathname.includes('manage') : false),
    [pathname]
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-4 space-y-4">
        <SheetTitle className="hidden">Навигация</SheetTitle>
        <div className="flex items-center justify-between">
          {logoSlot}
          {profileSlot}
        </div>
        {isAdminRoute ? (
          adminNavigationSlot
        ) : (
          <nav className="flex flex-col space-y-2">
            <Button className="justify-start" variant="secondary" asChild>
              <Link href={routes.profile}>
                <User />
                Профиль
              </Link>
            </Button>
            <Button className="justify-start" variant="secondary" asChild>
              <Link href={routes.orders}>
                <ShoppingCart />
                Заказы
              </Link>
            </Button>
            {cartSlot}
            <Button className="justify-start" variant="secondary" asChild>
              <Link href={routes.profile}>
                <ShoppingBag />
                Каталог
              </Link>
            </Button>
            <Button className="justify-start" variant="secondary" asChild>
              <Link href={routes.favorites}>
                <Heart />
                Избранное
              </Link>
            </Button>
          </nav>
        )}
      </SheetContent>
    </Sheet>
  )
}
