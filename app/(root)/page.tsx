import { HomePage } from '_pages/home'
import {
  CategoryResponse,
  ProductResponse,
  categoryService,
  productService,
} from 'shared/api'
import { routes } from 'shared/config'

export const revalidate = 0

async function getMostPopular() {
  const products = await productService.getMostPopular({ page: 1, perPage: 7 })
  return {
    title: 'Хиты продаж',
    description: 'Самые популярные товары нашего магазина',
    link: routes.catalog,
    products: products.data,
  }
}

async function getCategories() {
  const categories = await categoryService.getAll({ page: 1, perPage: 9999 })
  return categories.data
}

async function getByCategories(categories: CategoryResponse[]) {
  const products = await Promise.all(
    categories.map((category) =>
      productService.getByCategory(category.id, { page: 1, perPage: 7 })
    )
  )

  return categories.map((category, index) => ({
    title: category.title,
    description: category.description,
    link: routes.categoryDetail(category.id),
    products: products[index].data,
  }))
}

function filter(
  arr: {
    title: string
    description: string
    link: string
    products: ProductResponse[]
  }[]
) {
  return arr.filter((x) => x.products.length > 0)
}

export default async function NextHomePage() {
  const [mostPopular, categories] = await Promise.all([
    getMostPopular(),
    getCategories(),
  ])
  const byCategories = await getByCategories(categories)

  return <HomePage data={filter([mostPopular, ...byCategories])} />
}
