import Image from 'next/image'
import { UserResponse } from 'shared/api'
import { cn } from 'shared/lib'

interface IProps {
  user: UserResponse
  className?: string
}

export const ProfileRow = ({ user, className }: IProps) => {
  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <span className="text-sm">{user.name}</span>
      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-300">
        <Image
          alt={user.name}
          src={user.avatarUrl}
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
