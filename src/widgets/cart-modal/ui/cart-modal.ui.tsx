'use client'

import { cartActions } from 'entities/cart'
import { formatPrice } from 'entities/products'
import { OrderCreateButton } from 'features/orders'
import { Minus, Plus, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import {
  Button,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from 'shared/ui'

export const CartModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="justify-start lg:justify-center" variant="secondary">
          <ShoppingBasket />
          Корзина
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 gap-0 overflow-y-auto">
        <Content />
      </SheetContent>
    </Sheet>
  )
}

const Content = () => {
  const { items, totalCost } = useAppSelector((state) => state.cartReducer)
  const dispatch = useAppDispatch()

  const increaseQuantity = (index: number) => {
    dispatch(cartActions.incrementQuantity(index))
  }

  const decreaseQuantity = (index: number) => {
    const action =
      items[index].quantity === 1
        ? cartActions.removeFromCart(items[index].product.id)
        : cartActions.decrementQuantity(index)
    dispatch(action)
  }

  return (
    <div className="flex flex-col">
      <SheetTitle className="text-2xl mb-4">
        {items.length > 0
          ? `Корзина товаров (${items.length})`
          : 'Корзина товаров'}
      </SheetTitle>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.product.id} className="flex items-center space-x-4">
            <div className="relative w-[140px] h-[140px] rounded-lg bg-zinc-200 overflow-hidden">
              <Image
                src={item.product.images[0]}
                alt={item.product.title}
                fill
                className="object-cover top-0 left-0"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-base font-semibold">{item.product.title}</h1>
              <span className="block text-sm text-muted-foreground">
                {formatPrice(item.product.price)}
              </span>
              <div className="flex">
                <Button size="icon" onClick={() => decreaseQuantity(index)}>
                  <Minus />
                </Button>
                <span className="w-9 h-9 flex items-center justify-center">
                  {item.quantity}
                </span>
                <Button size="icon" onClick={() => increaseQuantity(index)}>
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="mt-4">
          <div className="text-base mb-2">
            Итоговая сумма: {formatPrice(totalCost)}
          </div>
          <OrderCreateButton className="w-full" />
        </div>
      )}
    </div>
  )
}
