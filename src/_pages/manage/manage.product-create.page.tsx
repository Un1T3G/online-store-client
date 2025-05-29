'use client'

import { AIbotGenerateProductAttributesButton } from 'features/ai-bot'
import { FileMultiImageUpload } from 'features/files'
import { ProductCreateForm } from 'features/products'
import { CategoryResponse, ColorResponse } from 'shared/api'
import { Card } from 'shared/ui'

interface IProps {
  colors: ColorResponse[]
  categories: CategoryResponse[]
}

export const ManageProductCreatePage = ({ colors, categories }: IProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Создание товара</h1>
      <Card className="p-4 w-full">
        <ProductCreateForm
          colors={colors}
          categories={categories}
          renderMultiUpdateImage={(props) => (
            <FileMultiImageUpload {...props} />
          )}
          renderGenerateAttributesButton={(props) => (
            <AIbotGenerateProductAttributesButton
              onSuccess={(response) => {
                props.setValue('attributes', response)
              }}
              productTitle={props.productTitle}
            />
          )}
        />
      </Card>
    </div>
  )
}
