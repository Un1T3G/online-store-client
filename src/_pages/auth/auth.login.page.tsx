import { AuthGoogleButton, AuthLoginForm } from 'features/auth'
import Link from 'next/link'
import { routes } from 'shared/config'
import { Card, Container } from 'shared/ui'

export const AuthLoginPage = () => {
  return (
    <Container className="flex-1 flex items-center justify-center">
      <Card className="max-w-sm w-full p-4 gap-0">
        <h1 className="text-xl font-bold mb-4">Авторизация</h1>
        <AuthLoginForm
          linkSlot={
            <p className="text-center text-sm">
              У вас нет аккаунта?{' '}
              <Link href={routes.authRegister} className="text-blue-500">
                Зарегистрируйтесь
              </Link>
            </p>
          }
        />
        <AuthGoogleButton className="mt-2" />
      </Card>
    </Container>
  )
}
