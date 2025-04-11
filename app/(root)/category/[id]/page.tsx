import { CatalogByCategoryPage } from '_pages/catalog-by-category'
import { Metadata } from 'next'
import { categoryService, productService } from 'shared/api'
import { PRODUCT_PER_PAGE } from 'shared/config'

export const metadata: Metadata = {
  title: 'Каталог',
}

async function getCategory(id: string) {
  const category = await categoryService.getById(id)
  return category
}

async function getProductsByCategory(id: string, page: number) {
  const products = await productService.getByCategory(id, {
    page,
    perPage: PRODUCT_PER_PAGE,
  })

  return products
}

export default async function NextCatalogByCateogryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<Record<string, string>>
}) {
  const { id } = await params
  const queryParams = await searchParams
  const [category, products] = await Promise.all([
    getCategory(id),
    getProductsByCategory(id, Number(queryParams['page'] || 1)),
  ])

  return <CatalogByCategoryPage category={category} products={products} />
}
