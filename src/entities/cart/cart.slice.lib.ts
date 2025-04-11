import { useMemo } from 'react'
import { useAppSelector } from 'shared/lib'

export const useProductHasInCart = (productId: string) => {
  const cartItems = useAppSelector((state) => state.cartReducer.items)
  return useMemo(
    () => cartItems.some((item) => item.product.id === productId),
    [cartItems, productId]
  )
}
