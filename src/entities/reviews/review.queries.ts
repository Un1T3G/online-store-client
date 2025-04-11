import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginationResult,
  PaginatorQuery,
  ReviewDto,
  ReviewResponse,
  reviewService,
} from 'shared/api'
import { MutationOptions } from 'shared/types'

export const reviewKeys = {
  reviews: ['reviews'],
  reviewCreate: ['reviews', 'create'],
  reviewDelete: ['reviews', 'delete'],
}

export const useReviewsQuery = (
  options?: QueryOptions<PaginationResult<ReviewResponse>>,
  query?: PaginatorQuery
) => {
  return useQuery({
    queryKey: [...reviewKeys.reviews, Object.values(query || {})],
    queryFn: () => reviewService.getAll(query),
    ...options,
  })
}

export const useReviewsByProductIdQuery = (
  productId: string,
  options?: QueryOptions<ReviewResponse[]>
) => {
  return useQuery({
    queryKey: [...reviewKeys.reviews, productId],
    queryFn: () => reviewService.getByProductId(productId),
    ...options,
  })
}

export const useReviewCreateMutation = (
  productId: string,
  options?: MutationOptions<string, Error, ReviewDto>
) => {
  return useMutation({
    mutationKey: [...reviewKeys.reviewCreate, productId],
    mutationFn: (dto: ReviewDto) => reviewService.create(productId, dto),
    ...options,
  })
}

export const useReviewDeleteMutation = (
  reviewId: string,
  options?: MutationOptions<unknown, Error, string>
) => {
  return useMutation({
    mutationKey: [...reviewKeys.reviewDelete, reviewId],
    mutationFn: () => reviewService.delete(reviewId),
    ...options,
  })
}
