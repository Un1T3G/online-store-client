import { ReactNode } from 'react'
import { ReviewResponse } from 'shared/api'
import { cn } from 'shared/lib'

interface IProps {
  reviews: ReviewResponse[]
  renderReview: (review: ReviewResponse, index: number) => ReactNode
  className?: string
}

export const ReviewGrid = ({ reviews, renderReview, className }: IProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
    >
      {reviews.map((review, index) => renderReview(review, index))}
    </div>
  )
}
