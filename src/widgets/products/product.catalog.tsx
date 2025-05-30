import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { PaginationResult, ProductResponse } from 'shared/api'
import { PRODUCT_PER_PAGE } from 'shared/config'
import { arrayRange, cn } from 'shared/lib'
import {
  Container,
  ErrorCard,
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Skeleton,
} from 'shared/ui'

interface IProps {
  page: number
  products: PaginationResult<ProductResponse>
  isLoading: boolean
  isError: boolean
  error?: Error | null
  renderGrid: (products: ProductResponse[]) => ReactNode
  className?: string
}

export const ProductCatalog = ({
  page,
  products,
  isLoading,
  isError,
  error,
  renderGrid,
  className,
}: IProps) => {
  const router = useRouter()
  const totalPages = Math.ceil(products.meta.total / PRODUCT_PER_PAGE)

  if (isError) {
    return <ErrorCard error={error} />
  }

  if (isLoading) {
    return (
      <Container>
        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4',
            className
          )}
        >
          {arrayRange(PRODUCT_PER_PAGE).map((x) => (
            <Skeleton key={x} className="rounded-lg h-0 pb-[100%]" />
          ))}
        </div>
      </Container>
    )
  }

  if (products.data.length === 0) {
    return (
      <Container>
        <p className="text-sm text-muted-foreground">Продукты не найдены</p>
      </Container>
    )
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      router.push(`/catalog?page=${page - 1}`)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      router.push(`/catalog?page=${page + 1}`)
    }
  }

  return (
    <>
      <Container className={className}>{renderGrid(products.data)}</Container>
      <Pagination className="mt-8">
        <PaginationPrevious onClick={handlePreviousPage} />
        {arrayRange(totalPages).map((x) => (
          <PaginationLink
            key={x}
            isActive={x + 1 === page}
            onClick={() => router.push(`/catalog?page=${x + 1}`)}
          >
            {x + 1}
          </PaginationLink>
        ))}
        <PaginationNext onClick={handleNextPage} />
      </Pagination>
    </>
  )
}
