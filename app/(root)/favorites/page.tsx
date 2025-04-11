import { FavoritesPage } from '_pages/favorites'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ACCESS_TOKEN_KEY, productService } from 'shared/api'
import { PRODUCT_PER_PAGE } from 'shared/config'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Избранное',
}

async function getProducts(page: number) {
  const cookie = await cookies()
  const accessToken = cookie.get(ACCESS_TOKEN_KEY)?.value

  const products = await productService.getFavorites(
    {
      page,
      perPage: PRODUCT_PER_PAGE,
    },
    accessToken
  )

  return products
}

export default async function NextFavoritesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const products = await getProducts(Number(params['page'] || 1))

  return <FavoritesPage products={products} />
}
