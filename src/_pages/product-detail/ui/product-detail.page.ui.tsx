'use client'

import { formatPrice } from 'entities/products'
import { calculateAverageRating } from 'entities/reviews'
import { CartAddToCartButton } from 'features/cart'
import { UserToggleFavoriteButton } from 'features/users'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { ProductResponse } from 'shared/api'
import { routes } from 'shared/config'
import { Container, Divider } from 'shared/ui'
import { ProductAttributes } from './product-attributes'
import { ProductImages } from './product-images'
import { ProductReviews } from './product-reviews'
import { ProductSimilarProducts } from './product-similar-products'

interface IPpops {
  product: ProductResponse
  similarProducts: ProductResponse[]
}

export const ProductDetailPage = ({ product, similarProducts }: IPpops) => {
  return (
    <div className="py-4">
      <Container>
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-[400px] grow-0 shrink-0 xl:flex-6">
            <ProductImages images={product.images} />
          </div>
          <div className="flex-8">
            <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
            <span className="block text-xl mb-4">
              Цена: {formatPrice(product.price)}
            </span>
            <Divider className="mb-4" />
            <p className="text-base text-muted-foreground mb-4">
              {product.description}
            </p>
            <Divider className="mb-4" />
            <div className="flex items-center space-x-2 mb-1">
              <span>Цвет:</span>
              <div
                style={{ backgroundColor: product.color.value }}
                className="w-6 h-6 rounded-full"
              />
            </div>
            <div className="flex space-x-2 mb-1">
              <span>Категории:</span>
              <Link
                href={routes.categoryDetail(product.category.id)}
                className="text-blue-500"
              >
                {product.category.title}
              </Link>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <span>Средний рейтинг:</span>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{`${calculateAverageRating(product.reviews)} | ${
                  product.reviews.length
                }`}</span>
              </div>
            </div>
            <Divider className="mb-4" />
            <ProductAttributes attributes={product.attributes} />
            <div className="flex space-x-2">
              <CartAddToCartButton product={product} className="flex-1" />
              <UserToggleFavoriteButton productId={product.id} />
            </div>
          </div>
        </div>
        <ProductSimilarProducts similarProducts={similarProducts} />
        <ProductReviews id={product.id} reviews={product.reviews} />
      </Container>
    </div>
  )
}
