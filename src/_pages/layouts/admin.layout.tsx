'use client'

import { PropsWithChildren, useState } from 'react'
import { NoSSR, useBreakpoint } from 'shared/lib'
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
      <header className="fixed flex items-center justify-between top-0 left-0 lg:left-[256px] right-0 h-16 px-4 space-x-4 border-b bg-background border-zinc-200 dark:border-zinc-700 z-50">
        <SearchModal />
        <NoSSR>
          <Navigation
            cartSlot={<CartModal />}
            openSheet={handleOpen}
            profileCard={<UserProfileCard className="pl-2" />}
          />
        </NoSSR>
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

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const hideSidebar = useBreakpoint('md')

  return (
    <div className="flex flex-col min-h-dvh pl-0 lg:pl-[256px] pt-16">
      <Header />
      {!hideSidebar && (
        <aside className="fixed top-0 left-0 bottom-0 overflow-y-auto border-r border-zinc-200 dark:border-zinc-700 w-[256px] p-4 space-y-4">
          <Logo />
          <AdminNavigation />
        </aside>
      )}
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  )
}
