import { CategoryUpdateForm } from 'features/category'
import { CategoryResponse } from 'shared/api'
import { Card } from 'shared/ui'

interface IProps {
  category: CategoryResponse
}

export const ManageCategoryUpdatePage = ({ category }: IProps) => {
  const initialValues = {
    title: category.title,
    description: category.description,
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Редактирование категории</h1>
      <Card className="p-4 w-full">
        <CategoryUpdateForm id={category.id} initialValues={initialValues} />
      </Card>
    </div>
  )
}
