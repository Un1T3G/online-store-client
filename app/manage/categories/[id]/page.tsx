import { ManageCategoryUpdatePage } from '_pages/manage'
import { Metadata } from 'next'
import { categoryService } from 'shared/api'

async function getCategory(id: string) {
  const category = await categoryService.getById(id)
  return category
}

export const metadata: Metadata = {
  title: 'Редактирование категории',
}

export default async function NextManageCategoryUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const category = await getCategory(id)

  return <ManageCategoryUpdatePage category={category} />
}
