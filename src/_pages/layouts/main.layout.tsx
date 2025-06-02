'use client'

import { ProductCard } from 'entities/products'
import { Bot } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'
import { NoSSR } from 'shared/lib'
import { Button, Container } from 'shared/ui'
import { AIbotChatModal } from 'widgets/ai-bot'
import { AuthorCard } from 'widgets/author-card'
import { CartModal } from 'widgets/cart-modal'
import {
  AdminNavigation,
  Footer,
  Logo,
  MobileSheet,
  Navigation,
} from 'widgets/layout'
import { ProductGrid, SearchModal } from 'widgets/products'
import { UserProfileCard } from 'widgets/users'

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const handleOpenChatbot = () => {
    setChatbotOpen(true)
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
              openSheet={handleOpenDrawer}
              profileCard={<UserProfileCard className="pl-2" />}
            />
          </NoSSR>
        </Container>
      </header>
      <NoSSR>
        <MobileSheet
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          logoSlot={<Logo alwaysShow={true} />}
          cartSlot={<CartModal />}
          profileSlot={<UserProfileCard className="pl-2" />}
          adminNavigationSlot={<AdminNavigation />}
          footerSlot={<AuthorCard />}
        />
        <Button
          className="fixed bottom-4 right-4 z-10"
          size="icon"
          onClick={handleOpenChatbot}
        >
          <Bot />
        </Button>
        <AIbotChatModal
          open={chatbotOpen}
          onOpenChange={setChatbotOpen}
          renderProductGrid={(products) => (
            <ProductGrid
              isChatbotGrid={true}
              products={products}
              className="my-2 bg-slate-100 p-2 rounded-lg"
              renderProduct={(product) => (
                <ProductCard key={product.id} product={product} />
              )}
            />
          )}
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
