'use client'

import { useProductsByCategoryQuery } from 'entities/products'
import { useSearchParams } from 'next/navigation'
import { CategoryResponse, PaginationResult, ProductResponse } from 'shared/api'
import { Container } from 'shared/ui'
import { ProductCatalog, ProductGrid, ProductItem } from 'widgets/products'

interface IProps {
  category: CategoryResponse
  products: PaginationResult<ProductResponse>
}

export const CatalogByCategoryPage = ({ category, products }: IProps) => {
  const params = useSearchParams()
  const page = Number(params.get('page') || 1)
  const { data, isLoading, error, isError } = useProductsByCategoryQuery(
    category.id,
    {
      initialData: products,
    },
    {
      page,
    }
  )

  return (
    <div className="flex-1 flex flex-col py-4">
      <Container className="mb-8">
        <h1 className="text-2xl font-bold">{category.title}</h1>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </Container>
      <ProductCatalog
        page={page}
        products={data!}
        isLoading={isLoading}
        isError={isError}
        error={error}
        className="flex-1"
        renderGrid={(products) => (
          <ProductGrid
            products={products}
            renderProduct={(product) => (
              <ProductItem key={product.id} product={product} />
            )}
          />
        )}
      />
    </div>
  )
}
