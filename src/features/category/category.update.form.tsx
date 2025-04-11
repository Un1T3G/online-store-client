'use client'

import { useCategoryUpdateMutation } from 'entities/category'
import { useFormik } from 'formik'
import { Notebook, Save } from 'lucide-react'
import { CategoryDto, categoryFormSchema, errorCatch } from 'shared/api'
import {
  FormField,
  InputWithLeadingIcon,
  LoadingButton,
  Textarea,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  initialValues: CategoryDto
}

export const CategoryUpdateForm = ({ id, initialValues }: IProps) => {
  const { mutate, isPending } = useCategoryUpdateMutation(id, {
    onSuccess: () => {
      toast.success('Категория успешно обновлена')
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
    validationSchema: categoryFormSchema,
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
        className="mb-4"
        renderField={(props) => <Textarea {...props} placeholder="Описание" />}
      />
      <LoadingButton
        loading={isPending}
        type="submit"
        className="w-full md:w-auto"
      >
        <Save />
        Сохранить
      </LoadingButton>
    </form>
  )
}
