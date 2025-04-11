import * as yup from 'yup'

export const reviewCreateFormSchema = yup.object().shape({
  text: yup.string().required('Текст обязателен'),
  rating: yup.number().required('Рейтинг обязателен'),
})
