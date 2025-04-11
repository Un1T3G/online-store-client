import { ColorCreateForm } from 'features/color'
import { Card } from 'shared/ui'

export const ManageColorCreatePage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Создание цвета</h1>
      <Card className="p-4 w-full">
        <ColorCreateForm />
      </Card>
    </div>
  )
}
