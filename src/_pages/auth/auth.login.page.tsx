import { AuthGoogleButton, AuthLoginForm } from 'features/auth'
import Link from 'next/link'
import { routes } from 'shared/config'
import { Card, Container } from 'shared/ui'
import { AuthorCard } from 'widgets/author-card'

export const AuthLoginPage = () => {
  return (
    <Container className="flex-1 flex flex-col items-center justify-center">
      <div className="space-y-4">
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
        <AuthorCard />
      </div>
    </Container>
  )
}
