import { cartActions, useProductHasInCart } from 'entities/cart'
import { ShoppingBasket } from 'lucide-react'
import { ProductResponse } from 'shared/api'
import { useAppDispatch } from 'shared/lib'
import { Button } from 'shared/ui'

interface IProps {
  product: ProductResponse
  className?: string
}

export const CartAddToCartButton = ({ product, className }: IProps) => {
  const inCart = useProductHasInCart(product.id)
  const dispatch = useAppDispatch()

  const handleToggleToCart = () => {
    const action = inCart
      ? cartActions.removeFromCart(product.id)
      : cartActions.addToCart(product)
    dispatch(action)
  }

  return (
    <Button
      variant={inCart ? 'destructive' : 'default'}
      onClick={handleToggleToCart}
      className={className}
    >
      <ShoppingBasket />
      {inCart ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  )
}
