import { fetchAuth, fetchClassic } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { ReviewDto, ReviewResponse } from './review.types'

class ReviewService {
  getAll(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<ReviewResponse>>('reviews', {
      params: query,
    })
  }

  getByProductId(productId: string) {
    return fetchClassic.get<ReviewResponse[]>(`reviews/by-product/${productId}`)
  }

  create(productId: string, dto: ReviewDto) {
    return fetchAuth.post<string>(`reviews/${productId}`, dto)
  }

  delete(reviewId: string) {
    return fetchAuth.delete<string>(`reviews/${reviewId}`)
  }
}

export const reviewService = new ReviewService()
