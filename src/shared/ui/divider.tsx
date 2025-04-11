import { cn } from 'shared/lib'

interface IProps {
  className?: string
}

export const Divider = ({ className }: IProps) => {
  return (
    <div
      className={cn('w-full h-[1px] bg-gray-200 dark:bg-gray-700', className)}
    />
  )
}
