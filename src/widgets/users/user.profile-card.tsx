import { useLogout } from 'entities/session'
import { ProfileRow, useUserProfileQuery } from 'entities/users'
import {
  ChevronDown,
  ChevronUp,
  LogIn,
  LogOut,
  ShoppingCart,
  User,
  UserRoundCog,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { routes } from 'shared/config'
import { cn, useAppSelector } from 'shared/lib'
import {
  Button,
  ErrorCard,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from 'shared/ui'

interface IProps {
  className?: string
}

export const UserProfileCard = ({ className }: IProps) => {
  const { data: user, isLoading, isError, error } = useUserProfileQuery()
  const isAuth = useAppSelector((state) => state.sessionReducer.isAuth)
  const logout = useLogout()
  const [open, setOpen] = useState(false)

  if (!isAuth) {
    return (
      <Button className={className} asChild>
        <Link href={routes.authLogin}>
          <LogIn />
          Войти
        </Link>
      </Button>
    )
  }

  if (isError) {
    return <ErrorCard className={className} error={error} />
  }

  if (isLoading) {
    return (
      <div className={cn('flex space-x-2', className)}>
        <Skeleton className="rounded-lg w-24 h-4" />
        <Skeleton className="rounded-full w-9 h-9" />
      </div>
    )
  }

  const Icon = open ? ChevronUp : ChevronDown

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-1">
          <ProfileRow user={user!} />
          <Icon className="text-sm w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-36 space-y-2 p-2">
        <Button className="w-full justify-start" asChild>
          <Link href={routes.profile}>
            <User />
            Профиль
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href={routes.orders}>
            <ShoppingCart />
            Заказы
          </Link>
        </Button>
        {user?.role === 'ADMIN' && (
          <Button className="w-full justify-start" asChild>
            <Link href={routes.adminStatistics}>
              <UserRoundCog />
              Админка
            </Link>
          </Button>
        )}
        <Button className="w-full justify-start" onClick={logout}>
          <LogOut />
          Вход
        </Button>
      </PopoverContent>
    </Popover>
  )
}
