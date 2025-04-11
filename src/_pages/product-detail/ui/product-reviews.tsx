'use client'

import { useReviewsByProductIdQuery } from 'entities/reviews/review.queries'
import { ReviewResponse } from 'shared/api'
import { NoSSR, useAppSelector } from 'shared/lib'
import { ReviewCreateModal, ReviewList } from 'widgets/reviews'

interface IProps {
  id: string
  reviews: ReviewResponse[]
}

export const ProductReviews = ({ id, reviews }: IProps) => {
  const isAuth = useAppSelector((state) => state.sessionReducer.isAuth)
  const { data } = useReviewsByProductIdQuery(id, {
    initialData: reviews,
  })

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Отзывы</h1>
        <NoSSR>{isAuth && <ReviewCreateModal productId={id} />}</NoSSR>
      </div>
      <ReviewList productId={id} initialReviews={reviews} />
    </>
  )
}
