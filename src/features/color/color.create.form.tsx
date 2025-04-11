'use client'

import { useColorCreateMutation } from 'entities/color'
import { useFormik } from 'formik'
import { FilePlus, Notebook, Palette } from 'lucide-react'
import { ColorDto, colorFormSchema, errorCatch } from 'shared/api'
import { FormField, InputWithLeadingIcon, LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

const initialValues: ColorDto = {
  name: '',
  value: '#FFFFFF',
}

export const ColorCreateForm = () => {
  const { mutate, isPending } = useColorCreateMutation({
    onSuccess: () => {
      toast.success('Цвет успешно создана')
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
        <FilePlus />
        Создать
      </LoadingButton>
    </form>
  )
}
