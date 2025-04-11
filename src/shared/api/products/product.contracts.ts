import * as yup from 'yup'

export const productFormSchema = yup.object().shape({
  title: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  price: yup.number().required('Цена обязательна'),
  images: yup
    .array()
    .of(yup.string())
    .min(1, 'Хотя бы одно фото обязательно')
    .required('Фото обязательно'),
  attributes: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required('Название атрибута обязательно'),
        value: yup.string().required('Значение атрибута обязательно'),
      })
    )
    .min(1, 'Хотя бы один атрибут обязателен')
    .required('Атрибуты обязательны'),
  categoryId: yup.string().required('Категория обязательна'),
  colorId: yup.string().required('Цвет обязательно'),
})
