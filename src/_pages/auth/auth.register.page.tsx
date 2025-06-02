'use client'

import { AuthGoogleButton, AuthRegisterForm } from 'features/auth'
import { FileAvatarUpload } from 'features/files'
import Link from 'next/link'
import { routes } from 'shared/config'
import { Card, Container } from 'shared/ui'

export const AuthRegisterPage = () => {
  return (
    <Container className="flex-1 flex items-center justify-center">
      <Card className="max-w-sm w-full p-4 gap-0">
        <h1 className="text-xl font-bold mb-4">Регистрация</h1>
        <AuthRegisterForm
          linkSlot={
            <p className="text-center text-sm">
              У вас уже есть аккаунт?{' '}
              <Link href={routes.authLogin} className="text-blue-500">
                Авторизация
              </Link>
            </p>
          }
          renderImageUpload={(props) => <FileAvatarUpload {...props} />}
        />
        <AuthGoogleButton className="mt-2" />
      </Card>
    </Container>
  )
}
