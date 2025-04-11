import * as yup from 'yup'

export const categoryFormSchema = yup.object().shape({
  title: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
})
