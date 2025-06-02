'use client'

import { Heart, ShoppingBag, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactNode, useMemo } from 'react'
import { routes } from 'shared/config'
import { useAppSelector, useAutoCloseDialog } from 'shared/lib'
import { Button, Sheet, SheetContent, SheetTitle } from 'shared/ui'

interface IProps extends PropsWithChildren {
  open: boolean
  onOpenChange: (value: boolean) => void
  logoSlot: ReactNode
  cartSlot: ReactNode
  profileSlot: ReactNode
  adminNavigationSlot: ReactNode
  footerSlot: ReactNode
}

export const MobileSheet = ({
  open,
  onOpenChange,
  logoSlot,
  cartSlot,
  profileSlot,
  adminNavigationSlot,
  footerSlot,
}: IProps) => {
  const pathname = usePathname()
  const isAuth = useAppSelector((state) => state.sessionReducer.isAuth)
  const isAdminRoute = useMemo(
    () => (pathname ? pathname.includes('manage') : false),
    [pathname]
  )

  useAutoCloseDialog({ open, onOpenChange })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-4 flex flex-col">
        <SheetTitle className="hidden">Навигация</SheetTitle>
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between">
            {logoSlot}
            {profileSlot}
          </div>
          {isAdminRoute ? (
            adminNavigationSlot
          ) : (
            <nav className="flex flex-col space-y-2">
              {isAuth && (
                <>
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
                </>
              )}
              {cartSlot}
              <Button className="justify-start" variant="secondary" asChild>
                <Link href={routes.catalog}>
                  <ShoppingBag />
                  Каталог
                </Link>
              </Button>
              {isAuth && (
                <Button className="justify-start" variant="secondary" asChild>
                  <Link href={routes.favorites}>
                    <Heart />
                    Избранное
                  </Link>
                </Button>
              )}
            </nav>
          )}
        </div>
        {footerSlot}
      </SheetContent>
    </Sheet>
  )
}
