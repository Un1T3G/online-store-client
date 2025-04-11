import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { authTokenService } from 'shared/api'
import { routes } from 'shared/config'
import { useAppDispatch } from 'shared/lib'
import { sessionActions } from './session.slice.model'

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  return useCallback(() => {
    authTokenService.removeTokens()
    dispatch(sessionActions.setIsAuth(false))
    router.push(routes.authLogin)
  }, [])
}
