'use client'

import { useRouter } from 'next/navigation'
import { cn } from 'shared/lib'
import { Button } from 'shared/ui'

interface IProps {
  className?: string
}

export const AuthGoogleButton = ({ className }: IProps) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`${process.env.SERVER_URL}/api/auth/google`)
  }

  return (
    <Button
      className={cn('w-full', className)}
      onClick={handleOnClick}
      type="button"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 488 512"
        height="200px"
        width="200px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
      </svg>
      Google
    </Button>
  )
}
