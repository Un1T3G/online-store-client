'use client'

import { useProductsQuery } from 'entities/products'
import { useSearchParams } from 'next/navigation'
import { PaginationResult, ProductResponse } from 'shared/api'
import { Container } from 'shared/ui'
import { ProductCatalog, ProductGrid, ProductItem } from 'widgets/products'

interface IProps {
  products: PaginationResult<ProductResponse>
}

export const CatalogPage = ({ products }: IProps) => {
  const params = useSearchParams()
  const page = Number(params.get('page') || 1)
  const searchTerm = params.get('searchTerm') || ''
  const { data, isLoading, error, isError } = useProductsQuery(
    {
      initialData: products,
    },
    {
      page,
      searchTerm,
    }
  )

  return (
    <div className="flex-1 flex flex-col py-4">
      <Container className="mb-8">
        <h1 className="text-2xl font-bold mb-4">
          {searchTerm ? `По запросу "${searchTerm}"` : 'Каталог'}
        </h1>
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
