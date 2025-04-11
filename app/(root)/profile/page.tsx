import { ProfilePage } from '_pages/profile'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ACCESS_TOKEN_KEY, userService } from 'shared/api'
import { routes } from 'shared/config'

async function getProfile() {
  const cookie = await cookies()
  const accessToken = cookie.get(ACCESS_TOKEN_KEY)?.value

  if (!accessToken) {
    redirect(routes.authLogin)
  }

  try {
    const user = await userService.getProfile(accessToken)
    return user
  } catch (error) {
    redirect(routes.authLogin)
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const user = await getProfile()

  return { title: `Профиль | ${user.name}` }
}

export default async function Page() {
  const user = await getProfile()

  return <ProfilePage user={user} />
}
