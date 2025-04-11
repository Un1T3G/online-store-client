import { ManageProductUpdatePage } from '_pages/manage'
import { Metadata } from 'next'
import { categoryService, colorService, productService } from 'shared/api'

async function getProduct(id: string) {
  const product = await productService.getById(id)
  return product
}

async function getColors() {
  const colors = await colorService.getAll({ perPage: 9999 })
  return colors.data
}

async function getCategories() {
  const categories = await categoryService.getAll({ perPage: 9999 })
  return categories.data
}

export const metadata: Metadata = {
  title: 'Редактирование товара',
}

export default async function NextManageCategoryUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, colors, categories] = await Promise.all([
    getProduct(id),
    getColors(),
    getCategories(),
  ])

  return (
    <ManageProductUpdatePage
      product={product}
      colors={colors}
      categories={categories}
    />
  )
}
