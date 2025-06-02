'use client'

import { FileProductImagesUpload } from 'features/files'
import { ProductUpdateForm } from 'features/products'
import { CategoryResponse, ColorResponse, ProductResponse } from 'shared/api'
import { Card } from 'shared/ui'

interface IProps {
  product: ProductResponse
  colors: ColorResponse[]
  categories: CategoryResponse[]
}

export const ManageProductUpdatePage = ({
  product,
  colors,
  categories,
}: IProps) => {
  const initialValues = {
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images,
    attributes: product.attributes,
    categoryId: product.category.id,
    colorId: product.color.id,
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Редактирование товара</h1>
      <Card className="p-4 w-full">
        <ProductUpdateForm
          id={product.id}
          initialValues={initialValues}
          colors={colors}
          categories={categories}
          renderMultiUpdateImage={(props) => (
            <FileProductImagesUpload {...props} />
          )}
        />
      </Card>
    </div>
  )
}
