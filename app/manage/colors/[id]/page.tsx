import { ManageColorUpdatePage } from '_pages/manage'
import { Metadata } from 'next'
import { colorService } from 'shared/api'

async function getColor(id: string) {
  const color = await colorService.getById(id)
  return color
}

export const metadata: Metadata = {
  title: 'Редактирование цвета',
}

export default async function NextManageCategoryUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const color = await getColor(id)

  return <ManageColorUpdatePage color={color} />
}
