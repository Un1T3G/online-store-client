import { ProductCard } from 'entities/products'
import { CartAddToCartButton } from 'features/cart'
import { ProductResponse } from 'shared/api'

interface IProps {
  product: ProductResponse
}

export const ProductItem = ({ product }: IProps) => {
  return (
    <ProductCard
      product={product}
      renderFooterAction={
        <CartAddToCartButton product={product} className="w-full mt-2" />
      }
    />
  )
}
