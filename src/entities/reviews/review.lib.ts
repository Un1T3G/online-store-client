import { ReviewResponse } from 'shared/api'

export const calculateAverageRating = (reviews: ReviewResponse[]) => {
  const length = reviews.length
  return length > 0
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) / length
      ).toFixed(1)
    : '0.0'
}
