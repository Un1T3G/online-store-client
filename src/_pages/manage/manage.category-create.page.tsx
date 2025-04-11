import { CategoryCreateForm } from 'features/category'
import { Card } from 'shared/ui'

export const ManageCategoryCreatePage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Создание категории</h1>
      <Card className="p-4 w-full">
        <CategoryCreateForm />
      </Card>
    </div>
  )
}
