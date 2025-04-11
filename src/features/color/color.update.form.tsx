'use client'

import { useColorUpdateMutation } from 'entities/color'
import { useFormik } from 'formik'
import { Notebook, Palette, Save } from 'lucide-react'
import { ColorDto, colorFormSchema, errorCatch } from 'shared/api'
import { FormField, InputWithLeadingIcon, LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  initialValues: ColorDto
}

export const ColorUpdateForm = ({ id, initialValues }: IProps) => {
  const { mutate, isPending } = useColorUpdateMutation(id, {
    onSuccess: () => {
      toast.success('Цвет успешно обновлена')
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
    validationSchema: colorFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        name="name"
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
        name="value"
        label="Цвет"
        className="mb-4"
        renderField={(props) => (
          <InputWithLeadingIcon icon={Palette} placeholder="Цвет" {...props} />
        )}
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
