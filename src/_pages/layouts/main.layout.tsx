'use client'

import { PropsWithChildren, useState } from 'react'
import { NoSSR } from 'shared/lib'
import { Container } from 'shared/ui'
import { CartModal } from 'widgets/cart-modal'
import {
  AdminNavigation,
  Footer,
  Logo,
  MobileSheet,
  Navigation,
} from 'widgets/layout'
import { SearchModal } from 'widgets/products'
import { UserProfileCard } from 'widgets/users'

const Header = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center h-16 bg-background border-b border-b-gray-200 dark:border-b-gray-700 z-50">
        <Container className="flex items-center justify-between space-x-4">
          <div className="flex-1 flex items-center space-x-4">
            <Logo />
            <SearchModal />
          </div>
          <NoSSR>
            <Navigation
              cartSlot={<CartModal />}
              openSheet={handleOpen}
              profileCard={<UserProfileCard className="pl-2" />}
            />
          </NoSSR>
        </Container>
      </header>
      <NoSSR>
        <MobileSheet
          open={open}
          onOpenChange={setOpen}
          logoSlot={<Logo alwaysShow={true} />}
          cartSlot={<CartModal />}
          profileSlot={<UserProfileCard className="pl-2" />}
          adminNavigationSlot={<AdminNavigation />}
        />
      </NoSSR>
    </>
  )
}

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-1 flex flex-col pt-16">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
