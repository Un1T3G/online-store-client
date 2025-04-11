'use client'

import { useAuthLoginMutation } from 'entities/auth'
import { sessionActions } from 'entities/session'
import { useFormik } from 'formik'
import { Lock, LogIn, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import {
  AuthLoginDto,
  authLoginFormSchema,
  authTokenService,
  errorCatch,
} from 'shared/api'
import { routes } from 'shared/config'
import { sleep, useAppDispatch } from 'shared/lib'
import { Button, FormField, InputWithLeadingIcon } from 'shared/ui'
import { toast } from 'sonner'

const initialValues: AuthLoginDto = {
  email: '',
  password: '',
}

interface IProps {
  linkSlot?: ReactNode
}

export const AuthLoginForm = ({ linkSlot }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { mutate } = useAuthLoginMutation({
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

  const formik = useFormik<AuthLoginDto>({
    initialValues,
    onSubmit: (values) => {
      mutate(values)
    },
    validationSchema: authLoginFormSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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
        Войти
      </Button>
    </form>
  )
}
