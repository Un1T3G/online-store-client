import * as yup from 'yup'

export const colorFormSchema = yup.object().shape({
  name: yup.string().required('Название обязательно'),
  value: yup
    .string()
    .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Некорректный HEX-цвет')
    .required('Цвет обязателен'),
})
