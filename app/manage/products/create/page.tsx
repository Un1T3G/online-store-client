import { ManageProductCreatePage } from '_pages/manage'
import { Metadata } from 'next'
import { categoryService, colorService } from 'shared/api'

async function getColors() {
  const colors = await colorService.getAll({
    page: 1,
    perPage: 9999,
  })
  return colors.data
}

export const metadata: Metadata = {
  title: 'Создание товара',
}

async function getCategories() {
  const categories = await categoryService.getAll({
    page: 1,
    perPage: 9999,
  })
  return categories.data
}

export default async function NextManageProductCreatePage() {
  const [colors, categories] = await Promise.all([getColors(), getCategories()])

  return <ManageProductCreatePage colors={colors} categories={categories} />
}
