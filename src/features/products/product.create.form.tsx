import { useProductCreateMutation } from 'entities/products'
import { useFormik } from 'formik'
import { DollarSign, FilePlus, Notebook } from 'lucide-react'

import { ReactNode } from 'react'
import {
  CategoryResponse,
  ColorResponse,
  ProductDto,
  errorCatch,
  productFormSchema,
} from 'shared/api'
import {
  FormAttributesField,
  FormField,
  FormSelect,
  InputWithLeadingIcon,
  Label,
  LoadingButton,
  Textarea,
} from 'shared/ui'
import { toast } from 'sonner'

const initialValues: ProductDto = {
  title: '',
  description: '',
  price: 0,
  images: [],
  attributes: [],
  categoryId: '',
  colorId: '',
}

interface IProps {
  colors: ColorResponse[]
  categories: CategoryResponse[]
  renderMultiUpdateImage: (props: {
    images: string[]
    onChangeImages: (images: string[]) => void
  }) => ReactNode
  renderGenerateAttributesButton: (props: {
    productTitle: string
    setValue: (field: string, value: any) => void
  }) => ReactNode
}

export const ProductCreateForm = ({
  colors,
  categories,
  renderMultiUpdateImage,
  renderGenerateAttributesButton,
}: IProps) => {
  const { mutate, isPending } = useProductCreateMutation({
    onSuccess: () => {
      toast.success('Продукт успешно создан')
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      mutate(values)
    },
    validationSchema: productFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        name="title"
        label="Название"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Notebook}
            placeholder="Название"
            {...props}
          />
        )}
      />
      <FormField
        formik={formik}
        name="description"
        label="Описание"
        className="mb-2"
        renderField={(props) => <Textarea {...props} placeholder="Описание" />}
      />
      <FormField
        formik={formik}
        name="price"
        label="Цена"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={DollarSign}
            placeholder="Цена"
            type="number"
            {...props}
          />
        )}
      />
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between">
          <Label>Атрибуты</Label>
          {renderGenerateAttributesButton({
            productTitle: formik.values.title,
            setValue: formik.setFieldValue,
          })}
        </div>
        <FormAttributesField formik={formik} />
      </div>
      <FormField
        formik={formik}
        name="images"
        label="Изображения"
        className="mb-2"
        renderField={(props) =>
          renderMultiUpdateImage({
            images: props.value,
            onChangeImages: (images) => {
              formik.setFieldValue(props.name, images)
            },
          })
        }
      />
      <FormField
        formik={formik}
        name="categoryId"
        label="Категория"
        className="mb-2"
        renderField={(props) => (
          <FormSelect
            value={props.value}
            setFieldValue={formik.setFieldValue}
            name={props.name}
            options={categories}
            keyField="id"
            valueField="id"
            labelField="title"
            placeholder="Выберите категорию"
            className="w-full"
          />
        )}
      />
      <FormField
        formik={formik}
        name="colorId"
        label="Цвет"
        className="mb-4"
        renderField={(props) => (
          <FormSelect
            value={props.value}
            setFieldValue={formik.setFieldValue}
            name={props.name}
            options={colors}
            keyField="id"
            valueField="id"
            labelField="name"
            placeholder="Выберите цвет"
            className="w-full"
          />
        )}
      />
      <LoadingButton
        loading={isPending}
        type="submit"
        className="w-full md:w-auto"
      >
        <FilePlus />
        Создать
      </LoadingButton>
    </form>
  )
}
