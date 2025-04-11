'use client'

import { Heart, Menu, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { routes } from 'shared/config'
import { useBreakpoint } from 'shared/lib'
import { Button } from 'shared/ui'

interface IProps {
  openSheet: VoidFunction
  cartSlot: ReactNode
  profileCard: ReactNode
}

export const Navigation = ({ openSheet, cartSlot, profileCard }: IProps) => {
  const hideNavigation = useBreakpoint('md')

  if (hideNavigation) {
    return (
      <Button variant="outline" onClick={openSheet}>
        <Menu />
      </Button>
    )
  }

  return (
    <nav className="flex space-x-2">
      {cartSlot}
      <Button variant="secondary" asChild>
        <Link href={routes.catalog}>
          <ShoppingBag />
          Каталог
        </Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link href={routes.favorites}>
          <Heart />
          Избранное
        </Link>
      </Button>
      {profileCard}
    </nav>
  )
}
