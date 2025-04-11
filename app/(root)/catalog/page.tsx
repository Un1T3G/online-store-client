import { CatalogPage } from '_pages/catalog'
import { Metadata } from 'next'
import { productService } from 'shared/api'
import { PRODUCT_PER_PAGE } from 'shared/config'

export const metadata: Metadata = {
  title: 'Каталог',
}

export const revalidate = 0

async function getProducts(page: number, searchTerm?: string | null) {
  const products = await productService.getAll({
    page,
    perPage: PRODUCT_PER_PAGE,
    searchTerm: searchTerm || '',
  })

  return products
}

export default async function NextCatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const products = await getProducts(
    Number(params['page'] || 1),
    params['searchTerm'] || null
  )
  return <CatalogPage products={products} />
}
