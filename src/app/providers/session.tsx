import { sessionActions } from 'entities/session'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { AuthEvents, authTokenService } from 'shared/api'
import { IS_CLIENT, routes } from 'shared/config'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { toast } from 'sonner'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const isAuthRef = useRef(false)
  const isAuth = useAppSelector((state) => state.sessionReducer.isAuth)

  isAuthRef.current = isAuth

  useEffect(() => {
    const handleTokensExpired = () => {
      authTokenService.removeTokens()
      dispatch(sessionActions.setIsAuth(false))
      toast.error('Время сессии истекло. Пожалуйста, войдите заново.')
    }

    const handleTokenRefresh = () => {
      if (!isAuthRef.current) {
        toast.success('Токены успешно обновлены.')
      }
    }

    document.addEventListener(
      AuthEvents.onTokensExpired.type,
      handleTokensExpired
    )
    document.addEventListener(
      AuthEvents.onRefreshTokens.type,
      handleTokenRefresh
    )

    return () => {
      document.removeEventListener(
        AuthEvents.onTokensExpired.type,
        handleTokensExpired
      )
      document.removeEventListener(
        AuthEvents.onRefreshTokens.type,
        handleTokenRefresh
      )
    }
  }, [isAuthRef])

  useEffect(() => {
    const accessToken = authTokenService.getAccessToken()
    const isAuthRoute = pathname?.includes('auth')

    if (!accessToken && isAuth && IS_CLIENT) {
      dispatch(sessionActions.setIsAuth(false))
      if (!isAuthRoute) {
        router.push(routes.authLogin)
      }
    }
  }, [isAuth, router, pathname])

  return children
}
