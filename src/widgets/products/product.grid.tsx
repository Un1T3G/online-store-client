import { ReactNode } from 'react'
import { ProductResponse } from 'shared/api'
import { cn } from 'shared/lib'

interface IProps {
  isChatbotGrid?: boolean
  products: ProductResponse[]
  renderProduct: (product: ProductResponse) => ReactNode
  className?: string
}

export const ProductGrid = ({
  isChatbotGrid = false,
  products,
  renderProduct,
  className,
}: IProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4',
        isChatbotGrid && 'md:grid-cols-2 xl:grid-cols-2',
        className
      )}
    >
      {products.map(renderProduct)}
    </div>
  )
}
