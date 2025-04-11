import * as yup from 'yup'

export const userUpdateProfileFormSchema = yup.object().shape({
  name: yup.string().optional(),
  avatarUrl: yup.string().optional(),
})

export const userUpdateAddressFormSchema = yup.object().shape({
  city: yup.string().required('Город обязательно'),
  address: yup.string().required('Адрес обязательно'),
  state: yup.string().required('Штат обязательно'),
  zipCode: yup.string().required('Почтовый индекс обязательно'),
})
