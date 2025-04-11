import { ColorUpdateForm } from 'features/color'
import { ColorResponse } from 'shared/api'
import { Card } from 'shared/ui'

interface IProps {
  color: ColorResponse
}

export const ManageColorUpdatePage = ({ color }: IProps) => {
  const initialValues = {
    name: color.name,
    value: color.value,
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Редактирование цвета</h1>
      <Card className="p-4 w-full">
        <ColorUpdateForm id={color.id} initialValues={initialValues} />
      </Card>
    </div>
  )
}
