'use client'

import { useAuthRegisterMutation } from 'entities/auth'
import { sessionActions } from 'entities/session'
import { useFormik } from 'formik'
import { Lock, LogIn, Mail, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import {
  AuthRegisterDto,
  authRegisterFormSchema,
  authTokenService,
  errorCatch,
} from 'shared/api'
import { routes } from 'shared/config'
import { sleep, useAppDispatch } from 'shared/lib'
import { Button, FormField, InputWithLeadingIcon } from 'shared/ui'
import { toast } from 'sonner'

const initialValues: AuthRegisterDto = {
  name: '',
  email: '',
  password: '',
  avatarUrl: '',
}

interface IProps {
  linkSlot?: ReactNode
  renderImageUpload: (props: {
    src: string
    onChangeSrc: (newSrc: string) => void
  }) => ReactNode
}

export const AuthRegisterForm = ({ linkSlot, renderImageUpload }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { mutate } = useAuthRegisterMutation({
    onSuccess: async (data) => {
      toast.success('Добро пожаловать!')
      authTokenService.setTokens(data)
      dispatch(sessionActions.setIsAuth(true))
      await sleep(500)
      router.push(routes.home)
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const formik = useFormik<AuthRegisterDto>({
    initialValues,
    onSubmit: (values) => {
      mutate(values)
    },
    validationSchema: authRegisterFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        name="name"
        label="Имя"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon icon={User} placeholder="Имя" {...props} />
        )}
      />
      <FormField
        formik={formik}
        name="avatarUrl"
        label="Аватар"
        className="mb-2"
        renderField={(props) =>
          renderImageUpload({ src: props.value, onChangeSrc: props.onChange })
        }
      />
      <FormField
        formik={formik}
        name="email"
        label="Электронная почта"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Mail}
            placeholder="Электронная почта"
            {...props}
          />
        )}
      />
      <FormField
        formik={formik}
        name="password"
        label="Пароль"
        className="mb-2"
        renderField={(props) => (
          <InputWithLeadingIcon
            icon={Lock}
            placeholder="Пароль"
            type="password"
            {...props}
          />
        )}
      />
      {linkSlot}
      <Button type="submit" className="w-full mt-4">
        <LogIn />
        Зарегистрироваться
      </Button>
    </form>
  )
}
