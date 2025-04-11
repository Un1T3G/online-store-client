import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { routes } from 'shared/config'
import { cn } from 'shared/lib'

interface IProps {
  alwaysShow?: boolean
}

export const Logo = ({ alwaysShow = false }: IProps) => {
  return (
    <Link
      href={routes.home}
      className={cn(
        'hidden md:flex items-center space-x-2 text-blue-500 font-mono',
        alwaysShow && 'flex'
      )}
    >
      <ShoppingBag />
      <h1 className="text-xl font-bold font-mono tracking-[-1px] w-[110px]">
        Fake-Store
      </h1>
    </Link>
  )
}
