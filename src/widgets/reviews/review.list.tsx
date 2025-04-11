import { ReviewCard } from 'entities/reviews'
import { useReviewsByProductIdQuery } from 'entities/reviews/review.queries'
import { ReviewResponse } from 'shared/api'
import { arrayRange } from 'shared/lib'
import { ErrorCard, Skeleton } from 'shared/ui'

interface IProps {
  productId: string
  initialReviews: ReviewResponse[]
}

export const ReviewList = ({ productId, initialReviews }: IProps) => {
  const { data, isLoading, isError, error } = useReviewsByProductIdQuery(
    productId,
    {
      initialData: initialReviews,
    }
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {arrayRange(6).map((x) => (
          <Skeleton key={x} className="rounded-lg h-[200px]" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorCard error={error} />
  }

  if (data!.length > 0) {
    return (
      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
        {data!.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    )
  }

  return (
    <div className="text-sm text-muted-foreground font-semibold">
      У этого товара нет отзывов
    </div>
  )
}
