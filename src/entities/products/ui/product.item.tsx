import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { ProductResponse } from 'shared/api'
import { routes } from 'shared/config'
import { formatPrice } from '../product.lib'

interface IProps {
  product: ProductResponse
  renderHeaderAction?: ReactNode
  renderFooterAction?: ReactNode
}

export const ProductCard = ({
  product,
  renderHeaderAction,
  renderFooterAction,
}: IProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={routes.productDetail(product.id)}
        className="relative w-full h-0 pb-[100%] rounded-lg overflow-hidden bg-zinc-200 mb-2"
      >
        <Image src={product.images[0]} alt={product.title} fill />
        {renderHeaderAction}
      </Link>
      <h2 className="text-base font-semibold line-clamp-1 mb-1">
        {product.title}
      </h2>
      <Link
        href={routes.categoryDetail(product.category.id)}
        className="text-base text-muted-foreground mb-1"
      >
        {product.category.title}
      </Link>
      <span className="text-base font-medium text-accent-foreground">
        {formatPrice(product.price)}
      </span>
      {renderFooterAction}
    </div>
  )
}
