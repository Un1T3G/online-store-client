import * as yup from 'yup'

export const authLoginFormSchema = yup.object().shape({
  email: yup.string().email('Некорректная почта').required('Почта обязательно'),
  password: yup.string().required('Пароль обязательно'),
})

export const authRegisterFormSchema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().email('Некорректная почта').required('Почта обязательно'),
  password: yup
    .string()
    .min(8, 'Минимум 8 символов')
    .required('Пароль обязательно'),
  avatarUrl: yup.string().optional(),
})
