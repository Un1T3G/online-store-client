import { ReactNode } from 'react'
import { ProductResponse } from 'shared/api'
import { cn } from 'shared/lib'

interface IProps {
  products: ProductResponse[]
  renderProduct: (product: ProductResponse) => ReactNode
  className?: string
}

export const ProductGrid = ({ products, renderProduct, className }: IProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
    >
      {products.map(renderProduct)}
    </div>
  )
}
