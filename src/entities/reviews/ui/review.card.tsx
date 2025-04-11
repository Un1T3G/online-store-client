import { Star } from 'lucide-react'
import Image from 'next/image'
import { ReviewResponse } from 'shared/api'
import { arrayRange, cn } from 'shared/lib'
import { Card } from 'shared/ui'

interface IProps {
  review: ReviewResponse
  className?: string
}

export const ReviewCard = ({ review, className }: IProps) => {
  return (
    <Card className={cn('p-4 space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-9 h-9 rounded-full overflow-hidden">
            <Image
              src={review.user.avatarUrl}
              alt={review.user.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold">{review.user.name}</span>
        </div>
        <div className="flex space-x-1">
          {arrayRange(5).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                review.rating > i ? 'text-yellow-400' : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-base text-muted-foreground">{review.text}</p>
    </Card>
  )
}
