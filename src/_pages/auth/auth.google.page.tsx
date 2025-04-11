'use client'

import { sessionActions } from 'entities/session'
import { useUserProfileQuery } from 'entities/users'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { authTokenService } from 'shared/api'
import { routes } from 'shared/config'
import { useAppDispatch } from 'shared/lib'

export const GoggleAuthPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { data: user, isLoading } = useUserProfileQuery()

  useEffect(() => {
    const accessToken = searchParams?.get('access_token')
    const refreshToken = searchParams?.get('refresh_token')

    if (!accessToken || !refreshToken) {
      return
    }

    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }

    authTokenService.setTokens(tokens)

    if (isLoading) {
      return
    }

    dispatch(sessionActions.setIsAuth(true))

    const redirectUrl = user?.address ? routes.home : routes.profile
    router.push(redirectUrl)
  }, [user, isLoading, pathname, searchParams])

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  )
}
