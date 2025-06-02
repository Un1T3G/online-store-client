import { useQueryClient } from '@tanstack/react-query'
import { useUserUpdateAddressMutation, userKeys } from 'entities/users'
import { useFormik } from 'formik'
import { Building2, MapPinHouse, Package, Save } from 'lucide-react'
import {
  UserAddressUpdateDto,
  errorCatch,
  userUpdateAddressFormSchema,
} from 'shared/api'
import { Button, FormField, InputWithLeadingIcon } from 'shared/ui'
import { toast } from 'sonner'

const defaultInitialValues: UserAddressUpdateDto = {
  address: '',
  city: '',
  state: '',
  zipCode: '',
}

interface IProps {
  initialValues?: UserAddressUpdateDto | null
}

export const UserUpdateAddressForm = ({ initialValues }: IProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useUserUpdateAddressMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile })
      toast.success('Адрес успешно обновлен')
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const formik = useFormik({
    initialValues: initialValues ?? defaultInitialValues,
    onSubmit: (values) => {
      mutate(values)
    },
    validationSchema: userUpdateAddressFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        name="address"
        label="Адрес"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={MapPinHouse}
            placeholder="Жипек жолы"
            {...props}
          />
        )}
      />
      <FormField
        formik={formik}
        name="state"
        label="Штат"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Building2}
            placeholder="Каракалпакстан"
            {...props}
          />
        )}
      />
      <FormField
        formik={formik}
        name="city"
        label="Город"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Building2}
            placeholder="Чимбай"
            {...props}
          />
        )}
      />
      <FormField
        formik={formik}
        name="zipCode"
        label="Почтовый индекс"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Package}
            placeholder="231406"
            {...props}
          />
        )}
      />
      <Button type="submit" className="w-full">
        <Save />
        Сохранить
      </Button>
    </form>
  )
}
